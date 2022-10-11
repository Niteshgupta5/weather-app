import React ,{ useState}from 'react'
import styled from 'styled-components';
import {FaSearchLocation} from 'react-icons/fa';
import {FaMicrophone} from 'react-icons/fa';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { BsFillSunFill } from 'react-icons/bs';

const SearchBox = styled.div`
      width:auto;
      float:right;
      display: flex;
     flex-direction: row;
     padding: 0.7rem 1rem;
     background-color: white;
     align-items: center;
     box-shadow: 1px 4px 20px 7px #aaaaaa29;
     border-radius:25px;
`;
const SearchInput = styled.input`
      color:black;
      padding:0px 20px;
      width:80%;
      border:none;
      outline: none;
      font-family: poppins;
      font-size: 18px;
      color:#545454;
`;

function Searchbox(props) {
  const API_KEY = '246e699a8af0dc16769c498345ead1a2';
  const API_URL = 'https://api.openweathermap.org/data/2.5';
  var audio = new Audio('assets/voice.mp3');
  
    const [searchQuery, updateSearchQuery] = useState("");
    const [timeoutId, updateTimeoutId] = useState("");
    
   const fetchData = async (searchString)=>{ 
   const response = await axios.get(`${API_URL}/weather?q=${searchString}&APPID=${API_KEY}&units=metric`);
     props.updateFun(response.data);
   };
    const onTextChange = (event) =>{
      clearTimeout(timeoutId);
      updateSearchQuery(event.target.value);
      const timeout = setTimeout(()=> fetchData(event.target.value),500);
      updateTimeoutId(timeout);
   };

   const voiceToText = ()=>{
     var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
         audio.play();
         recognition.lang = "en-GB";
         recognition.onresult = function(e){
         document.getElementById("voiceText").value = e.results[0][0].transcript;
         clearTimeout(timeoutId);
         updateSearchQuery(e.results[0][0].transcript);
         const timeout = setTimeout(()=> fetchData(e.results[0][0].transcript),500);
         updateTimeoutId(timeout);
     }
     recognition.start();
   }
  
  return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 mx-auto'>
          <a className="navbar-brand" href="/#"><BsFillSunFill className='sun-icons' style={{marginTop:"-34px"}}/><span style={{marginLeft:"-35px"}}><span style={{backgroundColor:"#3e3ee2",paddingLeft:"5px",borderTopLeftRadius:"20px"}}>W</span>eather <span style={{color:"yellow"}}>Locator</span></span></a>
            <SearchBox>
              <FaSearchLocation className='searchicon'/>
              <SearchInput className="mr-sm-2" id='voiceText' placeholder='Search City Here..' value={searchQuery} onChange={onTextChange}></SearchInput>
              <FaMicrophone className='microphone-icon' icon="fa-solid fa-microphone" onClick={voiceToText}/>
            </SearchBox>
          </div>
        </div>
      </div>
  );
};

export default Searchbox;

