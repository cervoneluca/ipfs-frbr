const getWork = (workId, contract, ipfs) => new Promise((resolve, reject) => {
  // const currentEthAddress = await web3.eth.getAccounts();
  contract.methods
    .tokenURI(workId)
    .call()
    .then(async (workUri) => {
      const workCid = workUri.replace('/ipfs/', '');
      const workMeta = await ipfs.cat(workCid);
      resolve({
        workId,
        workUri,
        workMeta: JSON.parse(workMeta.toString()),
      });
    })
    .catch((e) => reject(new Error(e)));
});

export default getWork;
