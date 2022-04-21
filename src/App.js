import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import SignUp from './signup';
import SignIn from './signin';
//import Home from './home';
//import Feed from './components/DashMain';
//import './App.css';
//import  Page  from './pages/Page';
//import MatchDetailCard from './comps/MatchDetailCard';
//import MatchSmallCard from './comps/MatchSmallCard';
import DashBoard from './pages/DashMain';
//import Sample from './components/Sample';





const App = () => {

  return (
  
    <div>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/" element={<Sample />} />           */}
          {/* <Route path="/dashboard" element={<DashBoard page='dash' />} /> */}
          {/* <Route path="/table" element={<DashBoard page='table' />} /> */}
          {/* <Route path="/maps" element={<DashBoard page='maps' />} />
          <Route path="/register" element={<SignUp />} /> */}
        </Routes>
        <div></div>
        </div>
  
      </Router>
    </div>
  );
}



export default App;
