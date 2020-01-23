import { typeCheck } from 'type-check';
import initIpfs from '../imports/init_ipfs';
import initEthTools from '../imports/init_eth_tools';
import createWork from '../imports/create_work';
import getWork from '../imports/get_work';
import addExpression from '../imports/add_expression';
import addManifestation from '../imports/add_manifestation';

// the default configurations file
import configs from '../configs/configs.json';
// the error handler
import errors from '../errors/errors';

/**
  * <p> This package handles resources on the IPFS by means of the
  * <a href="https://www.oclc.org/research/activities/frbr.html" target="_blank">
  * Functional Requirements for Bibliographic Records (FRBR) </a></p>
  *
  * <p> The gas packages retrieves a remote Akoma Ntoso sample document (async)
  * and a locally stored (in the asset folder) sample document (sync). Subsequentially,
  * it uses the akomando core package to check if the two documents are actually the
  * same document. </p>
  *
  * <p> This template should contain all that is needed to start to implement
  * a new package belonging to the akomando project. It also supplies a practical
  * sight of guidelines to implement packages aimed to be complianto to code guidelines
  * of the akomando project. </p>
  * @module ipfsFrbr
*/
const ipfsFrbr = {

  /**
   * this will contain the instance of the IPFS connection object
   * @private
  */
  ipfs: null,

  /**
   * This will contain the instance of the Smart Contract that handles the FRBR object relationships
   * @private
  */
  contract: null,

  /**
   * This will contain the instance of the HDWallet provider
   * @private
  */
  provider: null,

  /**
   * This will contain the instance of the Web3 object
   * @private
  */
  web3: null,


  /**
   * This inits the system by creating connections to the IPFS and to the Ethereum chain
   * @param {object} options the options for the function
   * @param {string} options.ipfs the configurations configurations to connect to the IPFS.
   * If not specified it uses the default configurations contained
   * in the src/configs/configs.json file.
   * @param {string} options.ethereum the configurations to connect to ethereum.
   * If not specified it uses the default configurations contained
   * in the src/configs/configs.json file.
   * @param {string} options.mnemonic the mnemonic phrase needed to connect to the ethereum wallet.
  */
  init({
    ipfs = configs.ipfs,
    ethereum = configs.ethereum,
    mnemonic,
  } = {}) {
    if (!this.ipfs) {
      this.ipfs = initIpfs(ipfs);
    }
    if (!this.contract) {
      const ethTools = initEthTools(ethereum, mnemonic);
      this.contract = ethTools.frbrContract;
      this.provider = ethTools.provider;
      this.web3 = ethTools.web3;
    }
  },

  createWork({
    name,
    description,
  } = {}) {
    if (typeCheck('Undefined', name) || !name || name === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'name',
      }));
    }
    if (!typeCheck('String', name)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'name',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', description) || !description || description === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'description',
      }));
    }
    if (!typeCheck('String', description)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'description',
        description: 'string',
      }));
    }
    this.init();
    const results = createWork(name, description, this.contract, this.ipfs, this.web3);
    this.provider.engine.stop();
    return results;
  },

  getWork({
    workId = 0,
  } = {}) {
    if (typeCheck('Undefined', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'workId',
      }));
    }
    if (!typeCheck('Number', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'workId',
        description: 'number',
      }));
    }
    this.init();
    const results = getWork(workId, this.contract, this.ipfs);
    this.provider.engine.stop();
    return results;
  },

  addExpression({
    workId = 0,
    name,
    description,
    version,
  } = {}) {
    if (typeCheck('Undefined', name) || !name || name === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'name',
      }));
    }
    if (!typeCheck('String', name)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'name',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', description) || !description || description === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'description',
      }));
    }
    if (!typeCheck('String', description)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'description',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', version) || !version || version === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'version',
      }));
    }
    if (!typeCheck('String', version)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'version',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'workId',
      }));
    }
    if (!typeCheck('Number', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'workId',
        description: 'number',
      }));
    }
    this.init();
    const results = addExpression(
      workId,
      name,
      description,
      version,
      this.contract,
      this.ipfs,
      this.web3,
    );
    this.provider.engine.stop();
    return results;
  },

  addManifestation({
    workId = 0,
    expressionVersion,
    name,
    description,
    fileName,
    fileContent,
  } = {}) {
    if (typeCheck('Undefined', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'workId',
      }));
    }
    if (!typeCheck('Number', workId)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'workId',
        description: 'number',
      }));
    }
    if (typeCheck('Undefined', expressionVersion) || !expressionVersion || expressionVersion === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'version',
      }));
    }
    if (!typeCheck('String', expressionVersion)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'version',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', name) || !name || name === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'name',
      }));
    }
    if (!typeCheck('String', name)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'name',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', description) || !description || description === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'description',
      }));
    }
    if (!typeCheck('String', description)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'description',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', fileName) || !fileName || fileName === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'fileName',
      }));
    }
    if (!typeCheck('String', fileName)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'fileName',
        description: 'string',
      }));
    }
    if (typeCheck('Undefined', fileContent) || !fileContent || fileContent === '') {
      throw new Error(errors.getError({
        errorName: 'api.requiredOptionNotSupplied',
        parName: 'filefileContentName',
      }));
    }
    if (!typeCheck('String', fileContent)) {
      throw new Error(errors.getError({
        errorName: 'api.optionNotOfTheNeededType',
        parName: 'fileContent',
        description: 'string',
      }));
    }
    this.init();
    const results = addManifestation(
      workId,
      expressionVersion,
      name,
      description,
      fileName,
      fileContent,
      this.contract,
      this.ipfs,
      this.web3,
    );
    this.provider.engine.stop();
    return results;
  },


  /**
   * This is a function that retreives a local string and creates an akomando object.
   * It returns the result of akomando.countDocElements() on the retreived document.
   * @memberof module:ipfsFrbr
   * @throws {aknStringNotSpecified} throws an error when the aknString option is not
   * specified.
   * @throws {inputIsNotAString} throws an error when the given aknString option
   * is not a string
   * @param {object} options the options for the function
   * @param {string} options.aknString the Akoma Ntoso string representing the local sample.
   * @return {object} a JSON object containing the results of the countDocElements()
   * akomando's function called on the retreived resource
   */
  /* getLocalSample({
    aknString = configs.getLocalAkn.aknString,
  } = {}) {
    if (typeCheck('Undefined', aknString) || !aknString) {
      throw new Error(errors.getError({
        errorName: 'glob.aknStringNotSpecified',
      }));
    }
    if (!typeCheck('String', aknString)) {
      throw new Error(errors.getError({
        errorName: 'glob.inputIsNotAString',
        parName: 'aknString',
      }));
    }
    if (!this.localSample) {
      try {
        this.localSample = getLocalAkn(aknString);
      } catch (e) {
        const error = `${errors.getError({
          errorName: 'getLocalSample.errorWhileCreatingTheAkomandoForLocalResource',
        })} ${e}`;
        throw new Error(error);
      }
    }
    return this.localSample.countDocElements();
  }, */
  /**
   * These comments specify that the getLocalSample method must be allowed in the CLI as
   * a command and they specify configurations options fot the cli command.
   * @cli method
   * @cli method.name getLocalSample
   * @cli method.command get-local-sample
   * @cli method.description read locally an Akoma Ntoso sample from the string specified in
   * the config/config.json file, or in the file given in the -a (or --akn-string) option
   * @cli method.options
   * @cli method.options.1.param aknString
   * @cli method.options.1.option -a, --akn-string [url]
   * @cli method.options.1.required false
   * @cli method.options.1.akn_file true
   * @cli method.options.1.description the path of the Akoma Ntoso local sample.
   * If not specified it loads the string in the configs/configs.json file.
  */
};

export default ipfsFrbr;
