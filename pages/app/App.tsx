import React from 'react'
import { QuatEstimateContextProvider } from '../../src';
import QuatEstimateDevice from './components/QuatEstimateDevice';
import { ThreeFiberSample } from './ThreeFiberSample';
//import './App.css'; // ==> ../index.html

// https://qiita.com/sho-19202325/items/b1d56c627856818f4bf0

function App() {
  return (
    <div className="App">
      <div className="Header">
        <QuatEstimateContextProvider connectionName='QuatEstimator' bluetooth={window.navigator.bluetooth}>
          <QuatEstimateDevice />
        </QuatEstimateContextProvider>
      </div>
      <div className="ThreeD">
        <ThreeFiberSample />
      </div>
    </div>
  );
}

export default App;
