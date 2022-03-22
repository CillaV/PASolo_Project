// import '../App.css';
// import { Link } from "@reach/router";


const LogReg = (props) => {



    const registerHandler = (e) => {
        e.preventDefault();

        // needs to be filled in

    }



    const loginHandler = (e) => {
        e.preventDefault();


        // needs to be filled in

    }

    return(


        <div className="logReg">


            <div style={{display:'flex', justifyContent:'center', paddingTop: '100px', fontSize:'xx-large'}} >
                Welcome to Hyrule
            </div>

            <div style={{display:'flex', justifyContent:'space-evenly', paddingTop:'75px'}}>


                <div>

                    <header>Registration</header>

                    <form onSubmit={registerHandler}>

                        <div>
                            <label>User Name: </label>
                            <input type="text"></input>
                        </div>

                        <div>
                            <label>Email: </label>
                            <input type="text"></input>
                        </div>

                        <div>
                            <label>Password: </label>
                            <input type="password"></input>
                        </div>

                        <div>
                            <label>Confirm Password: </label>
                            <input type="password"></input>
                        </div>
                        
                        <div className="regSub">
                        <button>START</button>
                        </div>

                    </form>
                </div>


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
                            <input type="text"></input>
                        </div>

                        <div>
                            <label>Password: </label>
                            <input type="password"></input>
                        </div>

                        
                        <div className="regSub">
                        <button>START</button>
                        </div>

                    </form>
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'center', paddingTop: '100px', color: 'white'}}>
                “I am the Hero of Time. No matter where or when I am, I will fight for Hyrule... and for Princess Zelda.”
                <br/>
                ― Akira Himekawa, 'Ocarina Of Time'.
            </div>


        </div>
    )
}

export default LogReg;