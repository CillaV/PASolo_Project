import './App.css';
import { Router } from '@reach/router';

import LogReg from './views/LogReg';
import Main from './components/Main';
// import LogReg from './components/LogReg';
import DisplayAll from './components/DisplayAll';
import UserProfile from './components/UserProfile';
import DisplayOne from './components/DisplayOne';



function App() {
  return (
    <div className="App">
      
      <Router>

        <LogReg path="/" />
        {/* <LogReg path="/" /> */}
        
        <Main path="/home" />
        
        <DisplayOne path="/allgames/:id" />

        <DisplayAll path="/allgames" />
        
        <UserProfile path="/about/:username" />

      </Router>

    </div>
  );
}

export default App;
