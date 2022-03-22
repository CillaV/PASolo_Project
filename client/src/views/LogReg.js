import Login from "../components/Login";
import Register from "../components/Register";



const LogReg = (props) => {


    return(



        <div className="logReg">
            
            <div className="logRegTitle">
                <div>Welcome to Hyrule</div>
            </div>

            <div className="logRegForms">
                <Register />
                <Login />
            </div>

            <div className="logRegQuote">
                “I am the Hero of Time. No matter where or when I am, I will fight for Hyrule... and for Princess Zelda.”
                <br/>
                ― Akira Himekawa, 'Ocarina Of Time'.
            </div>

        </div>
        
        
    )
}

export default LogReg;