export const shortenString = (string, maxLength) => {
  let trimmedString = string.substr(0, maxLength);
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );
  return `${trimmedString}...`;
};

//shorting string without breaking words
