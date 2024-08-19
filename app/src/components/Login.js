import React from "react";

import { useRef, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { Link,useNavigate,useLocation  } from "react-router-dom";


import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();


  const navigate = useNavigate();

  const location=useLocation();

  const from =location.state?.from?.pathname|| "/"

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    // we dont need to use the event object, so we can remove it
    e.preventDefault();
    console.log("inside handle submit")
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(JSON.stringify(res?.data));
      // console.log(JSON.stringify(res));
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      setAuth({user,pwd,roles,accessToken});
      setUser("");
      setPwd("");
       
      navigate(from,{replace:true});
    } catch (err) {
      if(!err?.response){
        setErrMsg("No Server Response");
      } 
      else if (err?.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } 
      else if (err?.response?.status === 401) {
        setErrMsg('Unauthorized');
      }
      else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();     
    }
  }

  const togglepersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])
  
  return (
     
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              //   this is used , when we load the page, the cursor will be in the username field
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <button>Sign In </button>
            <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={togglepersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust This Device</label>
            </div>

          </form>
          <p>
            Need an Account? <br />
            <span className="link">
              <a href="/register">Sign Up</a>
            </span>
          </p>
        </section>
      )}
  

export default Login;