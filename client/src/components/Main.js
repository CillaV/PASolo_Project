// import '../App.css';
import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router';
import axios from 'axios';




const Main = (props) => {

    const [ userCommentList, setUserCommentList ] = useState([])
    const [ user, setUser ] = useState({})

    

    

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




    return(

        
        <div className="mainPage">
            
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
                <Link to={`/about/${user.username}`} style={{textDecoration: 'none', color: 'gold'}}>My Profile</Link> | <Link to="/allgames" style={{textDecoration: 'none', color: 'gold'}}>Legend of Zelda Games</Link>
                </div>

                <Link to="/" style={{textDecoration: 'none', color: 'gold', cursor: "pointer"}} onClick={logout} >Logout</Link>

            </div>

            <hr/>

            <div style={{display: "flex", justifyContent: "center", color: "white"}} >
                current user comments here
            </div>



        </div>
    )
}


export default Main;