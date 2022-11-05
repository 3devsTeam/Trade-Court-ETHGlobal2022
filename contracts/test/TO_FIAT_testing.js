const { expect } = require("chai");
// const { constants } = require('ethers');
// const { upgrades } = require("hardhat");
const { ethers } = require("hardhat");


describe("testing", function () {

  let contractTests;
  let owner;
  let sender1;
  let executor1;
  let sender2;
  let executor2;

  let prov = ethers.getDefaultProvider();

  beforeEach(async function () {

    [owner, sender1, executor1, sender2, executor2, moder1, moder2, moder3] = await ethers.getSigners();

    const _contractTests = await ethers.getContractFactory("TO_FIAT");
    contractTests = await _contractTests.deploy();

    await contractTests.connect(owner).setMaxTimeForTakerAndMaker(100000000);
    await contractTests.connect(owner).setMinTimeForTakerAndMaker(10);
    await contractTests.connect(owner).setMultiplicityOfTime(1);
    await contractTests.connect(owner).setCommissions(0);

    await owner.sendTransaction({to: sender1.address, value: ethers.utils.parseEther("10.0")});
    await owner.sendTransaction({to: executor1.address, value: ethers.utils.parseEther("10.0")});
    await owner.sendTransaction({to: sender2.address, value: ethers.utils.parseEther("10.0")});
    await owner.sendTransaction({to: executor2.address, value: ethers.utils.parseEther("10.0")});

    const _contractErc20Deployer1 = await ethers.getContractFactory("erc20Deployer1");
    contractErc20Deployer1 = await _contractErc20Deployer1.deploy();

    const _contractErc20Deployer2 = await ethers.getContractFactory("erc20Deployer2");
    contractErc20Deployer2 = await _contractErc20Deployer2.deploy();

    //-----------------------------------------------------------------------
    // пополняем балансы кошельков покупателей
    await contractErc20Deployer1.transfer(sender1.address, 1000000000000);
    expect(await contractErc20Deployer1.balanceOf(sender1.address)).to.equal(1000000000000);

    await contractErc20Deployer2.transfer(sender2.address, 40000000000000);
    expect(await contractErc20Deployer2.balanceOf(sender2.address)).to.equal(40000000000000);

    console.log('popolneno')

    //-----------------------------------------------------------------------
    // даем апрувы покупателям по всем ERC20 монетам
    await contractErc20Deployer1.connect(sender1).approve(contractTests.address, 100000000000000);
    expect(await contractErc20Deployer1.allowance(sender1.address, contractTests.address)).to.equal(100000000000000);

    await contractErc20Deployer2.connect(sender1).approve(contractTests.address, 100000000000000);
    expect(await contractErc20Deployer2.allowance(sender1.address, contractTests.address)).to.equal(100000000000000);

    await contractErc20Deployer1.connect(sender2).approve(contractTests.address, 100000000000000);
    expect(await contractErc20Deployer1.allowance(sender2.address, contractTests.address)).to.equal(100000000000000);

    await contractErc20Deployer2.connect(sender2).approve(contractTests.address, 100000000000000);
    expect(await contractErc20Deployer2.allowance(sender2.address, contractTests.address)).to.equal(100000000000000);

    //-----------------------------------------------------------------------

    const _multisig = await ethers.getContractFactory("Multisig");
    multisig = await _multisig.deploy();

    await multisig.connect(owner).moderChange(moder1.address, true);
    await multisig.connect(owner).moderChange(moder2.address, true);
    await multisig.connect(owner).moderChange(moder3.address, true);
    await multisig.connect(owner).changeTradeCourtContract(contractTests.address);

    await contractTests.connect(owner).setTCMultisig(multisig.address);

    console.log('finish prepare')

  });


//   describe("Deployment", function () {

//     it("Should set the right owner", async function () {
//       expect(await contractTests.adminRe()).to.equal(owner.address);
//     });

//   });
  
  describe("Action", function () {

    it("Should add erc20 balance to 'sender'", async function () {

      //-----------------------------------------------------------------------
      // Создаем комнаты
      await contractTests.connect(sender1).createRoom(1, 10000, ethers.utils.parseEther("1.0"), ethers.utils.parseEther("0.0001"), ethers.constants.AddressZero, 0, 70, {value: ethers.utils.parseEther("1.2")});
      //expect(await contractTests.getStructParams(1)).to.equal(1000000);

      await contractTests.connect(sender2).createRoom(2, 10000, 1000000000, 10000, contractErc20Deployer2.address, 1200000000, 25);
      //expect(await contractTests.getStructParams(2)).to.equal(4000000);

      console.log('done1')

    //   console.log(await contractTests.checkRoomERC20(1))
    // //   console.log(await contractTests.checkRoomERC20(2))

      //-----------------------------------------------------------------------
      // Подтверждаем комнаты
      await contractTests.connect(executor1).joinRoom(1, ethers.utils.parseEther("0.5"));
    //   expect(await contractTests.getBool(1)).to.equal(true);
      await contractTests.connect(executor2).joinRoom(2, 100000000);
      await contractTests.connect(executor1).joinRoom(2, 70000000);

      console.log('done2')


      await contractTests.connect(executor1).takerApprove(1, 0);
      //   expect(await contractTests.getBool(1)).to.equal(true);
      await contractTests.connect(executor2).takerApprove(2, 0);
      await contractTests.connect(executor1).takerApprove(2, 1);
    console.log('done3')


    await contractTests.connect(sender1).makerApprove(1, 0);
    //   expect(await contractTests.getBool(1)).to.equal(true);
    await contractTests.connect(sender2).makerApprove(2, 0);
    await contractTests.connect(sender2).scamFromMaker(2, 1);
    console.log('done4')

    // -------------

      await multisig.connect(moder1).makeDecision(2, 1, 1)
      await multisig.connect(moder2).makeDecision(2, 1, 1)
      await multisig.connect(moder3).makeDecision(2, 1, 1)
      await multisig.connect(owner).sendDecision(2, 1)
      console.log('done4.1')
    // -------------

    await contractTests.connect(executor1).takerWithdraw(1, 0);
    //   expect(await contractTests.getBool(1)).to.equal(true);
    await contractTests.connect(executor2).takerWithdraw(2, 0);
    await contractTests.connect(executor2).scamFake(2, 1)

    console.log('done5')

    await contractTests.connect(sender1).closeRoom(1);
    await contractTests.connect(sender2).closeRoom(2);
    //   expect(await contractTests.getBool(1)).to.equal(true);
    console.log('done6')

  

    //   //-----------------------------------------------------------------------
    //   // производим передачу товара по веб2


    //   //-----------------------------------------------------------------------
    //   // покупатель подтверждает, что с товаром все ок
      
    //   await contractTests.connect(executor1).dealDone(1, 1);
    //   await contractTests.connect(executor2).dealDone(2, 1);

    //   console.log('done3')

    //   //-----------------------------------------------------------------------
    //   // покупатель подтверждает, что с товаром все ок

    //   await contractTests.connect(sender1).approveFromSender(1, 1);
    // //   console.log(await prov.getBalance(receiver1.address));
    //   //expect(await contractErc20Deployer1.balanceOf(receiver1.address)).to.equal(10);

    //   await contractTests.connect(sender2).approveFromSender(2, 1);
    // //   console.log(await prov.getBalance(receiver2.address));
    //   //expect(await contractErc20Deployer2.balanceOf(receiver2.address)).to.equal(40);

    //   console.log('done4')
    // //   console.log(await contractTests.checkRoomERC20(1))
    // //   console.log(await contractTests.checkRoomERC20(2))
    // //   console.log('-------------------------------')


    //   await contractTests.connect(executor1).finalWithdraw(1 ,1);
    // //   console.log(await prov.getBalance(owner.address));
    //   await contractTests.connect(executor2).finalWithdraw(2, 1);
    // //   console.log(await prov.getBalance(owner.address));

    //   console.log('done5')

    // //   console.log(await contractTests.connect(sender1).getRoomDynamic(1));
    // //   console.log(await contractTests.connect(sender1).getExecutor(1, 0));
    // //   console.log(await contractTests.connect(sender1).getExecutor(1, 1));
    // //   console.log(await contractTests.connect(sender1).getExecutor(1, 2));

    // //   console.log(await contractTests.connect(sender1).getRoomDynamic(2));

    //   await contractTests.connect(sender1).closeRoom(1);
    //   //   console.log(await prov.getBalance(owner.address));
    // await contractTests.connect(sender2).closeRoom(2);
    //   //   console.log(await prov.getBalance(owner.address));
  
    //     console.log('done6')

    //     // await contractTests.connect(executor1).finalWithdraw(1 ,1);
    //     //   await contractTests.connect(executor2).finalWithdraw(2, 1);

    //     //   console.log('done7')

    //     console.log(await prov.getBalance(sender1.address));
    //     console.log(await prov.getBalance(executor1.address))
    //     console.log(await prov.getBalance(sender2.address))
    //     console.log(await prov.getBalance(executor2.address))
    });

  });

});
