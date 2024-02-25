const { ethers } = require('hardhat');
const hre = require("hardhat");
const { assert } = require('chai');

describe('Vault', function () {
    let vault;
    let donor;
    let beneficiary;

    before(async () => {
        const signers = await ethers.getSigners();
        donor = signers[0];
        console.log(`donor: `, donor.address);
        console.log('--------------------------------------')
        beneficiary = signers[1];
        console.log(`beneficiary: `, beneficiary.address);
        console.log('-------------------------------------------------')

        const Vault = await ethers.getContractFactory("Vault");
        vault = await Vault.deploy(donor.address);
        await vault.waitForDeployment();

        console.log(
            `Contract deployed to ${vault.target}`
          );

        console.log('----------------------------------------------------------------')
    });

    it('should deposit funds with correct grant information', async () => {
        const unlockDurationMins = 1; // Unlock duration in minutes

        // Calculate the unlock time (1 minute from the current timestamp)
        const unlockTime = Math.floor(Date.now() / 1000) + unlockDurationMins * 60;
        
        const amount = ethers.parseEther("1");
        // Deposit 1 ether with a release time of 1 minute
        await vault.deposit(beneficiary.address, unlockDurationMins, { from: donor.address, value: amount } ) ;


        // Retrieve grant information
        const grantInfo = await vault.getGrantInfo(donor.address);
    
        // Assert grant information
        assert.equal(grantInfo.donor, donor.address, "Donor should be the caller");
        assert.equal(grantInfo.beneficiary, beneficiary.address, "Beneficiary address should match");
        assert.equal(grantInfo.amount, ethers.parseEther("1"), "Amount should be 1 ether");
        //assert.equal(grantInfo.unlockTime.toString(), unlockTime, "Unlock time should be 1 minute from now");
        assert.equal(grantInfo.claimed, false, "Claimed status should be false");
    });

    it("should allow beneficiary to claim funds after release time", async () => {
        const unlockDurationMins = 2; // Unlock duration in minutes

        // Calculate the unlock time (3 minutes from the current timestamp)
      /*   const unlockTime = Math.floor(Date.now() / 1000) + unlockDurationMins * 60;

        // Calculate the duration to wait in milliseconds
        const delayMilliseconds = (unlockTime - Math.floor(Date.now() / 1000)) * 1000;

        // Create a Promise with setTimeout to wait until the unlock time
        await new Promise(resolve => setTimeout(resolve, delayMilliseconds)); 
 */
       // Call the claim function with the beneficiary address
        await vault.connect(beneficiary).claim();
       
        // Retrieve updated grant information
        const updatedGrantInfo = await vault.getGrantInfo(donor.address);
        const grantStatus = updatedGrantInfo.claimed ? 'Grant claimed' : 'Grant not claimed';
        console.log(grantStatus);
    
        // Assert that funds are claimed
        assert.equal(updatedGrantInfo.amount.toString(), "0", "Amount should be 0 after claiming");
        assert.equal(updatedGrantInfo.claimed, true, "Claimed status should be true");
      });
});