export const stringEllipsis = (string, length) => {
  if (string.length > length) {
    return string.substring(0, length).concat('...');
  }
  return string;
};

export default stringEllipsis;
