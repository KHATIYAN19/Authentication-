import { useState } from "react";
import axios from "axios";
function Signup() {
    const [data, setdata] = useState({ Name: "", email: "", password: "",phone:"" });
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
            await axios.post("http://localhost:8080/api/v1/signup", {
                data
            })
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={sumbitHandler}>
                <h2>Name</h2>
                <input type="text" onChange={changehandler} name="Name" value={data.Name} id="" />
                <h2>Email</h2>
                <input type="email" onChange={changehandler} name="email" value={data.email} id="" />
                <h2>Phone number</h2>
                <input type="text" onChange={changehandler} name="phone" value={data.phone} id="" />
                <h2>password</h2>
                <input type="password" onChange={changehandler} name="password" value={data.password} id="" />
                <button>Sumbit</button>
            </form>
            <p>Already have account?</p>
            <button>Signup</button>
        </div>
    )
}
export default Signup;