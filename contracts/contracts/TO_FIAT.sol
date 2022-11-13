//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./@openzeppelin/contracts/access/AccessControl.sol";

contract TO_FIAT is AccessControl {

    // =============================================================
    //                            STORAGE
    // =============================================================

    uint8 public commissions; // комиссия в тысячных (10 = 1% комиссий)
    uint256 public comissionSumEth; // сумма комиссий в эфире
    mapping(address => uint256) public comissionSumToken; // сумма комиссий в токенах
    uint256 public minTimeForTakerAndMaker; // минимальное время для апрувов обемими сторонами
    uint256 public maxTimeForTakerAndMaker; // максимальное время для апрувов обемими сторонами
    uint256 public multiplicityOfTime; // модуль от введенного времени (чтобы время было красивыми числами)
    
    // роль мультисига
    bytes32 public constant TCmultisig = keccak256("TC_MULTISIG");

    // структура описывающая комнату
    struct RoomNumber {

        //адресс покупателя
        address maker;

        // сюда будет записываться время, за которое создателю комнаты позволено давать аппрув того, что taker действительно перевел средства
        uint32 timeForTakerAndMaker;

        // тут у нас маппинг, который исходя из номера отвечает структурой исполнителя
        // типо у нас же одну комнату может несколько человек выполнить, это для этого и сделано
        mapping (uint256 => Taker) taker;

        // этот счетчик нужен чисто для addressOfTaker, чтобы у каждого исполнителя был свой номер
        uint16 counter;

        // обьем комнаты в конечной валюте (endCurrency)
        uint256 volume;

        // курс, по которому будет происходить обмен токена на фиат
        uint32 rate;

        // адресс токена
        address addressOfToken;

        // верхний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 maxLimit;

        // нижний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 lowLimit;

        // эта переменная отвечает за статус комнаты
        roomStatusENUM roomStatus; // 0 - None, 1 - Continue, 2 - Paused, 3 - Closed

    }

    enum roomStatusENUM {
        None,
        Continue,
        Paused,
        Closed
    }

    // это структура, которая хранит в себе всю информацию об одном из исполнителей сделки
    struct Taker {
        // это адресс человека, который выполняет сделку
        address addressOfTaker;

        // обьем, который будет исполнять этот чел
        uint256 volume;

        // timestamp начала выполнения сделки
        uint256 timer;

        // тут в случае, если все был скам со стороны исполнителя, то поле становится true
        bool isScam;

        // тут мы указываем решение о скаме, который принял админ по данному исполнителю
        moderDecisionENUM moderDecision; // 0 - None, 1 - scamReal, 2 - scamFake, 3 - scamHalf

        // эта переменная отвечает за статус сделки
        dealStatusENUM dealStatus; // 0 - None, 1 - Continue, 2 - ApprovedByTaker, 3 - ApprovedByMaker, 4 - Closed

    }

    enum dealStatusENUM {
        None,
        Continue,
        ApprovedByTaker,
        ApprovedByMaker,
        Closed
    }

    enum moderDecisionENUM {
        None,
        scamReal,
        scamFake,
        scamHalf
    }

    // маппинг со структурой комнаты
    mapping(uint256 => RoomNumber) roomNumberMap;

    // =============================================================
    //                            Modifiers
    // =============================================================

    // модификатор для более красивой проверки статуса комнаты
    modifier roomStatusCheck(bool decision, uint256 _roomNumber, roomStatusENUM status) {
        require(decision ? roomNumberMap[_roomNumber].roomStatus == status : roomNumberMap[_roomNumber].roomStatus != status, "RSC");
        _;
    }

    // модификатор для более красивой проверки статуса сделки
    modifier dealStatusCheck(bool decision, uint256 _roomNumber, uint256 _takerNumber, dealStatusENUM status) {
        require(decision ? roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus == status : roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus != status, "DSC");
        _;
    }

    // модификатор для более красивой проверки сендера
    modifier isRoomMaker(uint256 _roomNumber, address maker) {
        require(roomNumberMap[_roomNumber].maker == maker, "RM");
        _;
    }

    // =============================================================
    //                            Events
    // =============================================================

    event CreateRoom(
        uint256 roomNumber,
        address maker,
        address addressOfToken,
        uint256 volume
    );

    event JoinRoom(
        uint256 roomNumber,
        uint16 takerNumber,
        address addressOfTaker,
        uint256 takerVolume
    );
    
    event TakerApprove(
        uint256 roomNumber,
        uint256 takerNumber
    );

    event MakerApprove(
        uint256 roomNumber,
        uint256 takerNumber
    );

    event TakerWithdraw(
        uint256 roomNumber,
        uint256 takerNumber,
        address addressOfToken,
        uint256 volume
    );

    event CloseRoom(
        uint256 roomNumber
    );


    // =============================================================
    //                         Main functions
    // =============================================================

    // тут мы создаем в комнату в Native токенах сети
    function createRoom(
        uint256 _roomNumber, // номер комнаты
        uint32 _timeForTakerAndMaker, // время, за которое создатель комнаты должен дать аппрув того, что taker действительно перевел средства (в секундах)
        uint256 _maxLimit, // верхний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 _lowLimit, // нижний лимит у исполнителя (как на бинанс лимиты выполнены)
        address _addressOfToken, // адресс токена, который будет использован в этой комнате
        uint256 _msgValue, // количество токенов, которые надо будет исполнить в жтой комнате
        uint32 _rate // курс, по которому будет происходить обмен токена на фиат
    ) public payable roomStatusCheck(true, _roomNumber, roomStatusENUM.None) {
        // тут мы проверяем, что все временные рамки выставленны верно (все в cекундах)
        require(_timeForTakerAndMaker <= maxTimeForTakerAndMaker &&
                _timeForTakerAndMaker >= minTimeForTakerAndMaker &&
                _timeForTakerAndMaker % multiplicityOfTime == 0,
                "IT");

        if (_addressOfToken == address(0)) {
            require(_maxLimit > _lowLimit && 
                _maxLimit <= (msg.value - (msg.value / 1000 * commissions)),
                "IL");

            // монету у нас отправляются в очень мелких величинах (условно 1 udst записыватеся в контракте transferFrom как 1000000)
            // соответсченно подобное деление не будет приводить к неправильным вычислениям
            comissionSumEth += msg.value / 1000 * commissions;
    
            roomNumberMap[_roomNumber].timeForTakerAndMaker = _timeForTakerAndMaker;
            roomNumberMap[_roomNumber].volume = (msg.value - (msg.value / 1000 * commissions));
            roomNumberMap[_roomNumber].addressOfToken = address(0);
        } else {
            require(_maxLimit > _lowLimit && 
                _maxLimit <= _msgValue - (_msgValue / 1000 * commissions),
                "IL");
        
            // блок с трансферов erc20 токенов для депозита
            IERC20(_addressOfToken).transferFrom(msg.sender, address(this), _msgValue);

            // монету у нас отправляются в очень мелких величинах (условно 1 udst записыватеся в контракте transferFrom как 1000000)
            // соответсченно подобное деление не будет приводить к неправильным вычислениям
            comissionSumToken[_addressOfToken] += _msgValue / 1000 * commissions;
    
            roomNumberMap[_roomNumber].timeForTakerAndMaker = _timeForTakerAndMaker;
            roomNumberMap[_roomNumber].volume = (_msgValue - (_msgValue / 1000 * commissions));
            roomNumberMap[_roomNumber].addressOfToken = _addressOfToken;
        }

        roomNumberMap[_roomNumber].maxLimit = _maxLimit;
        roomNumberMap[_roomNumber].lowLimit = _lowLimit;
        roomNumberMap[_roomNumber].maker = msg.sender;
        roomNumberMap[_roomNumber].rate = _rate;
        roomNumberMap[_roomNumber].roomStatus = roomStatusENUM.Continue;

        emit CreateRoom(
            _roomNumber,
            roomNumberMap[_roomNumber].maker,
            roomNumberMap[_roomNumber].addressOfToken,
            roomNumberMap[_roomNumber].volume);
    }

    // тут открывает сделка на исполнение конкретного обьема от комнаты
    function joinRoom (
        uint256 _roomNumber, // номер комнаты
        uint256 _txVolume // какой обьем готовы исполнить в volume (в wei)
    ) public roomStatusCheck(true, _roomNumber, roomStatusENUM.Continue) {
        // тут мы проверяем, что обьем сделки исполнителя находится в пределах лимитов
        require(roomNumberMap[_roomNumber].maxLimit > _txVolume && roomNumberMap[_roomNumber].lowLimit < _txVolume, "OL");

        // создаем структуру чела, который готов исполнить обьем
        roomNumberMap[_roomNumber].taker[roomNumberMap[_roomNumber].counter] = Taker({
            addressOfTaker: msg.sender,
            volume: _txVolume,
            timer: block.timestamp,
            isScam: false,
            moderDecision: moderDecisionENUM.None,
            dealStatus: dealStatusENUM.Continue
        });

        // освобождаем обьем комнаты от выполняемой транзакции, чтобы другие ее не могли выполнить
        roomNumberMap[_roomNumber].volume -= _txVolume;

        emit JoinRoom(_roomNumber, roomNumberMap[_roomNumber].counter, msg.sender, _txVolume);

        roomNumberMap[_roomNumber].counter++;

    }

    // тут исполнитель (taker) должен подтвердить свой перевод средств
    function takerApprove(uint256 _roomNumber, uint256 _takerNumber) dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.Continue) external {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker == msg.sender, "NT");
        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.ApprovedByTaker;
        roomNumberMap[_roomNumber].taker[_takerNumber].timer = block.timestamp + roomNumberMap[_roomNumber].timeForTakerAndMaker;
        emit TakerApprove(_roomNumber, _takerNumber);
    }

    // тут мы получаем подтверждение транзакции покупателя, что исполноитель (struct Taker) все выполнила правильно
    function makerApprove(uint256 _roomNumber, uint256 _takerNumber) external isRoomMaker(_roomNumber, msg.sender) dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.ApprovedByTaker) {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].isScam == false, "ST");

        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.ApprovedByMaker;
        emit MakerApprove(_roomNumber, _takerNumber);
    }

    // тут у нас тейкер выводит средства со сделки
    function takerWithdraw(uint256 _roomNumber, uint256 _takerNumber) public dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.ApprovedByMaker) {
        withdraw(_roomNumber, _takerNumber);
        emit TakerWithdraw(_roomNumber, _takerNumber, roomNumberMap[_roomNumber].addressOfToken, roomNumberMap[_roomNumber].taker[_takerNumber].volume);
    }

    // тут у нас исполнитель может вывести деньги, если создатель комнаты дал аппрув
    function withdraw(uint256 _roomNumber, uint256 _takerNumber) internal dealStatusCheck(false, _roomNumber, _takerNumber, dealStatusENUM.Closed) {
        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.Closed;

        if (roomNumberMap[_roomNumber].addressOfToken == address(0)) {
            payable(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker).transfer(roomNumberMap[_roomNumber].taker[_takerNumber].volume);
        } else {
            IERC20(roomNumberMap[_roomNumber].addressOfToken).transfer(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker, roomNumberMap[_roomNumber].taker[_takerNumber].volume);
        }

    }

    // тут создатель комнаты может ее закрыть, в случае если в ней не осталось исполнителей
    function closeRoom(uint256 _roomNumber) external roomStatusCheck(false, _roomNumber, roomStatusENUM.Closed) isRoomMaker(_roomNumber, msg.sender) {

        // тут мы проверяем, чтобы все в комнате было завершено и создатель комнаты не мог просто так взять и закрыть эту комнату
        if (roomNumberMap[_roomNumber].counter > 0) {
            for (uint256 i = 0; i < roomNumberMap[_roomNumber].counter; i++) {
                require(roomNumberMap[_roomNumber].taker[i].dealStatus == dealStatusENUM.Closed, "DO");
            }
        }

        // тут мы выводим остатки средст из комнаты
        if (roomNumberMap[_roomNumber].volume > 0) {
            if (roomNumberMap[_roomNumber].addressOfToken == address(0)) {
                payable(msg.sender).transfer(roomNumberMap[_roomNumber].volume);
            } else {
                IERC20(roomNumberMap[_roomNumber].addressOfToken).transfer(msg.sender, roomNumberMap[_roomNumber].volume);
            }
        }

        roomNumberMap[_roomNumber].roomStatus = roomStatusENUM.Closed;
        emit CloseRoom(_roomNumber);
    }

    // в этой функции мы позволяем создателю комнаты запретить создание новых сделок
    function pauseRoom(uint256 _roomNumber) external isRoomMaker(_roomNumber, msg.sender) {
        roomNumberMap[_roomNumber].roomStatus = roomStatusENUM.Paused;
    }

    // в этой функции мы позволяем создателю комнаты возобновить создание новых сделок
    function continueRoom(uint256 _roomNumber) external isRoomMaker(_roomNumber, msg.sender) {
        roomNumberMap[_roomNumber].roomStatus = roomStatusENUM.Continue;
    }

    // тут у нас maker может вернуть деньги в комнату, если taker просрачивает вызов "function dealDone"
    function delayFromTaker(uint256 _roomNumber, uint256 _takerNumber) external dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.Continue) {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].timer <= block.timestamp + roomNumberMap[_roomNumber].timeForTakerAndMaker, "TT");
        
        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.Closed;
        roomNumberMap[_roomNumber].volume += roomNumberMap[_roomNumber].taker[_takerNumber].volume;
    }

    // тут у нас исполнитель может вывести деньги, если создатель просрочил аппрув сделки
    function delayFromMaker(uint256 _roomNumber, uint256 _takerNumber) external dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.ApprovedByTaker) {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].timer <= block.timestamp + roomNumberMap[_roomNumber].timeForTakerAndMaker, "MS");

        withdraw(_roomNumber, _takerNumber);
    }

    // тут мы узнаем, скаманули ли тейкера (он соответсвенно подтверждает что это скам)
    function scamFromTaker(uint256 _roomNumber, uint256 _takerNumber) external isRoomMaker(_roomNumber, msg.sender) dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.ApprovedByTaker) {
        roomNumberMap[_roomNumber].taker[_takerNumber].isScam = true;
    }

    // данная функция служит для принятия решения админом о скаме
    function moderDecision(uint256 _roomNumber, moderDecisionENUM _decision, uint256 _takerNumber) external onlyRole(TCmultisig) {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].isScam == true);
        roomNumberMap[_roomNumber].taker[_takerNumber].moderDecision = _decision;
    }

    // тут если у нас прожимается скам, то админ будет разрешать проблему и делать возврат средств создателю комнаты (типо исполнитель скаманулся)
    function scamReal(uint256 _roomNumber, uint256 _takerNumber) external {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].moderDecision == moderDecisionENUM.scamReal);

        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.Closed;
        roomNumberMap[_roomNumber].volume += roomNumberMap[_roomNumber].taker[_takerNumber].volume;
    }

    // тут если у нас прожимается скам, то админ будет разрешать проблему и делать возврат получателю средств
    // (типо покупатель решил скамануть всех, получить товар и при этом деьги вернуть)
    function scamFake(uint256 _roomNumber, uint256 _takerNumber) external {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].moderDecision == moderDecisionENUM.scamFake);

        withdraw(_roomNumber, _takerNumber);
    }

    // в случае этого скама - половина сделки уходит тейкеру, а половина уходит мейкеру
    function scamHalf(uint256 _roomNumber, uint256 _takerNumber) external {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].moderDecision == moderDecisionENUM.scamHalf);
        uint256 half = roomNumberMap[_roomNumber].taker[_takerNumber].volume/2;
        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.Closed;

        roomNumberMap[_roomNumber].volume += half;

        if (roomNumberMap[_roomNumber].addressOfToken == address(0)) {
            payable(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker).transfer(half);
        } else {
            IERC20(roomNumberMap[_roomNumber].addressOfToken).transfer(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker, half);
        }
    }

    // в случае если тейкер ошибся в своей сделке и хочет из нее выйти, то у него есть время до того момента, как он не подтвердит свой перевод
    function mistakeFromTaker(uint256 _roomNumber, uint256 _takerNumber) external dealStatusCheck(true, _roomNumber, _takerNumber, dealStatusENUM.Continue) {
        require(roomNumberMap[_roomNumber].taker[_takerNumber].addressOfTaker == msg.sender, "NT");
        roomNumberMap[_roomNumber].taker[_takerNumber].dealStatus = dealStatusENUM.Closed;
        roomNumberMap[_roomNumber].volume += roomNumberMap[_roomNumber].taker[_takerNumber].volume;
    }

    // =============================================================
    //                            View functions
    // =============================================================

    // функция, которая возвращает нам одного из исполнителей комнаты
    function getTaker(uint256 _roomNumber, uint256 _takerNumber) public view returns(Taker memory) {
        return(roomNumberMap[_roomNumber].taker[_takerNumber]);
    }

    // функция, которая возвращает нам статические данные о комнате
    function getRoomStatic(uint256 _roomNumber) public view returns(
        address,
        uint32,
        uint256,
        uint256,
        address,
        uint32
        ) {
        return(
            roomNumberMap[_roomNumber].maker,
            roomNumberMap[_roomNumber].timeForTakerAndMaker,
            roomNumberMap[_roomNumber].maxLimit,
            roomNumberMap[_roomNumber].lowLimit,
            roomNumberMap[_roomNumber].addressOfToken,
            roomNumberMap[_roomNumber].rate
        );
    }

    // функция, которая возвращает нам динамические данные о комнате
    function getRoomDynamic(uint256 _roomNumber) public view returns(
        uint16,
        uint256,
        roomStatusENUM
    ) {
        return(
            roomNumberMap[_roomNumber].counter,
            roomNumberMap[_roomNumber].volume,
            roomNumberMap[_roomNumber].roomStatus
        );
    }

    // =============================================================
    //                            Admin functions
    // =============================================================

    // функция вывода всех собранных комиссий в эфире
    function withdrawCommissionsEth() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(comissionSumEth);
        comissionSumEth = 0;
    }

    // функция вывода всех собранных комиссий в токенах
    function withdrawCommissionsToken(address token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(token).transfer(msg.sender, comissionSumToken[token]);
        comissionSumToken[token] = 0;
    }

    // тут админ устанавливает комиссии (исчисление идет в десятых процента, то есть "5" будет соответсвеовать 0,5%)
    function setCommissions(uint8 _commissions) external onlyRole(DEFAULT_ADMIN_ROLE) {
        commissions = _commissions;
    }

    // устанавливает время в секундах, для лимитов сендера
    function setMaxTimeForTakerAndMaker(uint256 _maxTimeForTakerAndMaker) external onlyRole(DEFAULT_ADMIN_ROLE) {
        maxTimeForTakerAndMaker = _maxTimeForTakerAndMaker;
    }

    // устанавливает время в секундах, для лимитов сендера
    function setMinTimeForTakerAndMaker(uint256 _minTimeForTakerAndMaker) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minTimeForTakerAndMaker = _minTimeForTakerAndMaker;
    }

    // устанавливает кратность тайм лимитов
    function setMultiplicityOfTime(uint256 _multiplicityOfTime) external onlyRole(DEFAULT_ADMIN_ROLE) {
        multiplicityOfTime = _multiplicityOfTime;
    }

    // =============================================================
    //                            Constructor
    // =============================================================

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    receive() external payable {}

}