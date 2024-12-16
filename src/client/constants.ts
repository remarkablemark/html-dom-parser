/**
 * SVG elements are case-sensitive.
 *
 * @see https://developer.mozilla.org/docs/Web/SVG/Element#svg_elements_a_to_z
 */
export const CASE_SENSITIVE_TAG_NAMES = [
  'animateMotion',
  'animateTransform',
  'clipPath',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'foreignObject',
  'linearGradient',
  'radialGradient',
  'textPath',
] as const;

export const CASE_SENSITIVE_TAG_NAMES_MAP = CASE_SENSITIVE_TAG_NAMES.reduce(
  (accumulator, tagName) => {
    accumulator[tagName.toLowerCase()] = tagName;
    return accumulator;
  },
  {} as Record<string, string>,
);

export const CARRIAGE_RETURN = '\r';
export const CARRIAGE_RETURN_REGEX = new RegExp(CARRIAGE_RETURN, 'g');
export const CARRIAGE_RETURN_PLACEHOLDER = `__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_${Date.now()}__`;
export const CARRIAGE_RETURN_PLACEHOLDER_REGEX = new RegExp(
  CARRIAGE_RETURN_PLACEHOLDER,
  'g',
);
