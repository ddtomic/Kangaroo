// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import './Login.css'

const login = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(false); 

    const setActive= () =>{
        setIsActive(true);
    }

    const resetActive = () =>{
        setIsActive(false); 
    }

   
    
  return (
    <body>
        <div className={`container${isActive ? " active" : ''}`} id='container'>
      <div className='form-container sign-up'>
        <form>
            <h1>Create Account</h1>
            <input type='text' placeholder='Email...'></input>
            <input type='text' placeholder='Username...'></input>
            <input type='text' placeholder='Password...'></input>
            <button>Sign Up</button>
        </form>
      </div>

      <div className='form-container sign-in'>
        <form>
            <h1>Sign In</h1>
            <input type='text' placeholder='Username...'></input>
            <input type='text' placeholder='Password...'></input>
            <button>Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
            <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Dont have an account? Register with your information to create one!</p>
                <button className="hidden" id='login' onClick={resetActive}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
                <h1>Hello!</h1>
                <p>Already have an account? Click the button to sign in!</p>
                <button className="hidden" id='register' onClick={setActive}>Sign Up</button>
            </div>
        </div>
      </div>
    </div>
    </body>
  )
}

export default login
