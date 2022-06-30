Install

```
npm install prosemirror-position-debugger
```

Usage

```js
import { generateTokenSequenceStrings } from "prosemirror-position-debugger";

// where doc is a prosemirror document (a bonafide prosemirror node)
const [ positionString, documentString ] = generateTokenSequenceStrings(doc);

// the strings line up with each other and are meaningless without each other
console.log(positionString);
console.log(documentString);
```

To use it in a prosemirror plugin, you could do something like this
```js
import { Plugin } from 'prosemirror-state'

const positionDebuggerPlugin = new Plugin({
  key: "position-debugger",
  view: (editorView) => ({
    update: (view, prevState) => {
      // method using just the doc
      const [positionString, documentString] = generateTokenSequenceStrings(
        view.state.doc
      );

      let posEl = document.querySelector("#position-debugger-positions");
      let docEl = document.querySelector("#position-debugger-document");
      const alreadyExists = Boolean(posEl);
      if (!alreadyExists) {
        posEl = document.createElement("pre");
        docEl = document.createElement("pre");
        posEl.id = "position-debugger-positions";
        docEl.id = "position-debugger-document";
        document.querySelector("#my-container").append(posEl, docEl);
      }

      posEl.innerText = positionString;
      docEl.innerText = documentString;
    },
    destroy: () => {
      // do whatever destruction you'd like
    },
  }),
});
```


---

I wouldn't say the code in here is exemplary by any means. Lots of mutation, no tests (yet), no strong typing. Whatever 🤷‍♂️.
