import yaml from 'js-yaml';

const parser = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'yaml':
    case 'yml':
      return yaml.load;
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default (data, format) => parser(format)(data);
