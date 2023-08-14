export const upperCase = (str) => str.replace(/\s+/g, ' ')
  .trim()
  .split(' ')
  .map((name) => name.replace(name[0], name[0].toUpperCase()))
  .join(' ');

export const lowerCase = (str) => str.toLowerCase().trim();
