import axios from "axios";
import React from "react";

class App extends React.Component {
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
      .catch((err) => {});
  }
  render() {
    const onSubmit = (data) => {
      console.log(data.target.username.value);
      axios.post("http://localhost:8000/", {
        username: data.target.username.value,
        email: data.target.email.value,
      });
    };
    return (
      <div>
        <header>Enter Info Below</header>
        <hr></hr>
        <form onSubmit={onSubmit}>
          <label>
            Username: <input type="text" name="username" />
          </label>
          <label>
            Email: <input type="email" name="email" />
          </label>
          <button type="submit">submit</button>
        </form>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div>
              <h1>{output.username}</h1>
              <h2>{output.email}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
