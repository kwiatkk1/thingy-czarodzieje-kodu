import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

export default function CodeEditor(props) {
  return (
    <AceEditor
      placeholder="Tu wprowadź czarodziejski kod..."
      mode="javascript"
      theme="github"
      name="blah2"
      width="100%"
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      {...props}
    />
  );
}
