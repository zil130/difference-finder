import yaml from 'js-yaml';

const parser = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'yaml':
    case 'yml':
      return yaml.load;
    default:
      throw new Error('Unsupported file type. Only json, yaml and yml can be compare');
  }
};

export default (data, format) => parser(format)(data);
