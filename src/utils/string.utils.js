export const sliceNumber = (number, length = 11) =>
  number?.toString().substring(0, length) || 0;
