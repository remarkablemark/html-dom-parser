/**
 * @see {@link https://github.com/douglascrockford/JSON-js/blob/master/cycle.js}
 */

/*
    cycle.js
    2018-05-15

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

// The file uses the WeakMap feature of ES6.

/* jslint eval */

type ReplacerFunction = (value: unknown) => unknown;

interface DecycledObject {
  [key: string]: unknown;
  $ref?: string;
}

/**
 * Makes a deep copy of an object or array, assuring that there is at most
 * one instance of each object or array in the resulting structure. The
 * duplicate references (which might be forming cycles) are replaced with
 * an object of the form `{"$ref": PATH}` where the PATH is a JSONPath
 * string that locates the first occurance.
 *
 * @example
 * ```ts
 * var a = [];
 * a[0] = a;
 * JSON.stringify(decycle(a)); // '[{"$ref":"$"}]'
 * ```
 *
 * If a replacer function is provided, then it will be called for each value.
 * A replacer function receives a value and returns a replacement value.
 *
 * JSONPath is used to locate the unique object. `$` indicates the top level of
 * the object or array. `[NUMBER]` or `[STRING]` indicates a child element or
 * property.
 *
 * @param object - The object or array to decycle.
 * @param replacer - Optional replacer function called for each value.
 * @returns A deep copy of the object with circular references replaced by `$ref` objects.
 */
export function decycle(object: unknown, replacer?: ReplacerFunction) {
  const visitedObjects = new WeakMap<object, string>(); // object to path mappings

  return deepCopy(object, '$', visitedObjects, replacer);
}

/**
 * Recursively deep copies a value, replacing circular references with
 * `{"$ref": PATH}` objects.
 *
 * @param value - The current value to copy.
 * @param path - The JSONPath to the current value.
 * @param visitedObjects - WeakMap tracking already-visited objects and their paths.
 * @param replacer - Optional replacer function called for each value.
 * @returns The deep-copied value.
 */
function deepCopy(
  value: unknown,
  path: string,
  visitedObjects: WeakMap<object, string>,
  replacer?: ReplacerFunction,
): unknown {
  let existingPath: string | undefined;
  let copy: unknown[] | DecycledObject;

  if (replacer !== undefined) {
    value = replacer(value);
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof Boolean) &&
    !(value instanceof Date) &&
    !(value instanceof Number) &&
    !(value instanceof RegExp) &&
    !(value instanceof String)
  ) {
    existingPath = visitedObjects.get(value);
    if (existingPath !== undefined) {
      return { $ref: existingPath };
    }

    visitedObjects.set(value, path);

    if (Array.isArray(value)) {
      copy = [];
      (value as unknown[]).forEach((element: unknown, index: number) => {
        (copy as unknown[])[index] = deepCopy(
          element,
          `${path}[${index.toString()}]`,
          visitedObjects,
          replacer,
        );
      });
    } else {
      copy = {} as DecycledObject;
      Object.keys(value as Record<string, unknown>).forEach(function (
        key: string,
      ) {
        (copy as DecycledObject)[key] = deepCopy(
          (value as Record<string, unknown>)[key],
          `${path}[${JSON.stringify(key)}]`,
          visitedObjects,
          replacer,
        );
      });
    }

    return copy;
  }

  return value;
}
