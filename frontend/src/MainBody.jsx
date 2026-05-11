import React from "react";
import Sidebar from "./Sidebar";
import EditorBody from "./EditorBody";
import { useRef } from "react";

const MainBody = () => {
  const editorRef = useRef();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }



  

  return (
    <main>
      <div className="w-full h-screen flex">
        <Sidebar editorRef={editorRef} />

        <EditorBody handleEditorDidMount={handleEditorDidMount} />
      </div>
    </main>
  );
};

export default MainBody;
