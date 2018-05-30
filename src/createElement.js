export default function createElement(tag, attributes, ...args) {
  const props = Object.assign({}, attributes);
  props.children = args.length > 0 ? [].concat(...args) : null;

  return {
    tag,
    props
  };
}
