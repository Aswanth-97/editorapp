import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useRefresh from "./hooks/useRefresh";
import usePrivateAxios from "./hooks/usePrivateAxios";
import TextContext from "./context/Textprovider";

const Sidebar = ({ showValue, editorRef }) => {
  const refresh = useRefresh();
  const [commitMessage, setCommitMessage] = useState({});
  const { text, setText, textEditorType, setTextEditorType } = useContext(TextContext);
  const [files, setFiles] = useState([]);
  const [createFile, setCreateFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showCommitfrm, setShowCommitfrm] = useState(null);
  const privateAxios = usePrivateAxios();

  useEffect(() => {
    privateAxios.get("/get/file").then((res) => {
      console.log(res.data.data);
      setFiles(res.data.data);
    });
  }, []);

  const handleCommit = async (e, fileId) => {
    e.preventDefault();

    try {
      console.log(text);
    } catch (error) {
      console.error(error);
    }
  };

  const folderHndler = (e) => {
    let cleanName = fileName.trim();

    // if (!cleanName.endsWith(".txt")) {
    //   cleanName += ".txt";
    // }

    const postTextName = async () => {
      try {
        const res = await privateAxios.post("/get/file", {
          fileName: cleanName,
        });
        // setFiles([...files, cleanName]);
        setFiles((prev) => [...prev, res.data.file]);

        setFileName("");

        setCreateFile(false);
      } catch (error) {
        console.error(error);
        console.log(error.response.data.message);
      }
    };
    postTextName();
  };

  const handleCommitForm = (fileName, editorType) => {
    showCommitfrm === fileName
      ? setShowCommitfrm(null)
      : setShowCommitfrm(fileName);

    setTextEditorType(editorType);
  };

  return (
    <div className="hidden md:flex md:flex-col md:w-72 h-full shrink-0 bg-zinc-800 border border-gray-900 p-4">
      <div className="flex-col flex h-screen">
        <section>
          <div className="flex flex-row  justify-end ">
            <button
              className="px-4 cursor-pointer text-green-600  dark:text-teal-500"
              onClick={() => {
                createFile ? setCreateFile(false) : setCreateFile(true);
                setShowCommitfrm(false);
              }}
            >
              <MdNoteAdd size={30} />
            </button>
          </div>
        </section>

        <div className="bg-gray-600 mt-3 flex-col  flex text-black rounded-2xl">
          {createFile && (
            <input
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
              type="text"
              placeholder="TextFile-name.."
              className="border p-3 text-xl rounded-2xl"
              onKeyUpCapture={(e) => {
                if (e.key === "Enter" && fileName.trim()) {
                  folderHndler(e);
                }
              }}
            />
          )}
        </div>

        <div className="overflow-y-auto flex flex-col history-height ">
          {files.map((file) => (
            <div
              tabIndex={0}
              className="flex px-1 items-start m-4 text-sm flex-col bg-zinc-800 text-white p-3  border-b border-zinc-700 cursor-pointer focus:border-white outline-none "
              key={file._id}
            >
              <div>
                <div className="flex flex-row items-center m-2 w-full justify-between">
                  <div
                    className=" flex flex-row items-center justify-between"
                    onClick={() =>
                      handleCommitForm(file.filename, file.editorType)
                    }
                  >
                    <IoDocumentTextSharp size={30} />
                    {file.filename}
                  </div>

                  <FaTrashAlt className="hover:text-red-700 " />

                  {showCommitfrm === file.filename ? (
                    <FaChevronUp
                      className="ml-2"
                      onClick={() => handleCommitForm(file.filename)}
                    />
                  ) : (
                    <FaChevronDown
                      className="ml-2"
                      onClick={() => handleCommitForm(file.filename)}
                    />
                  )}
                </div>

                <div>
                  {showCommitfrm == file.filename && (
                    <form
                      className="flex-col flex "
                      onSubmit={(e) => {
                        handleCommit(e, file._id);
                      }}
                    >
                      <input
                        required
                        type="text"
                        value={commitMessage[file._id] || ""}
                        placeholder="Commit message.."
                        className="border rounded-xl p-3 border-gray-500 bg-gray-800 "
                        onChange={(e) => {
                          setCommitMessage((prv) => ({
                            ...prv,
                            [file._id]: e.target.value,
                          }));
                        }}
                      />
                      <button
                        className="border-none mt-2 p-2 bg-green-800 hover:bg-green-700 rounded-sm active:bg-green-600"
                        type="submit"
                      >
                        Commit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
