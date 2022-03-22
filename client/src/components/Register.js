import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Register  = (props) => {


    const [ confirmReg, setConfirmReg ] = useState("")

    const [ errors, setErrors ] = useState({})



    const [ user, setUser ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    const changeHandler = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const registerHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true
            }
        )
            .then((res)=>{
                console.log(res.data)
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                setConfirmReg("Data received, proceed.")
                setErrors({}) // reset any error messages
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return(

        <div>

            <header>Registration</header>

            <form onSubmit={registerHandler}>

                <div>
                    <label>Username: </label>
                    {errors.username ? <div className="errorText">{errors.username.message}</div> : null}
                    <input type="text" name="username" value={user.username} onChange={changeHandler} ></input>
                </div>

                <div>
                    <label>Email: </label>
                    {errors.email ? <div className="errorText">{errors.email.message}</div> : null}
                    <input type="text" name="email" value={user.email} onChange={changeHandler} ></input>
                </div>

                <div>
                    <label>Password: </label>
                    {errors.password ? <div className="errorText">{errors.password.message}</div> : null}
                    <input type="password" name="password" value={user.password} onChange={changeHandler} ></input>
                </div>

                <div>
                    <label>Confirm Password: </label>
                    {errors.confirmPassword ? <div className="errorText">{errors.confirmPassword.message}</div> : null}
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={changeHandler} ></input>
                </div>
                
                <div className="regSub">
                    <button>START</button>
                </div>

            </form>
            
            
            {confirmReg ? <h5>{confirmReg}</h5> : null}
            
        </div>
    )
}

export default Register;