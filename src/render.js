import Component from "./Component";

export default function render(node, target = null) {
  // Util function to mount element into target
  const mount = target ? el => target.appendChild(el) : el => el;

  // String or number
  if (typeof node === "string" || typeof node === "number") {
    return mount(document.createTextNode(node));
  }

  const { tag, props } = node;

  // ES6 Class Component
  if (isES6Class(tag)) {
    const instance = new tag(props);
    const isMeowactComponent = instance instanceof Component;
    if (!isMeowactComponent) return null;
    const createdDom = render(instance.render(), target);
    instance.componentDidMount();
    return createdDom;
  }

  // Stateless Function Component
  if (typeof tag === "function") {
    return render(tag(props), target);
  }

  // HTML Element
  if (typeof tag === "string") {
    const dom = document.createElement(tag);
    bindAttributes(dom, props);
    mount(dom);
    if (props.children && props.children.length > 0) {
      props.children.map(child => render(child, dom));
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
