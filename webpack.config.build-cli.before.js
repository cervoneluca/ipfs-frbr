const commentsParse = require('comment-parser');
const fs = require('fs');
const _ = require('underscore');

const apiComments = fs.readFileSync('./src/api/ipfsFrbr.api.js').toString();
const apiCommentsObject = commentsParse(apiComments, {
  dotted_names: true,
});

// find cli definitions comments
const createCliConf = () => {
  const tempCliConfigs = {
    configsCli: {
      methods: [],
    },
  };
  _.chain(apiCommentsObject)
    .pluck('tags')
    .map((item) => item[0])
    .where({ tag: 'cli' })
    .each((methodCliTag) => {
      const toReturn = {};
      methodCliTag.tags.forEach((tag) => {
        const tagName = tag.name;
        const tagDescription = tag.description;
        if (['name', 'command', 'description'].includes(tagName)) {
          toReturn[tagName] = tagDescription;
        } else if (tag.name === 'options') {
          toReturn.options = [];
          tag.tags.forEach((option) => {
            const optionToReturn = {};
            option.tags.forEach((optionInfo) => {
              const optionName = optionInfo.name;
              const optionDescription = optionInfo.description;
              if (['param', 'required', 'option', 'description', 'json_file', 'akn_file'].includes(optionName)) {
                optionToReturn[optionName] = optionDescription;
              }
            });
            toReturn.options.push(optionToReturn);
          });
        }
      });
      tempCliConfigs.configsCli.methods.push(toReturn);
    });
  return tempCliConfigs;
};

module.exports = createCliConf;
