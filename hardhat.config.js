require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  defaultNetwork: 'localhost',
};
