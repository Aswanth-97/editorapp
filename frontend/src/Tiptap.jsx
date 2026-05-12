import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import "./tiptap-style/tiptap.css";

const Tiptap = () => {
  const [isEditable, setIsEditable] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello Worldppppp!</p>", // initial content
    autofocus: "end",
  });

  if (!editor) return null;

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <div className="w-full border rounded-md p-4 bg-white overflow-y-auto">
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
          Editable
        </label>
      </div>
      <EditorContent editor={editor} className="ProseMirror text-black" />

      {editor && (
        <FloatingMenu editor={editor}>
          <div className="floating-menu" data-testid="floating-menu">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet list
            </button>
          </div>
        </FloatingMenu>
      )}
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Tiptap;
