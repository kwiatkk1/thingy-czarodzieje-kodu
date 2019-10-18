import React from "react";
import AceEditor from "react-ace";

// import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";

export default function CodeEditor(props) {
  return (
    <AceEditor
      placeholder="Tu wprowadź czarodziejski kod..."
      mode="javascript"
      theme="github"
      name="blah2"
      width="100%"
      height="calc(100% - 2em)"
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false
      }}
      {...props}
    />
  );
}
