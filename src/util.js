function extractNumber(string) {
  if (string === null) {
    return null;
  }

  // Use regex to extract the leading number part of the string
  // Return null if no number is found
  const number_part = string.match(/^\d+/);
  if (number_part === null) {
    return null;
  }

  return Number(number_part[0]);
}

function extractString(string) {
  if (string === null) {
    return null;
  }

  // Use regex to extract the potential number part of the string
  const number_part = string.match(/\d+/);

  // Return the whole string if no number is found
  if (number_part === null) {
    return string.trim();
  }

  // Return the substring indexed after the number part if a number is found
  return string.substring(number_part[0].length).trim();
}

function compareNumeralPrefixedStrings(a, b) {
  // Extract the numbers from the strings
  const a_number = extractNumber(a);
  const b_number = extractNumber(b);

  // If neither strings are prefixed with numbers, compare the strings
  if (a_number === null && b_number === null) {
    return a.localeCompare(b);
  }

  // If one string is prefixed with a number and the other is not, the number prefixed string comes first
  if (a_number === null) {
    return 1;
  }

  if (b_number === null) {
    return -1;
  }

  // If both strings are prefixed with the same number, compare the strings
  if (a_number === b_number) {
    const a_string = extractString(a);
    const b_string = extractString(b);

    return a_string.localeCompare(b_string);
  }

  // If both strings are prefixed with different numbers, compare the numbers
  return a_number - b_number;
}

module.exports = {
  extractNumber,
  extractString,
  compareNumeralPrefixedStrings,
};
