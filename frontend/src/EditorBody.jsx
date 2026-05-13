import React, { useContext, useRef } from "react";
import Editor from "@monaco-editor/react";
import TextContext from "./context/Textprovider";

const EditorBody = ({ handleEditorDidMount }) => {
  const { text, setText } = useContext(TextContext);

  const textCollector = (value, e) => {
    setText(value);
  };

  return (
    <main className="w-full md:flex-1 h-full flex-col">
      <Editor
        onMount={handleEditorDidMount}
        theme="vs-dark"
        height="100%"
        defaultLanguage="plaintext"
        options={{
          renderLineHighlight: "none",
          automaticLayout: true,
          padding: {
            top: 16,
            bottom: 16,
          },
        }}
        onChange={textCollector}
      />
    </main>
  );
};

export default EditorBody;
