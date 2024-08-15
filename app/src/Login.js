import { useRef, useState, useEffect } from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(()=>{
      setErrMsg('');
    }, [user, pwd])
  return (
    <section>
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e)=> setUser(e.target.value)}
            value={user}
            required
        />
        <label htmlFor="username">Username:</label>
        <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e)=> setUser(e.target.value)}
            value={user}
            required
        />
      </form>
    </section>
  )
}

export default Login
