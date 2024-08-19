import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// overall it will be 4 to 24 characters long
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[\w!@#\$%\^&\*]{8,24}$/;

const Register = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);
  // useRefs are used to access the DOM elements directly, without using the event object, in this case, the input element and the error message element, respectively, are accessed directly, without using the event object to access them indirectly,

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const REGISTER_URL = "/register";

  useEffect(() => {
    userRef.current.focus();
  }, []);
  // it going to be setting the focus when the component loads on the user input field

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(""); // this means that the error message is empty
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if the button was enabled with js hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || pwd !== matchPwd) {
      setErrMsg("Invalid input. Please check the fields.");
      return;
    }
    try{
        const response=await axios.post(REGISTER_URL,
            JSON.stringify({user,pwd}),
            {headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
        );
        console.log(response.data)
        console.log(response.accessToken)
        console.log(JSON.stringify(response))
        setSuccess(true);
        // clear input fields
        setUser("");
        setPwd("");
        setMatchPwd("");
        userRef.current.focus();


    }catch(err){
        if(!err?.response){
            setErrMsg("No server Response")
        }
        else if (err.response?.status===409){
            setErrMsg('Username Taken')
        }
        else{

            setErrMsg("Registration Failed");
        }
        errRef.current.focus();
        // this is for screen readers
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <a href="/login">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters long. <br />
              Must start with a letter. <br />
              May contain letters, numbers, hyphens, and underscores.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {/* we dont have auto complete because it is not supported in password fields
        also we dont have a reference to the password field because we are not going to be setting the focus on the password field */}
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters long. <br />
              Must contain at least one uppercase letter, one lowercase letter,
              one number, and one special character. Allowed special characters
              are : <span aria-label="exclamation mark">!</span>
              <span aria-label="at sign">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent sign">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password above.
            </p>
            <button
              disabled={!validName || !validPwd || !validMatch}
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already Registered? <br />
            <span className="line">
              {/* put router link here */}
              <a href="/login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
