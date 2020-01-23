import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

const initEthTools = (configs, mnemonic) => {
  const provider = new HDWalletProvider(mnemonic, configs.provider);
  const web3 = new Web3(provider);
  const frbrContract = new web3.eth.Contract(
    configs.contractAbi,
    configs.contractAddress,
  );
  return {
    frbrContract,
    web3,
    provider,
  };
};

export default initEthTools;
