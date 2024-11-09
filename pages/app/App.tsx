import React, { useState } from 'react'
import { QuatEstimateContextProvider } from '../../src';
import QuatEstimateDevice from './components/QuatEstimateDevice';
import { ThreeFiberQuaternion } from './components/ThreeFiberQuaternion';

//import './App.css'; // ==> ../index.html

// https://qiita.com/sho-19202325/items/b1d56c627856818f4bf0

function App() {
  const [connected, setConnected] = useState(false);
  const [quaternion, setQuaternion] = useState({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 })

  return (
    <div className="App">
      <QuatEstimateContextProvider connectionName='QuatEstimator' bluetooth={window.navigator.bluetooth}>
        <QuatEstimateDevice onConnected={setConnected} onQuaternionChanged={setQuaternion} />
      </QuatEstimateContextProvider>
      <ThreeFiberQuaternion
        rotation={!connected}
        qw={quaternion.w}
        qx={quaternion.x} qy={quaternion.y} qz={quaternion.z} />
    </div>
  );
}

export default App;
