const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('Token contract', () => {

   let mockNewPle;
   let mockOldPle;
   let plethoriEscrow;
   let owner;
   let addr1;
   let addr2;
   let addrs;

   beforeEach(async function(){
    
      [owner,addr1,addr2,...addrs] = await ethers.getSigners();

      const NewPLEtoken = await ethers.getContractFactory('NewPLEtoken');
      mockNewPle = await NewPLEtoken.deploy();
      await mockNewPle.deployed();
      await mockNewPle.faucet(addr2.address,10000000);
   
      
      const OldPleToken = await ethers.getContractFactory('OldPleToken');
      mockOldPle = await OldPleToken.deploy();
      await mockOldPle.deployed();
      await mockOldPle.faucet(addr1.address,1000);

      const PlethoriEscrow = await ethers.getContractFactory("PlethoriEscrow");
      plethoriEscrow = await PlethoriEscrow.deploy(mockOldPle.address,mockNewPle.address);
      await plethoriEscrow.deployed();


      
       await mockNewPle.connect(addr2).transfer(plethoriEscrow.address,10000000);

      
     
   });


   describe('Transaction && functions', () => {
    it("Should send old lp token once it's changed",async function(){

   
      await mockOldPle.connect(addr1).approve(plethoriEscrow.address,1000);
      await plethoriEscrow.connect(addr1).enter(1000);

      expect(await mockOldPle.balanceOf(plethoriEscrow.address)).to.equal(1000);

      expect(await mockNewPle.balanceOf(plethoriEscrow.address)).to.equal(10000000);

      //await mockNewPle.connect(addr2).approve(addr1.address,1000);
      await plethoriEscrow.connect(addr1).claim(1000);

      expect(await mockNewPle.balanceOf(addr1.address)).to.equal(1000);
      


    });

    
      
     

       
        

   })
   






  
});






