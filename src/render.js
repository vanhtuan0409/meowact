import Component from "./Component";

export default function render(vdom, target) {
  const dom = createDOMFromNode(vdom);
  if (dom) {
    target.appendChild(dom);
  }
}

function createDOMFromNode(node) {
  // String or number
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }

  const { tag, props } = node;
  // ES6 Class Component
  if (isES6Class(tag)) {
    const instance = new tag(props);
    return instance instanceof Component
      ? createDOMFromNode(instance.render())
      : null;
  }

  // Stateless Function Component
  if (typeof tag === "function") {
    return createDOMFromNode(tag(props));
  }

  // HTML Element
  if (typeof tag === "string") {
    const dom = document.createElement(tag);
    if (props.children && props.children.length > 0) {
      const children = props.children.map(createDOMFromNode);
      children.forEach(child => dom.appendChild(child));
      return dom;
    }
  }

  console.warn("Unknown vdom: ", node);
  return null;
}

function isES6Class(v) {
  return typeof v === "function" && /^\s*class\s+/.test(v.toString());
}
