import { createAkomando } from 'akomando';

/**
 * This function calls syncronously the address given in anAddress parameter and replies with an
 * object structured as {@link response.custom.object}.
 * @private
 * @param {anAddress} string The address that must be reached
 * @return {string} Returns an object containing info about the given address
 * and structured as {@link response.custom.object}
 */
const getLocalAkn = (aknString) => {
  try {
    return createAkomando({
      aknString,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default getLocalAkn;
