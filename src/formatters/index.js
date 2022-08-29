import stylish from './stylish.js';
import plain from './plain.js';
import jsonStringify from './jsonStringify.js';

export default (format) => {
  let func;

  if (format === 'stylish') {
    func = stylish;
  } else if (format === 'plain') {
    func = plain;
  } else if (format === 'json') {
    func = jsonStringify;
  }

  return func;
};
