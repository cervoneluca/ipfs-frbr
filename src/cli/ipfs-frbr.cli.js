#!/usr/bin/env node
/* global CONFIGS_CLI */
import program from 'commander';
import chalk from 'chalk';
import { pd } from 'pretty-data2';
import * as fs from 'fs';


// replace all ipfsFrbr instances with the name of your package
import ipfsFrbr from '../api/ipfs-frbr.api';
import packConfigs from '../../package.json';
import errors from '../errors/errors';

/**
 * All the methods of your package's api are automatically imported according
 * to CONFIG_CLI global object that are created by webpack before creating the
 * cli distribution file.
 * Check the file ./webpack.config.build-cli.before.js to see how the object
 * is created
*/
const cliConfs = CONFIGS_CLI;
// start to wrap api methods (if required, as said in above comment)
program.version(packConfigs.version);
program.description(packConfigs.description);

const resolveAction = async (method, options) => {
  const methodOptions = {};
  if (method.options) {
    method.options.forEach((opt) => {
      if (opt.required === 'true' && !options[opt.param]) {
        const err = errors.getError({
          errorName: 'cli.requiredOptionNotSupplied',
          parName: opt.option,
        });
        process.stdout.write(chalk.red.bold(err));
        process.exit(err);
      }
      if (!opt.json_file && !opt.akn_file) {
        methodOptions[opt.param] = options[opt.param];
      } else if (opt.akn_file && options[opt.param]) {
        try {
          const aknString = fs.readFileSync(options[opt.param]).toString();
          methodOptions[opt.param] = aknString;
        } catch (err) {
          process.stdout.write(chalk.red.bold(`${err}\n`));
          methodOptions[opt.param] = null;
          process.exit(err);
        }
      } else if (opt.json_file && options[opt.param]) {
        try {
          const json = JSON.parse(fs.readFileSync(options[opt.param]).toString());
          methodOptions[opt.param] = json;
        } catch (err) {
          process.stdout.write(chalk.red.bold(`${err}\n`));
          methodOptions[opt.param] = null;
          process.exit(err);
        }
      }
    });
  }
  try {
    const results = await ipfsFrbr[method.name](methodOptions);
    const formattedResults = (() => {
      switch (typeof results) {
        case 'object':
          return (results.toString().startsWith('<'))
            ? chalk.green.bold(pd.xml(results.toString()))
            : chalk.green.bold(pd.json(results));
        default:
          return chalk.green.bold(results.toString());
      }
    })();
    process.stdout.write(chalk.green.bold(`${formattedResults}\n`));
    return formattedResults;
  } catch (err) {
    process.stdout.write(chalk.red.bold(`${err}\n`));
    return new Error(err);
  }
};

cliConfs.configsCli.methods.forEach((meth) => {
  const cmd = program.command(meth.command);
  cmd.description(meth.description);

  if (meth.options) {
    meth.options.forEach((opt) => {
      cmd.option(`${opt.option}, ${opt.description}`);
    });
  }

  cmd.action((options) => resolveAction(meth, options));
});

program.parse(process.argv);
if (program.args.length === 0) program.help();
