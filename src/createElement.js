function isES6Class(v) {
  return typeof v === "function" && /^\s*class\s+/.test(v.toString());
}

export default function createElement(tag, attributes, ...args) {
  const props = Object.assign({}, attributes);
  props.children = args.length > 0 ? [].concat(...args) : null;

  return {
    tag,
    props
  };
}
