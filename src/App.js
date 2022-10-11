import styled from 'styled-components';
import React, { useState } from "react";
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Searchbox from './Components/Searchbox';
import WeatherDetails from './Components/WeatherDetails';

const ParentContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100vh;
`;

function App() {
  const [weatherList, updateWeatherList] = useState([]);

  const updateFun = (data)=>{
    updateWeatherList(data);
 };
  return (
    <>
      <div className='container-fluid' id='outer-div'>
        <div className='row'>
          <div className='col-12 mx-auto'>
            <ParentContainer>
              <Searchbox updateFun={updateFun}/>
              {!(weatherList == "") ? <WeatherDetails weatherList={weatherList}/> : <h1 className='nodatafound'>Plz Search City To Get The Result</h1>}
            </ParentContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
