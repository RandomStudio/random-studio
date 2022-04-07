const classNames = object =>
  Object.entries(object)
    .map(([className, conditional]) => (conditional ? className : ''))
    .join(' ');

export default classNames;
