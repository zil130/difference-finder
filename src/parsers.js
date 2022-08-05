import yaml from 'js-yaml';

export default (data, filenameExtension) => {
  let result;

  if (filenameExtension === '.json') {
    result = JSON.parse(data);
  } else if (filenameExtension === '.yml' || filenameExtension === '.yaml') {
    result = yaml.load(data);
  }

  return result;
};
