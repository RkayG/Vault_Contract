// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
    struct Grant {
        address donor;
        address beneficiary;
        uint256 amount;
        uint256 unlockTime;
        bool claimed;
    }

    address public moneyDonor;
    mapping(address => Grant) public grants;

    event Deposit(address indexed donor, address indexed beneficiary, uint256 amount, uint256 unlockTime);
    event Claim(address indexed beneficiary, uint256 amount);

    constructor(address _moneyDonor) {
        moneyDonor = _moneyDonor;
    }

    function deposit(address _beneficiary, uint256 _unlockDurationMins) external payable {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(msg.value > 0, "Deposit amount must be greater than 0");

        uint256 _unlockTime = block.timestamp + (_unlockDurationMins * 1 minutes);

        Grant storage grant = grants[msg.sender];
        require(!grant.claimed, "Grant has already been claimed");

        grant.donor = msg.sender;
        grant.beneficiary = _beneficiary;
        grant.amount += msg.value;
        grant.unlockTime = _unlockTime;

        emit Deposit(msg.sender, _beneficiary, msg.value, _unlockTime);
    }

    function claim() external {
        Grant storage grant = grants[moneyDonor];
        require(grant.beneficiary == msg.sender, "You are not the beneficiary");
        require(block.timestamp >= grant.unlockTime, "Grant unlock time has not been reached");
        require(grant.amount > 0, "No funds available for claiming");
        require(!grant.claimed, "Grant has already been claimed");

        // Store the amount to be claimed before resetting it to zero
        uint256 amountToClaim = grant.amount;

        grant.claimed = true;
        
        payable(msg.sender).transfer(amountToClaim);

        // Set grant.amount to zero after claiming
        grant.amount = 0;

        emit Claim(msg.sender, grant.amount);
    }

    function getBeneficiary(address _donor) external view returns (address) {
        Grant storage grant = grants[_donor];
        return grant.beneficiary;
    }

    function getGrantInfo(address _donor) external view returns (
        address donor,
        address beneficiary,
        uint256 amount,
        uint256 unlockTime,
        bool claimed) {
        Grant memory grant = grants[_donor];
        return (grant.donor, grant.beneficiary, grant.amount, grant.unlockTime, grant.claimed);
    }

    receive() external payable {}

    fallback() external payable {}
}
