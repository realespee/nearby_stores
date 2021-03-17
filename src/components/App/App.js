import React, {useState, useContext} from 'react';
// import {firebaseAuth} from '.../Provider/AuthProvider'
// import SignIn from "../User/signin";
// import {Route, Switch} from 'react-router-dom'
// import Signup from '../User/signup'
import './App.css';
// import Map from '../Map/map'
import Main from '../Main/main'
import Navbar from '../Navbar/navbar'
import onScriptLoad1 from '../Main/main'

export default function App() {

  const [selectedStore, setSelectedStore] = useState({value: 'hardware_store', 
        label: 'Hardware Shops'});
        
  // const ref = useRef(null);
  // const handleRef = () => ref.current.onScriptLoad
        
  // Change selected option    
  const handleChange = (selectedOption) => {
    setSelectedStore(selectedOption)
  }
  
  // // Destructure token from Context
  // const { token } = useContext(firebaseAuth)
  // console.log(token)

  // const {handleSignup} = useContext(firebaseAuth)
  //   console.log(handleSignup)
  
  return (
        
      <div className="App">
        <div className='nav'><Navbar option={selectedStore} handleChange={handleChange} load={onScriptLoad1}/></div>
        <div className='main'><Main option={selectedStore}/></div>
      </div>
  );
}

