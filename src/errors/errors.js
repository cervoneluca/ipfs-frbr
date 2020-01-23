const errors = {
  getError({
    errorName,
    parName,
    description,
  } = {}) {
    switch (errorName) {
      case 'api.requiredOptionNotSupplied':
        return `The option ${parName} is mandatory`;
      case 'api.optionNotOfTheNeededType':
        return `The option ${parName} must be a ${description}`;
      case 'cli.requiredOptionNotSupplied':
        return `The option ${parName} is mandatory`;
      default:
        return 'Unknown error';
    }
  },
};

export default errors;
