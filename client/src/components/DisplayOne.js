import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";



const DisplayOne = (props) =>{

    const {id} = props

    const [game, setGame ] = useState({})

    const [user, setUser ] = useState({})



    useEffect(() =>{
        axios.get(`https://zelda.fanapis.com/api/games/${id}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                console.log(res.data.data)
                setGame(res.data.data)
            })
            .catch((err)=> {
                console.log(err)
            })
    }, [])

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


        <div className="oneTitle" >
            <div>    
                <header style={{display:'flex', justifyContent: 'space-evenly', color: 'darkgreen'}}>

                    {/* <Link to="/about" style={{textDecoration: 'none', color: 'gold'}}>My Profile</Link> */}

                    <div style={{fontSize: '30px', textDecoration: 'underline'}}>Hey! Listen!</div>

                    {/* <Link to="/" style={{textDecoration: 'none', color: 'gold'}}>Logout</Link> */}

                </header>

                <div style={{color: 'darkgreen', fontSize: '20px', fontWeight: 'bold', paddingLeft: "60px"}}>
                    {game.name}
                </div>

                <div style={{display: "flex", justifyContent: "space-between", paddingLeft: "80px", paddingRight: "80px"}}>

                    <div>
                        <Link to="/home" style={{textDecoration: 'none', color: 'darkgreen'}}>Home</Link> | <Link to="/allgames" style={{textDecoration: 'none', color: 'darkgreen'}}>Legend of Zelda Games</Link>
                    </div>

                    <Link to="/" style={{textDecoration: 'none', color: 'darkgreen', cursor: "pointer"}} onClick={logout} >Logout</Link>

                </div>

                <br/>

                <div className="titleInfo" >
                    <div>
                        <label className="titleLabel">Description: </label>
                        <div style={{width: "700px"}}>{game.description}</div>
                    </div>
                    
                    <div >
                        
                        <div>
                            <label className="titleLabel">Developer: </label>{game.developer}
                        </div>
                        
                        <div>
                            <label className="titleLabel">Publisher: </label>{game.publisher}
                        </div>

                        <div>
                            <label className="titleLabel">Release Date: </label>{game.released_date}
                        </div>
                    </div>
                </div>

                <hr/>

                <div style={{display: "flex", justifyContent: "center"}} >
                    comments by game
                </div>
                    
                    
                
            
            
            </div>
            

            

        </div>
    )
}


export default DisplayOne;