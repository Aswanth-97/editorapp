import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import "./tiptap-style/tiptap.css";

const Tiptap = () => {
  const [isEditable, setIsEditable] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: "<p>Hello Worldppppp!</p>", // initial content
    autofocus: "end",
  });

  if (!editor) return null;

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const isBold = editor.isActive("bold");
  const isItalic = editor.isActive("italic");
  const isStrike = editor.isActive("strike");

  console.log(editor.getAttributes("textStyle"));

  return (
    <div className="w-full border rounded-md p-4 bg-white overflow-y-auto">
      <div className="control-group">
        <label>
          <button onClick={() => setShowMenu((v) => !v)}>Toggle menu</button>
        </label>
        <label>
          <input
            className="m-2"
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

      {showMenu && (
        <BubbleMenu editor={editor} options={{ placement: "bottom" }}>
          <div className="bubble-menu">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={isBold ? "is-active" : ""}
            >
              Bold
            </button>

            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={isItalic ? "is-active" : ""}
            >
              Italic
            </button>

            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={isStrike ? "is-active" : ""}
            >
              Strike
            </button>

            <input
              type="color"
              onChange={(e) =>
                editor
                  .chain()
                  .focus()
                  .setHighlight({ color: e.target.value })
                  .run()
              }
            />
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default Tiptap;
