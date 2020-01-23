import getWork from './get_work';

const addExpression = (
  workId,
  name,
  description,
  version,
  contract,
  ipfs,
  web3,
) => new Promise((resolve, reject) => {
  getWork(
    workId,
    contract,
    ipfs,
  ).then((work) => {
    const expressionMeta = {
      name,
      description,
      version,
      manifestations: [],
    };
    work.workMeta.expressions.push(expressionMeta);
    ipfs.add({
      content: JSON.stringify(work.workMeta),
    }).then(async (res) => {
      const workUri = `/ipfs/${res[0].hash}`;
      const currentEthAddress = await web3.eth.getAccounts();
      contract.methods
        .setWorkURI(workId, workUri)
        .send({ from: currentEthAddress[0] })
        .then((transaction) => resolve({ workUri, transaction }))
        .catch((e) => reject(new Error(e)));
    }).catch((e) => reject(new Error(e)));
  }).catch((e) => reject(new Error(e)));
});


export default addExpression;
