import ipfsClient from 'ipfs-http-client';

const initIpfs = (configs) => {
  const {
    protocol,
    host,
    port,
    apiPath,
  } = configs;

  const ipfs = ipfsClient({
    protocol,
    host,
    port,
    apiPath,
  });
  return ipfs;
};

export default initIpfs;
