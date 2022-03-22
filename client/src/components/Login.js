import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const Login  = (props) => {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setErrors ] = useState("")


    const loginHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login",
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        )
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                navigate("/home")
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.message)
            })
        

    }


    return(

        <div>
            <header>Login</header>

            <form onSubmit={loginHandler}>

                {/* find how to make username unique */}
                {/* <div> 
                    <label>User Name: </label>
                    <input type="text"></input>
                </div> */}

                <div>
                    <label>Email: </label>
                    {error ? <div className="errorText">{error}</div> : ""}
                    <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} ></input>
                </div>

                <div>
                    <label>Password: </label>
                    {error ? <div className="errorText">{error}</div> : ""}
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} ></input>
                </div>

                
                <div className="regSub">
                <button>START</button>
                </div>

            </form>
        </div>
    )
}

export default Login;