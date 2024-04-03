import { useState } from "react";
import axios from "axios";
function Login() {
  const [data, setdata] = useState({ email: "", password: "" });
  function changehandler(event) {
    setdata(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }
  async function sumbitHandler(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/login", {
        data
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
     <h1 className="text-blue-500">Login</h1>
    <form onSubmit={sumbitHandler}>
      <h2>Email</h2>
      <input type="email" onChange={changehandler} name="email" value={data.email} id="" />
      <h2>password</h2>
      <input type="password" onChange={changehandler} name="password" value={data.password} id="" />
      <button>Sumbit</button>
    </form>
    <p>New to here?</p>
    <button>login</button>
    </div>
  )
}
export default Login;