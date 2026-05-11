import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./AuthProvider.jsx/AuthProvider";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const { setAuth, auth } = useAuth();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [pwd, userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/login",
        {
          userName: userName,
          password: pwd,
        },
        {
          withCredentials: true,
        },
      );

      const accessToken = response?.data?.accessToken;
      const Roles = response?.data?.roles;

      setAuth({ userName, pwd, accessToken, Roles });

      console.log(accessToken);

      setSuccess(true);
      setPwd("");
      setUserName("");

      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("Server Not Responding");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 404) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }

      errorRef.current.focus();
    }
  };

  console.log(auth);

  return (
    <div className="w-full h-screen flex bg-amber-600 flex-col justify-center items-center ">
      <section className="w-ful max-w-90  flex flex-col justify-start p-5 text-black border-0 shadow-2xl rounded-2xl bg-amber-300">
        <p
          ref={errorRef}
          className={
            errorMsg ? "bg-red-300 text-red-500 font-bold p-2 mb-2" : "sr-only"
          }
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        <h1 className="text-3xl font-bold mb-4 ">Login</h1>
        <form
          className="flex flex-col grow pb-3 gap-3 "
          onSubmit={handleSubmit}
        >
          <label htmlFor="userName">UserName:</label>
          <input
            className="font-stretch-125% text-xl p-2 rounded-2xl  border-2"
            type="text"
            value={userName}
            ref={userRef}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
            autoComplete="off"
            id="userName"
            aria-describedby="uidnote"
          />
          <label htmlFor="password"> Password:</label>
          <input
            className="font-stretch-125% text-xl p-2 rounded-2xl  border-2"
            type="password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            required
            autoComplete="off"
            id="password"
            aria-describedby="uidnote"
          />
          <button
            className=" text-2xl bg-amber-800 p-2 rounded-2xl mt-5 hover:bg-amber-700 active:bg-amber-900 disabled:bg-amber-200
            disabled:hover:bg-amber-200"
          >
            LogIn
          </button>
        </form>
        <p>
          Need an Acc? <br />
          <span className="inline-block font-bold">
            <Link to={"/reg"}>Sign Up</Link>
            {/* <a href="#">Sign In</a> */}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
