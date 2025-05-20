export const getArgs = (arr) => {
  const args = arr.slice(2);
  const obj = {};

  args.forEach((el, i, array) => {
    if (el.startsWith("-")) {
      if (i === array.length - 1) {
        obj[el.slice(1)] = true;
      } else if (!array[i + 1].startsWith("-")) {
        obj[el.slice(1)] = array[i + 1];
      } else {
        obj[el.slice(1)] = true;
      }
    }
  });

  return obj;
};
