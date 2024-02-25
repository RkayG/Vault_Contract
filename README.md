# Vault - Simple Smart Contract

This is a simple vault contract that allows a user deposit funds and set a beneficiary of the funds with an unlock time which must be reached before the beneficiary can claim the funds.

## Contracts folder :heavy_check_mark:
* [Vault.sol](./contracts/Vault.sol): smart contract file:

## Functions :floppy_disk:
| Function        | Purpose
| --------------- | ---------------------
| `deposit`       | Parameters: beneficiary, unlockTime. Allows caller to deposit funds and assign a beneficiary as well as an unlock time to the funds.
| `clsim`         | Ensures caller is beneficiary and allows them to claim deposited funds, as long has the unlock timehas been reached.
| `getBeneficiary`| Fetches beneficiary assigned to deposited funds.
| `getGrantInfo`  | Fetches details of the deposited funds, i.e. donor, beneficiary, amount, unlock time, and claimed status.

## Scripts folder :heavy_check_mark:
* [deploy](./scripts/deploy.js): Script to deploy smart contract. Run `npx hardhat run scripts/deploy.js --network sepolia` to deploy script.

## Contracts folder :heavy_check_mark:
* [test](./test/vault.js): Script to test the smart contract and ensure correct functioning. Unlock time in the smart contract is set in minutes to reduce wait time when testing.  Use `npx hardhat test`to run tests. 

## Hardhat Configuration
* [config](./hardhat.config.js): Configuration file for hardhat project. Fetches sepolia `API_URL` and metamask `PRIVATE_KEY`from .env file. Also sets network to Sepolia testnet for deplyment 

## Contract Address:
This contract is deployed to Sepolia testnet. Contract address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

