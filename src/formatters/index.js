import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => {
  if (format === 'stylish') {
    return stylish;
  }
  if (format === 'plain') {
    return plain;
  }
  return JSON.stringify;
};
