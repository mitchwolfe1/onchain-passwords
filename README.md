# On-Chain Encrypted Data Manager

## Getting Started

1. Clone the repository

2. Install node modules: `npm i`

3. Launch the HardHat development node: `npx hardhat node`

4. In another terminal, start OpenGSN: `npx gsn start`

5. Deploy the wallet contract: `npx hardhat run scripts/deploy.js`

5. Interact with the contract: `npx hardhat run scripts/interact.js`

## Config

The file `scripts/config.js` contains several important variables:

- `PRIVATE_KEY`: This is the private key of the wallet owner. Default is the PK of the first local HardHat account.

- `MASTER_HASH`: The hash (keccak256) of the master password used to unlock interaction. Default is the hash of 'Password'.

- `WALLET_ADDRESS`: This is the address of the deployed wallet contract. Default is the address on the local node.

## Interaction

Interaction begins by unlocking the session with the master password.

The available options are:

### (s)tore

Store values in the Wallet contract.

Enter the website to be used as the key, then enter values one on each line, terminating with a blank entry. The website hash is used as the location of the encrypted data, and each value is encrypted using the accounts public key. The values will then be stored on-chain in the Wallet contract.

### (r)etrieve

Retrieve values from the Wallet contract.

Enter the website to be used as the key. The encrypted data will be retrieved from the Wallet contract, then decrypted using the accounts private key, and returned

### e(x)it

Quit the interaction

## Available Commands

### `npx hardhat node`

Starts the local hardhat node. Required to deploy and interact.

### `npx gsn start`

Deploys the OpenGSN contracts and starts the relay server.

### `npx hardhat run scripts/deploy.js`

Deploys the smart contract to the local node

### `npx hardhat run scripts/interact.js`

Launches the wallet interaction script

