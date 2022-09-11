import yaml from 'js-yaml';

const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data, 'utf8'),
  yml: (data) => yaml.load(data, 'utf8'),
};

export default (data, format) => parsers[format](data);
