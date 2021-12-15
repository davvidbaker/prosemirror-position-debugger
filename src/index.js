function emptySpaces(length) {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += " ";
  }
  return str;
}

function recursivelyAddToStrings(
  [positionString, documentString, curPos],
  node
) {
  let curPosString = String(curPos);

  positionString += curPosString;
  documentString += emptySpaces(curPosString.length);

  const isText = node.type.name === "text";
  const openingTag = isText ? node.text : `<${node.type.name}>`;

  documentString += openingTag;
  positionString += emptySpaces(openingTag.length);

  // Entering or leaving a node that is not a leaf node (i.e. supports content) counts as one token.
  // So if the document starts with a paragraph, the start of that paragraph counts as position 1.
  // ... and
  // Each character in text nodes counts as one token.
  // So if the paragraph at the start of the document contains the word “hi”, position 2 is after the “h”, position 3 after the “i”, and position 4 after the whole paragraph.

  curPos += node.isLeaf ? node.nodeSize : 1;

  if (node.content) {
    [positionString, documentString, curPos] = node.content.content.reduce(
      recursivelyAddToStrings,
      [positionString, documentString, curPos]
    );
  }

  if (!node.isLeaf) {
    curPosString = String(curPos);
    positionString += curPosString;
    documentString += emptySpaces(curPosString.length);

    const closingTag = `</${node.type.name}>`;
    documentString += closingTag;
    positionString += emptySpaces(closingTag.length);
  }

  // Entering or leaving a node that is not a leaf node (i.e. supports content) counts as one token.
  curPos += node.isLeaf ? 0 : 1;

  return [positionString, documentString, curPos];
}

function generateTokenSequenceStrings(doc) {
  let positionString = "     ";
  let documentString = "<doc>";

  [positionString, documentString, curPos] = doc.content.content.reduce(
    recursivelyAddToStrings,
    // The start of the document, right before the first content, is position 0.
    [positionString, documentString, 0]
  );

  positionString += String(curPos);
  documentString += emptySpaces(String(curPos).length) + "</doc>";

  return [positionString, documentString];
}

module.exports = { generateTokenSequenceStrings };
