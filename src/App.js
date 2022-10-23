import { Canvas } from '@react-three/fiber';
import Model from './Man2.js';
import { Html, OrbitControls } from '@react-three/drei';
import "./App.css";
import * as THREE from "three";
import { useEffect, useState } from 'react';

function App() {

  const [dance, setDance] = useState(1);
  const [hi, setHi] = useState(false);
  const [text, setText] = useState(false);
  const [alarm, setAlarm] = useState(false);



  function modelClick() {
    setDance(dance * -1);
    setText(!text);
  }

  useEffect(()=>{
    setTimeout(()=>{
      if(!hi){
        console.log('asdf');
        setHi(true);

        setTimeout(()=>{
            setHi(false);
        }, 3000);
      }
    }, 3000);
  },[]);

  
  function sendMessage(e) {
    if(e.keyCode===13) {
      const text = e.target.value;
      e.target.value="";
      console.log("msg " + text);
      setText(false);
      setAlarm(true);
      setTimeout(()=>{
        setAlarm(false);
      }, 3000);
    }
  }

  

  return (
    <Canvas>
      <OrbitControls />
      <primitive object={new THREE.AxesHelper(10)} />
      <directionalLight intensity={0.6} />
      <ambientLight intensity={3} />
      <Model onClick={()=>modelClick()} dance={dance} />
      <Html position={[0,-1,0]}>
        <div style={{color:'white',width:'100px'}}>
          정헌님
        </div>
      </Html>
      <Html position={[0,1.5,0]} onOcclude={setHi} style={{transition: 'all 0.5s', opacity: hi ? 1 : 0, transform: `scale(${hi ? 1 : 0.5})`}}>
      <div style={{backgroundColor:'white', border:'0px', width:'150px', height:'50px', borderRadius:'10px', lineHeight:'50px', paddingLeft:'10px'}}>
          안녕하세요 👍👏
        </div>
      </Html>

      <Html position={[0,1.5,0]} onOcclude={setText} style={{transition: 'all 0.5s', opacity: text ? 1 : 0, transform: `scale(${text ? 1 : 0.5})`}}>
        <input style={{backgroundColor:'white', border:'0px', width:'150px', height:'50px', borderRadius:'10px', lineHeight:'50px', paddingLeft:'10px'}}
        onKeyUp={(e)=>sendMessage(e)}
         />
      </Html>

      <Html position={[-0.5,2,0]} onOcclude={setAlarm} style={{transition: 'all 0.5s', opacity: alarm ? 1 : 0, transform: `scale(${alarm ? 1 : 0.5})`}}>
        <div style={{width:'200px', color:'white'}}>
          메시지가 전송되었습니다. 
        </div>
      </Html>
      
    </Canvas>
  );
}

export default App;
