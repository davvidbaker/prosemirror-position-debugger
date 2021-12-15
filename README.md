Install

```
npm install prosemirror-position-debugger
```

Usage

```js
import { generateTokenSequenceStrings } from "prosemirror-position-debugger";

// where doc is a prosemirror document (a bonafide prosemirror node)
const [ positionString, documentString ] = generateTokenSequenceDiagram(doc);

// the strings line up with each other and are meaningless without each other
console.log(positionString);
console.log(documentString);
```

---

I wouldn't say the code in here is exemplary by any means. Lots of mutation, no tests (yet), no strong typing. Whatever 🤷‍♂️.
