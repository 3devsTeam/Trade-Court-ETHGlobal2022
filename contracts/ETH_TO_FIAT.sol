//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ETH_TO_FIAT {

    address public admin;
    uint256 public commissions;
    uint256 public defaultDelay;
    uint256 public comissionSum;

    // это структура, которая хранит в себе всю информацию об одном из исполнителей сделки
    struct Executor {
        // это адресс человека, который выполняет сделку
        address addressOfExecutor;

        // обьем, который будет исполнять этот чел
        uint256 volume;

        // timestamp начала выполнения сделки
        uint256 timeStart;

        // timestamp окончания выполнения сделки
        uint256 timeEnd;

        // тут в случае, если все было грамотно выполнено исполнителем, то поле становится true
        bool approveFromSender;

        // тут в случае, если все был скам со стороны исполнителя, то поле становится true
        bool isScam;

        // тут выставляется true, если сделка была завершена
        bool isDone;

        // тут мы указываем решение о скаме, который принял админ по данному исполнителю
        uint8 adminDecision;

        // данную переменную необходимо перевести в true, когда executor перевел фиат
        bool isDealDone;

    }

    // структура описывающая комнату
    struct RoomNumber {
        //номер карточки продавца
        bytes32 requisites;

        //адресс покупателя
        address sender;

        //покупатель подтверждает что с товаром все хорошо и дает разреншение на вывод средств
        bool senderApprove;

        //находятся ли в комнате деньги
        bool isPayed;

        //случился ли скам
        bool isScam;

        //время блока, в котором была создана комната
        uint256 timestamp;

        //сколько денег было закинуто в $eth
        uint256 value;

        // проверяет, подтвердил ли сделку продавец
        bool isLive;

        // Эту штука свидетельствует о решении админа о скаме
        // если 1, то разрешается вызов scamReal (в сторону покупателя решение)
        // если 2, то разрешается вызов scamFake (в сторону продавца решение)
        uint8 adminDecision;

        // сюда будет записываться время, за которое создателю комнаты позволено давать аппрув того, что executor действительно перевел средства
        uint64 timeForApproveFromSender;

        // тут у нас маппинг, который исходя из номера отвечает структурой исполнителя
        // типо у нас же одну комнату может несколько человек выполнить, это для этого и сделано
        mapping (uint256 => Executor) executor;
        // этот счетчик нужен чисто для addressOfExecutor, чтобы у каждого исполнителя был свой номер
        uint256 counter;

        // просто доп данные, позже придумаем что сюда можно запихнуть,
        // например коменнтарий к банковскому платежу или еще что-то
        bytes32 data;

        // обьем комнаты в конечной валюте (endCurrency)
        uint256 volume;

         // сюда будет даваться число, каждое число будет соответствовать валюте
         // типо 1 = rub, 2 = usd, 3 = eur, и тд
        uint256 endCurrency;

        // тут у нас указываестя курс, по которому будут менять один актив на второй
        uint256 rate;

        // верхний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 maxLimit;

        // нижний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 lowLimit;

        // время, которое дается на выполнение сделки
        uint256 timeForExecutor;

        // эта переменная позволяет запретить создание новых исполнителей сделки (Executor)
        bool stopRoom;

    }

    // маппинг со структурой комнаты
    mapping (uint256 => RoomNumber) roomNumberMap;

    //все эвенты тут прописаны
    event Main(
        uint256 indexed roomNumber,
        address indexed sender,
        address indexed recipient,
        uint256 value,
        uint256 timestamp
    );

    event ApproveOfDealFromRecepient(
        uint256 indexed roomNumber,
        bool indexed isLive
    );

    event ApproveFromSender(
        uint256 indexed roomNumber,
        bool indexed senderApprove
    );

    event ScamFromSender(
        uint256 indexed roomNumber,
        bool isScam
    );



    // классические модификатор только для админа
    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    // просто функция обнуления всех переменных комнаты, выполняется после полного
    // окончания сделки любым из способов
    function zeroing(uint256 _roomNumber) internal {

        roomNumberMap[_roomNumber].requisites = 0;
        roomNumberMap[_roomNumber].sender = address(0);
        roomNumberMap[_roomNumber].timestamp = 0;
        roomNumberMap[_roomNumber].value = 0;
        roomNumberMap[_roomNumber].isPayed = false;
        roomNumberMap[_roomNumber].isScam = false;
        roomNumberMap[_roomNumber].senderApprove = false;
        roomNumberMap[_roomNumber].isLive = false;
        roomNumberMap[_roomNumber].adminDecision = 0;
        //roomNumberMap[_roomNumber].lifeTimeOfRoom = 12;
        roomNumberMap[_roomNumber].counter = 0;

    }

    function zeroingOfExecuter(uint256 _roomNumber, uint256 _counter) internal {

        roomNumberMap[_roomNumber].executor[_counter] = Executor(
            address(0), 0, 0, 0, false, false, true, 0, false
        );

    }

    //--------------------------------------------------------------------------------------------------
    // тут основная часть контракта (функции)

    // тут мы создаем в комнату в Native токенах сети
    function makeRoomEth(
        uint256 _roomNumber, // номер комнаты
        uint64 _timeForApproveFromSender, // время, за которое создатель комнаты должен дать аппрув того, что executor действительно перевел средства (в минутах)
        //uint256 _timeForExecutor, // тут мы устанавливаем время, за которое должна быть выполнена сделка исполнителем (Executor) (в минутах)
        uint256 _rate, // курс, по которому хотят быть обменяны эфиры на _endCurrency (всегда к доллару)
        uint256 _endCurrency, // конечная валюта, в которой хотят получить средства
        uint256 _maxLimit, // верхний лимит у исполнителя (как на бинанс лимиты выполнены)
        uint256 _lowLimit // нижний лимит у исполнителя (как на бинанс лимиты выполнены)
        // bytes32 _requisites, // реквизиты карточки человека, открывшего это комнату, номер карточки будет передавать в keccak256
        // bytes32 _data // просто дополнительные данные, мб пригодятся
    ) public payable {
        require(roomNumberMap[_roomNumber].isPayed == false, "there is a deal");
        require(roomNumberMap[_roomNumber].stopRoom == false, "The room is stoped");


        // тут мы устанавливаем время жизни комнаты, если условия данного оператора не выполняются
        // то ставится дефолтная задержка 
        // если задержка в сделку не нужна, то в _delay передается "0"
        // if (_lifeTimeOfRoom > 12 && _lifeTimeOfRoom < 168) {
        //     // в часу 3600 сек, соответсвенно мы умножаем на 3600
        //     roomNumberMap[_roomNumber].lifeTimeOfRoom = _lifeTimeOfRoom * 3600;
        // } else {
        //     roomNumberMap[_roomNumber].lifeTimeOfRoom = 12 * 3600; // по дефолту 12 часов стоит лок
        // }


        // if (_timeForExecutor < (15*60) || _timeForExecutor > (1440*60)) {
        //     require(_timeForExecutor % 5 == 0, "time need to be multiple of 5");
        //     roomNumberMap[_roomNumber].timeForExecutor = _timeForExecutor;
        // } else {
        //     roomNumberMap[_roomNumber].timeForExecutor = 60; // по кд один час выставляет
        // }

        // тут мы проверяем, что все временные рамки выставленны верно (все в минутах)
        if (_timeForApproveFromSender < (60*60) || _timeForApproveFromSender > (1440*60)) {
            require(_timeForApproveFromSender % 5 == 0, "time need to be multiple of 5");
            roomNumberMap[_roomNumber].timeForApproveFromSender = _timeForApproveFromSender;
        } else {
            roomNumberMap[_roomNumber].timeForApproveFromSender = 60; // по кд один час выставляет
        }

        // монету у нас отправляются в очень мелких величинах (условно 1 udst записыватеся в контракте transferFrom как 1000000)
        // соответсченно подобное деление не будет приводить к неправильным вычислениям
        // comissionSum += (msg.value / 1000 * commissions);
        //
        //
  
        roomNumberMap[_roomNumber].volume = (msg.value * _rate);
        roomNumberMap[_roomNumber].endCurrency = _endCurrency;
        roomNumberMap[_roomNumber].rate = _rate;
        roomNumberMap[_roomNumber].maxLimit = _maxLimit;
        roomNumberMap[_roomNumber].lowLimit = _lowLimit;

        // roomNumberMap[_roomNumber].requisites = _requisites;
        roomNumberMap[_roomNumber].sender = msg.sender;
        roomNumberMap[_roomNumber].timestamp = block.timestamp;
        roomNumberMap[_roomNumber].value = msg.value; // (msg.value - (msg.value / 1000 * commissions));
        // roomNumberMap[_roomNumber].data = _data;
        roomNumberMap[_roomNumber].isPayed = true;

       //  emit Main(_roomNumber, roomNumberMap[_roomNumber].sender, roomNumberMap[_roomNumber].recipient, roomNumberMap[_roomNumber].value, roomNumberMap[_roomNumber].timestamp);
    }

    // тут открывает сделка на исполнение конкретного обьема от комнаты
    function completeDeal (
        uint256 _roomNumber, // номер комнаты
        uint256 _txVolume // какой обьем готовы исполнить в volume (в эфире)
    ) public {
        // тут проверяем, чтобы чел не пытался выполнить сделки больше, чем заявлена
        // вот это проверку потенциально можно будет удалить, ее проверка следующая заменяет
        // require(_txVolume <= roomNumberMap[_roomNumber].volume, "you trying to overflow deal");

        // тут мы проверяем, что обьем сделки исполнителя находится в пределах лимитов
        require(roomNumberMap[_roomNumber].maxLimit > _txVolume && roomNumberMap[_roomNumber].lowLimit < _txVolume, "Your volume is out of limits");

        // тут мы записываем, кто является исполнителем этого обьема
        roomNumberMap[_roomNumber].counter += 1;

        // создаем структуру чела, который готов исполнить обьем
        roomNumberMap[_roomNumber].executor[roomNumberMap[_roomNumber].counter] = Executor(
            msg.sender,
            _txVolume,
            block.timestamp,
            (block.timestamp + roomNumberMap[_roomNumber].timeForExecutor),
            false,
            false,
            false,
            0,
            false
        );

        // освобождаем обьем комнаты от выполняемой транзакции, чтобы другие ее не могли выполнить
        roomNumberMap[_roomNumber].volume -= _txVolume;

    }

    // тут исполнитель (executor) должен подтвердить свой перевод средств
    function dealDone(uint256 _roomNumber, uint256 _counter) external {
        require(msg.sender == roomNumberMap[_roomNumber].executor[_counter].addressOfExecutor, "You are not executor");
        roomNumberMap[_roomNumber].executor[_counter].isDealDone = true;
    }

    // тут мы получаем подтверждение транзакции покупателя, что исполноитель (struct Executor) все выполнила правильно
    function approveFromSender(uint256 _roomNumber, uint256 _counter) external {
        require(roomNumberMap[_roomNumber].executor[_counter].isScam == false, "There is a scam on this executor");
        require(roomNumberMap[_roomNumber].sender == msg.sender);
        require(roomNumberMap[_roomNumber].executor[_counter].isDealDone == true, "Executor dont give his approve");
        // require(roomNumberMap[_roomNumber].isScam == false);
        // require(roomNumberMap[_roomNumber].isLive == true);
        roomNumberMap[_roomNumber].executor[_counter].approveFromSender = true;
        //emit ApproveFromSender(_roomNumber, roomNumberMap[_roomNumber].senderApprove);
    }

    // тут у нас исполнитель может вывести деньги, если создатель комнаты дал аппрув
    function withdraw(uint256 _roomNumber, uint256 _counter) public {
        // require(msg.sender == roomNumberMap[_roomNumber].executor[_counter].addressOfExecutor, "Your not an executor");
        require(roomNumberMap[_roomNumber].executor[_counter].approveFromSender == true, "Sender dont give approve");

        payable(roomNumberMap[_roomNumber].executor[_counter].addressOfExecutor).transfer(roomNumberMap[_roomNumber].executor[_counter].volume);

        zeroingOfExecuter(_roomNumber, _counter);

        if (roomNumberMap[_roomNumber].volume == 0) {
            zeroing(_roomNumber);
        }
    }

    // тут создатель комнаты может ее закрыть, в случае если в ней не осталось исполнителей
    function closeRoom(uint256 _roomNumber) external {
        require(roomNumberMap[_roomNumber].sender == msg.sender);

        // тут мы проверяем, чтобы все в комнате было завершено и создатель комнаты не мог просто так взять и закрыть эту комнату
        if (roomNumberMap[_roomNumber].counter > 0) {
            for (uint256 i = 0; i <= roomNumberMap[_roomNumber].counter; i++) {
                require(roomNumberMap[_roomNumber].executor[i].isDone == true);
                zeroingOfExecuter(_roomNumber, i);
            }
        }

        zeroing(_roomNumber);

    }

    // в этой функции мы позволяем создателю комнаты запретить создание новых сделок
    function stopRoom(uint256 _roomNumber) external {
        require(roomNumberMap[_roomNumber].sender == msg.sender);
        roomNumberMap[_roomNumber].stopRoom = true;
    }

    // в этой функции мы позволяем создателю комнаты возобновить создание новых сделок
    function continueRoom(uint256 _roomNumber) external {
        require(roomNumberMap[_roomNumber].sender == msg.sender);
        roomNumberMap[_roomNumber].stopRoom = false;
    }

    // тут у нас исполнитель может вывести деньги, если создатель просрочил аппрув сделки
    function delayFromSender(uint256 _roomNumber, uint256 _counter) external {
        require(msg.sender == roomNumberMap[_roomNumber].executor[_counter].addressOfExecutor, "Your not an executor");
        require(roomNumberMap[_roomNumber].executor[_counter].timeEnd <= block.timestamp, "Sender dont give approve");

        payable(msg.sender).transfer(roomNumberMap[_roomNumber].executor[_counter].volume);

        zeroingOfExecuter(_roomNumber, _counter);

        if (roomNumberMap[_roomNumber].volume == 0) {
            zeroing(_roomNumber);
        }
    }

    // тут мы узнаем, скаманули ли покупателя (он соответсвенно подтверждает что это скам)
    function scamFromSender(uint256 _roomNumber, uint256 _counter) external{
        require(roomNumberMap[_roomNumber].sender == msg.sender);
        require(roomNumberMap[_roomNumber].executor[_counter].approveFromSender == false);
        
        roomNumberMap[_roomNumber].executor[_counter].isScam = true;

        //emit ScamFromSender(_roomNumber, roomNumberMap[_roomNumber].isScam);
    }

    // данная функция служит для принятия решения админом о скаме
    function adminDecision(uint256 _roomNumber, uint8 _decision, uint256 _counter) external onlyAdmin {
        require(roomNumberMap[_roomNumber].executor[_counter].isScam == true);
        roomNumberMap[_roomNumber].executor[_counter].adminDecision = _decision;
    }

    // тут если у нас прожимается скам, то админ будет разрешать проблему и делать возврат средств создателю комнаты (типо исполнитель скаманулся)
    function scamReal(uint256 _roomNumber, uint256 _counter) external {
        require(roomNumberMap[_roomNumber].executor[_counter].adminDecision == 1);

        // подумать над данной проверкой, по факту она тут ни на что не влияет
        //require(roomNumberMap[_roomNumber].sender == msg.sender);
        roomNumberMap[_roomNumber].volume += roomNumberMap[_roomNumber].executor[_counter].volume;

        zeroingOfExecuter(_roomNumber, _counter);
        //emit Main(_roomNumber, roomNumberMap[_roomNumber].sender, roomNumberMap[_roomNumber].recipient, roomNumberMap[_roomNumber].value, roomNumberMap[_roomNumber].timestamp);
    }

    // тут если у нас прожимается скам, то админ будет разрешать проблему и делать возврат получателю средств
    // (типо покупатель решил скамануть всех, получить товар и при этом деьги вернуть)
    function scamFake(uint256 _roomNumber, uint256 _counter) external {
        require(roomNumberMap[_roomNumber].adminDecision == 2);

        // подумать над данной проверкой, по факту она тут ни на что не влияет
        //require(roomNumberMap[_roomNumber].recipient == msg.sender);

        payable(roomNumberMap[_roomNumber].executor[_counter].addressOfExecutor).transfer(roomNumberMap[_roomNumber].executor[_counter].volume);

        zeroingOfExecuter(_roomNumber, _counter);

        if (roomNumberMap[_roomNumber].volume == 0) {
            zeroing(_roomNumber);
        }
        //emit Main(_roomNumber, roomNumberMap[_roomNumber].sender, roomNumberMap[_roomNumber].recipient, roomNumberMap[_roomNumber].value, roomNumberMap[_roomNumber].timestamp);
    }

    //-----------------------------------------------------------------------------------------------------------
    // админский функции для глобальных штук


    //-----------------------------------------------------------------------------------------------------------
    // конструктор

    constructor() {
    }

}