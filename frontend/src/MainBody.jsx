import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import EditorBody from "./EditorBody";
import { useRef } from "react";
import Tiptap from "./Tiptap";
import TextContext from "./context/Textprovider";

const MainBody = () => {
  const { text, setText, textEditorType, setTextEditorType } =
    useContext(TextContext);

  const editorRef = useRef();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <main>
      <div className="w-full h-screen flex">
        <Sidebar editorRef={editorRef} />
        {textEditorType == "monaco" ? (
          <EditorBody handleEditorDidMount={handleEditorDidMount} />
        ) : (
          <Tiptap />
        )}
      </div>
    </main>
  );
};

export default MainBody;
