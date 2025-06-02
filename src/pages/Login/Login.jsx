import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import './Login.css'
import { signIn, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
const Login = () => {
  const [ signState, setSignState ] = useState('Sign In');
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoadig ] = useState(false)

  const user_auth = async (e) =>{
    e.preventDefault();
    setLoadig(true);
    if(signState === 'Sign In'){
      await signIn(email, password)
    } else {
      await signUp(name, email, password)
    }
    setLoadig(false)
  }

  return (
    loading ? <div className="loading-spinner">
      <img src={netflix_spinner} alt ="" />
    </div>:
    <div className='Login'>
      <img src={logo} alt="" className='logo'/>
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up' ? <input 
          type="text" 
          value={name}
          onChange={e =>{setName(e.target.value)}}
          placeholder='Your Name' />
          :<></>}
          <input
          value={email}
          onChange={e =>{setEmail(e.target.value)}}
          type="email"
          placeholder='Email' />
          <input
          value={password}
          onChange={e =>{setPassword(e.target.value)}}
          type="password"
          placeholder='Password' />
          <button type='submit' onClick={user_auth}>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ?
          <p>New to NetFlix? <span onClick={() =>setSignState('Sign Up')}>Sign Up Now</span></p>
          : <p>Already Have Account? <span onClick={() =>setSignState('Sign In')}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
