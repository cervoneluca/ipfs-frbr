const createWork = (name, description, contract, ipfs, web3) => new Promise((resolve, reject) => {
  const workMetadata = {
    name,
    description,
    expressions: [],
  };
  ipfs.add({
    content: JSON.stringify(workMetadata),
  }).then(async (res) => {
    const workUri = `/ipfs/${res[0].hash}`;
    const currentEthAddress = await web3.eth.getAccounts();
    contract.methods
      .mint(name, workUri)
      .send({ from: currentEthAddress[0] })
      .then((transaction) => resolve({ workUri, transaction }))
      .catch((e) => reject(new Error(e)));
  }).catch((e) => reject(new Error(e)));
});


export default createWork;
