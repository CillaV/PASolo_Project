import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';




const UserProfile = (props) => {


    const { username } = props;

    const [user, setUser] = useState({
        username: "",
        about: ""
    })

    
    

    const [ errors, setErrors ] = useState({})


    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/lock",
        {withCredentials: true}
        )
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err)
            navigate("/") // added to keep someone from clicking back or typing in url
        })
    }, [])


    const logout = (e) =>{
        axios.post("http://localhost:8000/api/users/logout",
        {},
        {
            withCredentials: true
        }
        )
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const changeHandler = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const updateHandler = (e) =>{
        e.preventDefault();

        axios.put(`http://localhost:8000/api/users/${user._id}`, 
            user,
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
                console.log(err.response)
                console.log(err.response.data)
                console.log(err.response.data.error)
                setErrors(err.response.data.error.errors)
            })
    }


    const deleteProfile = (profileId) =>{
        axios.delete(`http://localhost:8000/api/users/${profileId}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                navigate("/")
            })
            .catch((err)=>{
                console.log(err)
            })
    }



    return(


        <div className='profilePage'>
            

            <header style={{display:'flex', justifyContent: 'space-evenly', color: 'gold'}}>

                {/* <Link to="/about" style={{textDecoration: 'none', color: 'gold'}}>My Profile</Link> */}

                <div style={{fontSize: '30px', textDecoration: 'underline'}}>Hey! Listen!</div>

                {/* <Link to="/" style={{textDecoration: 'none', color: 'gold'}}>Logout</Link> */}

            </header>

            <div style={{color: 'gold', fontSize: '20px', fontWeight: 'bold', paddingLeft: "60px"}}>
                    Hi, {user.username}!
            </div>

            <div style={{display: "flex", justifyContent: "space-between", paddingLeft: "80px", paddingRight: "80px"}}>
                
                <div>
                    <Link to="/home" style={{textDecoration: 'none', color: 'gold'}}>Home</Link> | <Link to="/allgames" style={{textDecoration: 'none', color: 'gold'}}>Legend of Zelda Games</Link>
                </div>

                <Link to="/" style={{textDecoration: 'none', color: 'gold', cursor: "pointer"}} onClick={logout} >Logout</Link>

            </div>


            <form style={{border: "none"}} onSubmit={updateHandler}>
                <div className="profileInfo">
                <div >
                    <div>
                        <label>Username:</label>
                        {errors.username ? <div className="errorText">{errors.username.message}</div> : null}
                        <input style={{fontWeight: 'bold'}} name="username" value={user.username} onChange={changeHandler}></input>
                    </div>
                    

                    <div>
                        <label>About Me</label>
                        <textarea type="text" name="about" value={user.about} onChange={changeHandler}></textarea>
                    </div>

                </div>

                <div>
                    <label>Top 3 titles</label>
                    <br/>
                    <br/>

                    <input></input>
                    <br/>

                    <input></input>
                    <br/>

                    <input></input>
                </div>
                </div>

                <div style={{display: "flex", justifyContent: "center"}}>
                    
                    <button className='updateButton'>UPDATE PROFILE</button>
                </div>

            </form>
            
            <div style={{display: "flex", justifyContent: "flex-end", paddingRight: "50px"}}>
            <button className='deleteButton' onClick={()=>{deleteProfile(user._id)}}>DELETE PROFILE</button>
            </div>
            
        </div>

    )
}

export default UserProfile;