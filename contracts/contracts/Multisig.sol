//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Multisig {
    mapping(address => bool) public moderList;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public isModerMadeDecision;
    mapping(uint256 => mapping(uint256 => uint8[])) public decisionList;
    address public tradeCourtContract;
    address public admin;

    modifier onlyModer() {
        require(moderList[msg.sender] == true, "not moder");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not moder");
        _;
    }

    function moderChange(address moder, bool state) onlyAdmin public {
        moderList[moder] = state;
    }

    function changeAdmin(address newAdmin) onlyAdmin public {
        admin = newAdmin;
    }

    function changeTradeCourtContract(address newTradeCourtContract) onlyAdmin public {
        tradeCourtContract = newTradeCourtContract;
    }

    // 0 - scamReal, 1 - scamFake, 2 - scamHalf
    function makeDecision(uint256 _roomNumber, uint256 _takerNumber, uint8 _decision) public onlyModer {
        require(_decision < 3);
        require(isModerMadeDecision[_roomNumber][_takerNumber][msg.sender] == false);
        isModerMadeDecision[_roomNumber][_takerNumber][msg.sender] = true;
        decisionList[_roomNumber][_takerNumber].push(_decision);
    }

    function sendDecision(uint256 _roomNumber, uint256 _takerNumber) public onlyAdmin {
        require(decisionList[_roomNumber][_takerNumber].length > 2);
        uint8[3] memory decisionCollector = [0, 0, 0];
        for (uint8 i=0; i<decisionList[_roomNumber][_takerNumber].length; i++){
            decisionCollector[decisionList[_roomNumber][_takerNumber][i]]++;
        }
        if (decisionCollector[0] > decisionCollector[1] && decisionCollector[0] > decisionCollector[2]){
            (bool success, ) = tradeCourtContract.call(abi.encodeWithSignature("moderDecision(uint256,uint8,uint256)", _roomNumber, 1,  _takerNumber));
            require(success);
        } else if (decisionCollector[1] > decisionCollector[0] && decisionCollector[1] > decisionCollector[2]){
            (bool success, ) = tradeCourtContract.call(abi.encodeWithSignature("moderDecision(uint256,uint8,uint256)", _roomNumber, 2,  _takerNumber));
            require(success);
        } else if (decisionCollector[2] > decisionCollector[0] && decisionCollector[2] > decisionCollector[0]){
            (bool success, ) = tradeCourtContract.call(abi.encodeWithSignature("moderDecision(uint256,uint8,uint256)", _roomNumber, 3,  _takerNumber));
            require(success);
        } else {
            require(false, "You need one more decision, to be shure in the deal");
        }
    }

    constructor() {
        admin = msg.sender;
    }
}