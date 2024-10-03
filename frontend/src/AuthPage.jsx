import axios from "axios";
import React from "react";
import './AuthPage.css';
import LoginPattern from './assets/images/LoginPattern.png';

class AuthPage extends React.Component {
  state = { details: [] };

  componentDidMount() {
    let data;
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onSubmit = (data) => {
    console.log(data.target.username.value);
    axios.post("http://localhost:8000/", {
      username: data.target.username.value,
      email: data.target.email.value,
    });
  };

  render() {
    return (
        // 
        <div className="auth-container">
            <div className="left-container">
                <h4>Kangaroo</h4>
                <h1 id='hello'>Hello,</h1>
                <h1>Please Login</h1>
                <form action="#" method="POST" class = 'auth-form'>
                    <input className="username-input"
                        type="text" 
                        name="username" 
                        placeholder="Username..." 
                        required 
                    />
                    <input className="password-input"
                        type="password" 
                        name="password" 
                        placeholder="Password..." 
                        required 
                    />
                    <button className="loginBtn" type="submit">Login</button>
                    <button className="signUpBtn">Sign Up</button>
                    <a href="#">Sign Up</a>
                    <a href="#">Forgot Password?</a>
                </form>

            </div>
            <div className="right-container">
            
            </div>
            
        </div>
    //   <div>
    //     <header>Enter Info Below</header>
    //     <hr />
    //     <form onSubmit={this.onSubmit}>
    //       <label>
    //         Username: <input type="text" name="username" />
    //       </label>
    //       <label>
    //         Email: <input type="email" name="email" />
    //       </label>
    //       <button type="submit">Submit</button>
    //     </form>
    //     {this.state.details.map((output, id) => (
    //       <div key={id}>
    //         <h1>{output.username}</h1>
    //         <h2>{output.email}</h2>
    //       </div>
    //     ))}
    //   </div>
    );
  }
}

export default AuthPage;
