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
    const isMeowactComponent = instance instanceof Component;
    if (!isMeowactComponent) return null;
    const createdDom = createDOMFromNode(instance.render());
    return createdDom;
  }

  // Stateless Function Component
  if (typeof tag === "function") {
    return createDOMFromNode(tag(props));
  }

  // HTML Element
  if (typeof tag === "string") {
    const dom = document.createElement(tag);
    bindAttributes(dom, props);
    if (props.children && props.children.length > 0) {
      const children = props.children.map(createDOMFromNode);
      children.forEach(child => dom.appendChild(child));
    }
    return dom;
  }

  console.warn("Unknown vdom: ", node);
  return null;
}

function bindAttributes(dom, props) {
  if (haveEventListener("onClick", props)) {
    dom.addEventListener("click", props.onClick);
  }

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value == "function" && key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      dom.removeEventListener(eventType, value);
      dom.addEventListener(eventType, value);
    } else if (key === "checked" || key === "value" || key === "id") {
      dom[key] = value;
    } else if (typeof value != "object" && typeof value != "function") {
      dom.setAttribute(key, value);
    }
  });
}

function isES6Class(v) {
  return typeof v === "function" && /^\s*class\s+/.test(v.toString());
}

function haveEventListener(event, props) {
  return props[event] && typeof props[event] === "function";
}
