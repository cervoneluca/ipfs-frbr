import getWork from './get_work';

const addManifestation = (
  workId,
  expressionVersion,
  name,
  description,
  fileName,
  fileContent,
  contract,
  ipfs,
  web3,
) => new Promise((resolve, reject) => {
  getWork(
    workId,
    contract,
    ipfs,
  ).then((work) => {
    ipfs.add({
      content: fileContent,
    })
      .then((res) => {
        const manifestationMeta = {
          name,
          description,
          fileName,
          manifestationCid: res[0].hash,
        };
        work.workMeta.expressions.forEach((exp) => {
          if (exp.version === expressionVersion) {
            exp.manifestations.push(manifestationMeta);
          }
        });
        ipfs.add({
          content: JSON.stringify(work),
        }).then(async (resp) => {
          const workUri = `/ipfs/${resp[0].hash}`;
          const currentEthAddress = await web3.eth.getAccounts();
          contract.methods
            .setWorkURI(workId, workUri)
            .send({ from: currentEthAddress[0] })
            .then((transaction) => resolve({ workUri, transaction }))
            .catch((e) => reject(new Error(e)));
        }).catch((e) => reject(new Error(e)));
      })
      .catch((e) => reject(new Error(e)));
  }).catch((e) => reject(new Error(e)));
});
export default addManifestation;
