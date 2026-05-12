import { createContext, useState } from "react";

const TextContext = createContext({});

export const TextProvider = ({ children }) => {
  
  const [text, setText] = useState("");
  const [textEditorType,setTextEditorType]= useState("monaco")

  

  return (
    <TextContext.Provider value={{ text, setText,textEditorType,setTextEditorType }}>
      {children}
    </TextContext.Provider>
  );
};

export default TextContext;
