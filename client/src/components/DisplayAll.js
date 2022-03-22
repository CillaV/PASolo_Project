import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, navigate } from "@reach/router";



const DisplayAll = (props) =>{


    const [user, setUser] = useState({})
    const [ gameList, setGameList ] = useState([])



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


    
    useEffect(() =>{
        axios.get("https://zelda.fanapis.com/api/games")
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                console.log(res.data.data)
                setGameList(res.data.data)
            })
            .catch((err)=> {
                console.log(err)
            })
    }, [])

    return(



        <div className="allTitles">
            
            
            <header style={{display:'flex', justifyContent: 'space-evenly', color: 'gold' }} >

                <Link to="/home" style={{textDecoration: 'none', color: 'gold'}}>Home</Link>

                <div style={{fontSize: '30px', textDecoration: 'underline'}}>Releases</div>

                <Link to="/" style={{textDecoration: 'none', color: 'gold'}}>Logout</Link>

            </header>
            
            {

                gameList?

                gameList.map((game, index)=>(
                    
                    
                    <div className="zeldaList" key={index}>
                        <div>
                            <Link style={{textDecoration: "none", color: "white"}}to={`/allgames/${game.id}`} >{game.name}</Link>
                            
                        </div>

                    </div>
                ))
                :null
            }
            
        </div>
    )
}

export default DisplayAll;