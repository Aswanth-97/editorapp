import { createContext, useState } from "react";

const TextContext = createContext({});

export const TextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [textEditorType, setTextEditorType] = useState("monaco");
  const [tiptapText, setTiptapText] = useState({});

  return (
    <TextContext.Provider
      value={{
        text,
        setText,
        textEditorType,
        setTextEditorType,
        tiptapText,
        setTiptapText,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export default TextContext;
