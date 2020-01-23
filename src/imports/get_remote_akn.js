import axios from 'axios';
import { createAkomando } from 'akomando';

/**
 * This function calls asyncronously the address given in anAddress parameter and replies with an
 * object structured as {@link response.custom.object}.
 * @private
 * @throws {error} an error from the http or https packages if the
 * documents was not succesfully retrived
 * @param {anAddress} string The address that must be reached
 * @return {Object} Returns an object containing info about the given address
 * and structured as {@link response.custom.object}
*/
const getRemoteAkn = async (anAddress) => new Promise((resolve, reject) => {
  axios.get(anAddress)
    .then((res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        aknString: res.data,
        akomando: createAkomando({
          aknString: res.data,
        }),
      });
    })
    .catch((e) => {
      reject(new Error(e));
    });
});


export default getRemoteAkn;
