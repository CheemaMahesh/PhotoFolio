
import './App.css';
import {useEffect} from "react"

import Album from './Album';

function App() {
  useEffect(()=>{
    document.title="PhotoFolio"
  },[])


  return (
    <div className="App">
     <div className="Header">
      <img src="https://cdn.pixabay.com/photo/2018/08/03/16/24/camera-3582217_640.png"/>
      <h1>PhotoFolio</h1>
     </div>
     <Album/>
    </div>
  );
}

export default App;
