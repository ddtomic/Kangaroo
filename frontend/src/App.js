import "./App.css";
npm 

function App() {
  return (
    <body>
      <div className="top-box">
          <div className="header">
            <p>Kangaroo</p>
            <input type="text" id="search" className="search-box" placeholder="Search Roo..."></input>
          </div>
          <div className="top-links">
           
            <a href="/">Notifiacation</a>
            <a href="/">Login</a>
          </div>
      </div>
      <div className="main">
        <div className="left-side"> 
          <div className="login">
              <p>Login</p>
              <input type="text" placeholder="Enter Username..."></input>
              <input type="password" placeholder="Enter Password..."></input>
              <button>Login</button>
          </div>
          <div className="sign-up">
              <p>Don't have an account?</p>
              <input type="text" placeholder="Enter Email..."></input>
              <input type="text" placeholder="Enter Username..."></input>
              <input type="password" placeholder="Enter Password..."></input>
              <button>Sign Up</button>
          </div>
        </div>
        <div className="middle">
          <div className="container">
            <ol>
              <li className="row">
                <a href="/">
                  <h4 className="thread-title">
                      title
                  </h4>
                  <h5 className="user">
                    username
                  </h5>
                    <div className="bottom">
                        <h5 className="time-display">
                            9/12/2024
                        </h5>
                        <h5 className="comment-count">
                            10 comments
                        </h5>
                    </div>
                </a>
              </li>
              <li className="row">
                <a href="/">
                  <h4 className="username">
                      Username
                  </h4>
                  <p className="comment">
                    Comment
                  </p>
                    <div className="bottom">
                        <p className="time-display">
                            9/12/2024
                        </p>
                        <p className="comment-count">
                            10 comments
                        </p>
                    </div>
                </a>
              </li>
              <li className="row">
                <a href="/">
                  <h4 className="username">
                      Username
                  </h4>
                  <p className="comment">
                    Comment
                  </p>
                    <div className="bottom">
                        <p className="time-display">
                            9/12/2024
                        </p>
                        <p className="comment-count">
                            10 comments
                        </p>
                    </div>
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="right-side">
          <div className="thread">
              <p>Roo Name</p>
              <input type="text" placeholder="Enter Title..."></input>
              <p>Roo</p>
          </div>
        </div>
      </div>
      
    </body>
  );
}

export default App;
