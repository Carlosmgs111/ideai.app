import { cloneElement } from "react";
import { plural, singular } from "pluralize";

export const setEnums = (enums: string[]) => {
  // enums = [...enums, "reset"];
  const types: any = {};
  enums.forEach((E: any) => (types[E] = E));
  return Object.freeze({ ...types });
};

export const setActions = (actions: any, entity: any) => {
  actions = [...actions, "reset"];
  const mapfied = entity ? getActionTypes(Mapfy(entity)) : {};
  const types: any = {};
  actions.forEach((action: any) => (types[action] = action));
  return Object.freeze({ ...types, ...mapfied });
};

export const getActionTypes = (object: any) => {
  const actionTypes: any = {};
  for (var key of object.keys()) {
    actionTypes[settingName(key)] = settingName(key);
  }
  actionTypes["reset"] = "reset";
  return actionTypes;
};

export const Mapfy = (object: any) => new Map(Object.entries(object));

export const UnMapfy = (map: any) => Object.fromEntries(map.entries());

export const settingName = (value: any) =>
  "set" + value.slice(0, 1).toUpperCase() + value.slice(1);

export const filterAttrs = (
  obj: any,
  toRemove: any,
  oclusive: boolean = true
) => {
  const newObj: any = {};
  for (var attr in obj) {
    // if (!obj[attr]) (`⚠️ ${attr}: Its null or undefined ⚠️`.yellow);
    if (!oclusive === toRemove.includes(attr)) {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

/**
 * @LP Lower Case Plural (LowerPlural)
 * @LS Lower Case Singular (LowerSingle)
 * @CP Camel Case Plural (CamelPlural)
 * @CS Camel Case Singular (CamelSingle)
 * @UP Upper Case Plural (UpperPlural)
 * @US Upper Case Singular (UpperSingle)
 */
export const labelCases = (label: string, normal: boolean = true) => {
  label = normal ? normalize(label) : label;
  return Object.defineProperties(Object(String(label)), {
    LP: { value: plural(label.toLowerCase()), writable: false },
    LS: { value: singular(label.toLowerCase()), writable: false },
    CP: { value: plural(capitalize(label)), writable: false },
    CS: { value: singular(capitalize(label)), writable: false },
    UP: { value: plural(label).toUpperCase(), writable: false },
    US: { value: singular(label).toUpperCase(), writable: false },

    toString: { value: () => label },
  });
};

export const normalize = (str: any) => {
  const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
    mapping: any = {};

  for (var i = 0, j: any = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  var ret = [];
  for (var i = 0, j = str.length; i < j; i++) {
    var c = str.charAt(i);
    if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
    else ret.push(c);
  }
  return ret.join("");
};

export const capitalize = (label: any, pluralize: boolean = false) => {
  return (
    label[0].toUpperCase() +
    label.slice(1).toLowerCase() +
    (pluralize ? "s" : "")
  );
};

export const getEntityProperties = (Entity: any) => {
  const newObj: any = {};
  for (var attr in Entity) {
    if (typeof Entity[attr] !== "function") newObj[attr] = Entity[attr];
  }
  return newObj;
};

export const addClass = (element: Element, className: string) => {
  if (!element || !className) return;
  const literalClasses = <String>element.getAttribute(ELEMENT_ATTRIBUTES.CLASS);
  if (!literalClasses) return;
  if (!hasClass(element, className, literalClasses))
    element.setAttribute(
      ELEMENT_ATTRIBUTES.CLASS,
      literalClasses.split(" ").concat([className]).join(" ")
    );
};

export const removeClass = (element: Element, className: string) => {
  if (!element || !className) return;
  const literalClasses = <String>element.getAttribute(ELEMENT_ATTRIBUTES.CLASS);
  if (!literalClasses) return;
  if (hasClass(element, className, literalClasses))
    element.setAttribute(
      ELEMENT_ATTRIBUTES.CLASS,
      literalClasses
        .split(" ")
        .filter((c: String) => c !== className)
        .join(" ")
    );
};

export const hasClass = (
  element: Element,
  className: string,
  literalClasses: String = ""
) => {
  if (!element || !className) return;
  if (!literalClasses)
    literalClasses = <String>element.getAttribute(ELEMENT_ATTRIBUTES.CLASS);
  if (!literalClasses) return;
  return literalClasses.split(" ").includes(className);
};

export const ELEMENT_ATTRIBUTES = Object.freeze({ CLASS: "class" });

export const ELEMENT_EVENTS = Object.freeze({
  SCROLL: "scroll",
  CLICK: "click",
  MOUSE_OVER: "mouseover",
  MOUSE_OUT: "mouseout",
});

export const addStyle = (str: string, toAdd: string) => {
  if (str.includes(toAdd)) return str;
  return str
    .split(",")
    .concat(toAdd)
    .filter((c) => c)
    .join(",");
};

export const removeStyle = (str: string, toRemove: string) => {
  if (!str.includes(toRemove)) return str;
  return str
    .split(",")
    .filter((c) => c !== toRemove)
    .filter((c) => c)
    .join(",");
};

// TODO add right validation for timestamp
export const formatTimestamp = (timestamp: number) => {
  if (String(timestamp).length > 13 || String(timestamp).length < 10)
    console.log("Invalid Timestamp format");
  if (String(timestamp).length === 10) timestamp = timestamp * 1000;
  return labelCases(
    new Date(timestamp)
      .toLocaleDateString("ES-LA", {
        year: "numeric",
        month: "long",
      })
      .replaceAll("de", "del")
  ).CS;
};

export const arrayJoin = (
  array: any = [],
  joiner: string = " "
): string | undefined => {
  if (!array[0]) return;
  let stringArray = array.filter(
    (value: any) => typeof value === "string" || typeof value === "number"
  );
  const arrayArray = array.filter((value: any) => Array.isArray(value));

  for (let arr of arrayArray) {
    stringArray = [...stringArray, arrayJoin(arr[0], arr[1])];
  }
  const joinedString = stringArray.join(joiner);
  return joinedString;
};

export const genRandomId = () => {
  return Number(String(Math.random()).replace("0.", ""));
};

export const runButtonBehavior = (e: any, behaviors: any) => {
  const { class: className, name, title, id } = e.target;
  const buttonId = name || title || id || className;
  behaviors[buttonId](e);
};

export const beutifyLabel = (label: any) => {
  label = label.replace(/\w\S*/g, (w: any) =>
    w.replace(/^\w/, (c: any) => c.toUpperCase())
  );
  if (!label) return;
  for (var i in label) {
    if (Number(i) !== label.length - 1) {
      if (
        label[i] !== " " &&
        label[i].toLowerCase() === label[i] &&
        label[Number(i) + 1].toUpperCase() === label[Number(i) + 1]
      ) {
        label =
          label.substring(0, Number(i) + 1) +
          " " +
          label.substring(Number(i) + 1, label.length);
      }
    }
  }
  label = label.replace("{", "");
  label = label.replace("~", "");
  label = label.replace("+", "");
  label = label.replace("<", "");
  return label;
};

export const isMobile = () => {
  return Boolean(
    navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/BlackBerry/i)
  );
};

// * Find the closest infocard component to center and highlight it respective point
// ? https://github.com/Carlosmgs111/landing.cv.amor/#relativeclosestelement
export const relativeClosestElement = (
  parent: HTMLElement,
  childs: NodeListOf<HTMLElement>,
  event: Function,
  axis: string = "horizontal"
) => {
  parent.addEventListener(ELEMENT_EVENTS.SCROLL, () => {
    const centerPosition =
      (axis == "horizontal" ? parent.offsetWidth : parent.offsetHeight) / 2;
    let closestItemIndex = 0;
    let closestDistance = Infinity;

    childs.forEach((item: any, index: any) => {
      const itemRect = item.getBoundingClientRect();
      const distanceToCenter = Math.abs(
        itemRect.left + itemRect.width / 2 - centerPosition
      );

      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestItemIndex = index;
      }
    });

    const targetItem: any = childs[closestItemIndex];
    event && event(targetItem);
  });
};

export const onErrorMiddleware = async (
  catchable: Function,
  onError: any = false
) => {
  try {
    return await catchable();
  } catch (e) {
    if (typeof onError === "function") return onError(e);
    if (onError instanceof Error) throw onError;
    return onError;
  }
};

export const mapToList = (data: any): any =>
  Object.entries({ ...data }).map((data) => data[1]);

export const listToMap = (data: any): any =>
  Object.fromEntries([...data].map((data: any, index: any) => [index, data]));

/**
 * ? Comparison of the Last Two Added Boolean
 * ? This implementation simulate an object
 */
export const CLTAB = (): {
  addBoolean: (boolean: Boolean) => void;
  compareBooleans: () => boolean;
  bools: [boolean, boolean];
  count: number;
} => {
  const bools: [boolean, boolean] = [false, false];
  let count = 0;

  const addBoolean = (bool: any) => {
    count += 1;
    bools.splice(0, 1, bools[1]);
    bools.splice(1, 1, bool);
    if (count === 2) count = 0;
  };
  const compareBooleans = () => {
    // ? here is forced addition of a fake data (false) in case addBoolean function don't be called twice
    if (count === 2) addBoolean(false);
    return count === 0 ? bools[0] || bools[1] : false;
  };

  return { addBoolean, compareBooleans, bools, count };
};

export const getSizesDisposition = (i: any) => {
  i -= 1;
  let sizes: any = [];
  const reverte = !false;
  const sqNum = Number(String(Math.sqrt(i)).split(".")[0]) + 1;
  const w = (100 / sqNum) * 2;
  const s = 100 / sqNum;
  const wide = [s, w];
  const square = [s, s];
  let qWides = sqNum * sqNum - i - 1;
  let qSquares = i + 1 - qWides;
  if (i + 1 === 5)
    return [square, wide, wide, wide, wide].map((set, idx) =>
      reverte
        ? idx > 1
          ? set
          : [...set].reverse()
        : idx > 1
        ? [...set].reverse()
        : set
    );
  for (let j = 0; j < sqNum; j++) {
    sizes[j] = [];
    let t = 0;
    for (let k = 0; k < sqNum; k++) {
      if (Math.round(t) === 100) break;
      if (qWides > 0 && Math.round(t) + w <= 100) {
        sizes[j][k] = reverte ? [...wide].reverse() : wide;
        t += w;
        qWides -= 1;
      } else if (qSquares > 0) {
        t += s;
        qSquares -= 1;
        sizes[j][k] = square;
      }
    }
    sizes[j] = sizes[j].sort(() => Math.random() - 0.5);
  }
  sizes = sizes.sort(() => Math.random() - 0.5);
  sizes = sizes.flat();
  return sizes;
};

/**
 * It takes an array of React elements and injects the same attributes to all of them
 * @param items - an array of React elements
 * @param [attrs] - The attributes you want to inject into the React elements.
 */
export const injectAttrsToReactElements = (items: any, attrs = {}) =>
  items.map((item: any, index: any) => cloneElement(item, { ...attrs, index }));
