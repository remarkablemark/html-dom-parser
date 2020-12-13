var constants = require('./constants');
var domhandler = require('domhandler/lib/node');

var CASE_SENSITIVE_TAG_NAMES = constants.CASE_SENSITIVE_TAG_NAMES;

var Comment = domhandler.Comment;
var Element = domhandler.Element;
var ProcessingInstruction = domhandler.ProcessingInstruction;
var Text = domhandler.Text;

var caseSensitiveTagNamesMap = {};
var tagName;

for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
  tagName = CASE_SENSITIVE_TAG_NAMES[i];
  caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
}

/**
 * Gets case-sensitive tag name.
 *
 * @param  {string}           tagName - Tag name in lowercase.
 * @return {string|undefined}         - Case-sensitive tag name.
 */
function getCaseSensitiveTagName(tagName) {
  return caseSensitiveTagNamesMap[tagName];
}

/**
 * Formats DOM attributes to a hash map.
 *
 * @param  {NamedNodeMap} attributes - List of attributes.
 * @return {object}                  - Map of attribute name to value.
 */
function formatAttributes(attributes) {
  var result = {};
  var attribute;
  // `NamedNodeMap` is array-like
  for (var i = 0, len = attributes.length; i < len; i++) {
    attribute = attributes[i];
    result[attribute.name] = attribute.value;
  }
  return result;
}

/**
 * Corrects the tag name if it is case-sensitive (SVG).
 * Otherwise, returns the lowercase tag name (HTML).
 *
 * @param  {string} tagName - Lowercase tag name.
 * @return {string}         - Formatted tag name.
 */
function formatTagName(tagName) {
  tagName = tagName.toLowerCase();
  var caseSensitiveTagName = getCaseSensitiveTagName(tagName);
  if (caseSensitiveTagName) {
    return caseSensitiveTagName;
  }
  return tagName;
}

/**
 * Formats the browser DOM nodes to mimic the output of `htmlparser2.parseDOM()`.
 *
 * @param  {NodeList} nodes        - DOM nodes.
 * @param  {Element}  [parentNode] - Formatted parent node.
 * @param  {string}   [directive]  - Directive.
 * @return {Array<Comment|Element|ProcessingInstruction|Text>}
 */
function formatDOM(domNodes, parentNode, directive) {
  parentNode = parentNode || null;

  var domNode;
  var node;
  var prevNode;
  var output = [];

  for (var i = 0, len = domNodes.length; i < len; i++) {
    domNode = domNodes[i];

    // set the node data given the type
    switch (domNode.nodeType) {
      case 1:
        // script, style, or tag
        node = new Element(
          formatTagName(domNode.nodeName),
          formatAttributes(domNode.attributes)
        );
        node.children = formatDOM(domNode.childNodes, node);
        break;

      case 3:
        node = new Text(domNode.nodeValue);
        break;

      case 8:
        node = new Comment(domNode.nodeValue);
        break;
    }

    // set next for previous node
    prevNode = output[i - 1] || null;
    if (prevNode) {
      prevNode.next = node;
    }

    // set properties for current node
    node.parent = parentNode;
    node.prev = prevNode;
    node.next = null;

    output.push(node);
  }

  if (directive) {
    node = new ProcessingInstruction(
      directive.substring(0, directive.indexOf(' ')).toLowerCase(),
      directive
    );
    node.next = output[0] || null;
    node.parent = parentNode;
    output.unshift(node);

    if (output[1]) {
      output[1].prev = output[0];
    }
  }

  return output;
}

/**
 * Detects if browser is Internet Explorer.
 *
 * @param  {number}  [version] - IE version to detect.
 * @return {boolean}           - Whether IE or the version is detected.
 */
function isIE(version) {
  if (version) {
    return document.documentMode === version;
  }
  return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent);
}

module.exports = {
  formatAttributes: formatAttributes,
  formatDOM: formatDOM,
  isIE: isIE
};
