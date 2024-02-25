# Vault - Simple Smart Contract

This is a simple vault contract that allows a user deposit funds and set a beneficiary of the funds with an unlock time which must be reached before the beneficiary can claim the funds.

## Contracts folder :heavy_check_mark:
* [vault](./contracts/Vault.sol): smart contract file:

## Functions :floppy_disk:
| Function        |              Purpose
|
| --------------- | ---------------------
| `deposit`       | Parameters: beneficiary,
                    unlockTime
                    Allows caller to deposit funds
                    and assign a beneficiary as
                    well as an unlock time to the funds.
|
| `clsim`         | Ensures caller is beneficiary
                    and allows them to claim saved
                    funds, as long has the unlock time
                    has been reached.
|
| `getBeneficiary`| Fetches beneficiary assigned to 
                    deposited funds.
|
| `getGrantInfo`  | Fetches details of the deposited
                    funds, i.e. donor, beneficiary,
                    amount, unlock time, and claimed
                    status.
|

## Scripts folder :heavy_check_mark:
* [deploy](./scripts/deploy.js): Script to deploy smart contract. Run `npx hardhat run scripts/deploy.js --network sepolia` to deploy script.

## Contracts folder :heavy_check_mark:
* [tests](./test/vault.js): Script to test the smart contract and ensure correct functioning. Unlock time in the smart contract is set in minutes to reduce wait time when testing.  Use `npx hardhat test`to run tests. 

## Hardhat Configuration
* [config](./hardhat.config.js): Configuration file for hardhat project. Fetches sepolia `API_URL` and metamask `PRIVATE_KEY`from .env file. Also sets network to Sepolia testnet for deplyment 

## env file
Create a .env file, include below variables, and replace their values with corresponding details:
`API_URL`= `<YOUR SEPOLIA API URL>`
`PRIVATE_KEY` = `<YOUR WALLET PRIVATE KEY>`

## Contract Address:
This contract is deployed to Sepolia testnet. Contract address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

