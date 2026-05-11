import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import axios from "./api/axios";

const Register = () => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,16}$/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;

  const userNameRef = useRef(null);
  const errorRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(userName);

    setValidName(result);
  }, [userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);

    const match = matchPwd === pwd;

    setValidMatchPwd(match);

    setValidPwd(result);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrorMsg("Invaild Entry");
      return;
    }

    try {
      const res = await axios.post("/register/", {
        userName: userName,
        password: pwd,
      });

      console.log(res.data);
      console.log(res);

      setSucess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("UserName Taken");
      } else {
        setErrorMsg("Registration Failed");
      }

      errorRef.current.focus();
    }
  };

  return sucess ? (
    <>
      <div className="w-full h-screen flex bg-amber-600 flex-col justify-center items-center ">
        <section className="w-ful max-w-90 min-h-120 flex flex-col justify-start p-5 text-black border-0 shadow-2xl rounded-2xl min-w-64 bg-amber-300">
          <a href="#">Login Page</a>
        </section>
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex bg-amber-600 flex-col justify-center items-center ">
      <section className="w-ful max-w-90 min-h-120 flex flex-col justify-start p-5 text-black border-0 shadow-2xl rounded-2xl bg-amber-300">
        <p
          ref={errorRef}
          className={
            errorMsg ? "bg-pink-400 text-red-500 font-bold p-2 mb-2" : "sr-only"
          }
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        <h1 className="text-3xl font-bold ">Register</h1>
        <form className="flex flex-col grow pb-3  " onSubmit={handleSubmit}>
          <label className="mt-1 flex items-center " htmlFor="userName">
            UserName:
            <span className={validName ? "text-green-600 ml-0.5" : "hidden"}>
              <FaCheck />{" "}
            </span>
            <span
              className={
                validName || !userName ? "hidden" : "text-red-600 ml-0.5"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            className="font-stretch-125% text-xl p-2 rounded-2xl  border-2"
            type="text"
            ref={userNameRef}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
            autoComplete="off"
            id="userName"
            onFocus={() => {
              setUserNameFocus(true);
            }}
            onBlur={() => {
              setUserNameFocus(false);
            }}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
          />
          <p
            id="uidnote"
            className={
              userNameFocus && userName && !validName
                ? "text-sm rounded-2xl bg-gray-500 p-2 relative -bottom-2.5 "
                : "sr-only"
            }
          >
            <FaInfoCircle />4 to 24 Characters.
            <br />
            Must begins with a letter! <br />
            Letters,Numbers,UnderScores,Hyphens Allowed.
          </p>

          <label className="pt-2 flex items-center" htmlFor="password">
            Password:
            <span className={validPwd ? "text-green-600 ml-0.5" : "hidden"}>
              <FaCheck />{" "}
            </span>
            <span
              className={validPwd || !pwd ? "hidden" : "text-red-600 ml-0.5"}
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="password"
            autoComplete="off"
            className="font-serif text-2xl p-2 rounded-2xl  border-2"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            required
            id="password"
            onFocus={() => {
              setPwdFocus(true);
            }}
            onBlur={() => {
              setPwdFocus(false);
            }}
            aria-describedby="upnote"
          />
          <p
            className={
              pwdFocus && !validPwd && pwd
                ? "text-sm rounded-2xl bg-gray-500 p-2 relative -bottom-2.5"
                : "sr-only"
            }
            id="upnote"
          >
            <FaInfoCircle /> 8 to 24 characters
            <br />
            Must include uppercase and Lowercase Letters,A number!!
          </p>

          <label className="pt-2 flex items-center mt-2" htmlFor="password">
            Confirm Password:
            <span
              className={
                validMatchPwd && matchPwd ? "text-green-600 ml-0.5" : "hidden"
              }
            >
              <FaCheck />{" "}
            </span>
            <span
              className={
                validMatchPwd || !matchPwd ? "hidden" : "text-red-600 ml-0.5"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="password"
            autoComplete="off"
            className="font-serif text-2xl p-2 rounded-2xl  border-2"
            onChange={(e) => {
              setMatchPwd(e.target.value);
            }}
            required
            id="confirmPassword"
            onFocus={() => {
              setMatchPwdFocus(true);
            }}
            onBlur={() => {
              setMatchPwdFocus(false);
            }}
            aria-describedby="upcnote"
          />
          <p
            className={
              matchPwdFocus && !validMatchPwd
                ? "text-sm rounded-2xl bg-gray-500 p-2 relative -bottom-2.5"
                : "sr-only"
            }
            id="upcnote"
          >
            <FaInfoCircle />
            Must Match the Password
          </p>
          <button
            disabled={!validName || !pwd || !validMatchPwd ? true : false}
            className=" text-2xl bg-amber-800 p-2 rounded-2xl mt-5 hover:bg-amber-700 active:bg-amber-900 disabled:bg-amber-200
            disabled:hover:bg-amber-200"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already Registered ? <br />
          <span className="inline-block">
            <a href="#">Sign In</a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
