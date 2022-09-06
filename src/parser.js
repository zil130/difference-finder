import yaml from 'js-yaml';

export default (data, format) => {
  let result;

  if (format === 'json') {
    result = JSON.parse(data);
  } else if (format === 'yml' || format === 'yaml') {
    result = yaml.load(data, 'utf8');
  }

  return result;
};
