import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {MdLocationPin} from 'react-icons/md';
import {WiWindDeg} from 'react-icons/wi';
import {BiWind} from 'react-icons/bi';
import {FaRegEye} from 'react-icons/fa';
import {BsSpeedometer2} from 'react-icons/bs';
import {MdOutlineWaterDrop} from 'react-icons/md';
import {BsCloudsFill} from 'react-icons/bs';

const MainDetails = styled.div`
      background-color: transparent;
      color : #fff;
      ${'' /* box-shadow: 1px 4px 20px 7px #aaaaaa29; */}
      padding: 20px 30px;
      padding-top:10px;
      width:100%;
`;
const DetailedView = styled.div`
      background-color: transparent;
      color : #fff;
      font-weight:bold;
      ${'' /* box-shadow: 1px 4px 20px 7px #aaaaaa29; */}
      padding: 0px 30px;
      width:100%;
      text-align:center;
      height:20vh;
`;

function WeatherDetails(props) {
  const [dataList, setDataList] = useState([]);
  const [mainList, setMainList] = useState([]);
  const [fullTime , setFullTime] = useState();
  const [fullDate , setFullDate] = useState();
  const [windData , setWindData] = useState();
  const [forecast , setForcast] = useState([]);
  var dttxt = [0,1,2,3,4];
  var fcicon = ["","","","",""];
  var fctemp = [0,1,2,3,4];
  var desc,fccount=0;

  function GetTime(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var today = new Date();
    var day = days[today.getDay()];
    var date = today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear();
    var fullyDate = day+" , "+date;
    var hour = today.getHours();
    var minute = today.getMinutes();
            if (hour>=12){                  //Adding endings
                    var suffix = "P.M.";}
            else{
                    suffix = "A.M.";}
    minute = addZero(minute);       //Call addZero function
    hour = removeMilitary(hour);    //Call removeMilitary Function
    var fullyTime = hour + ":" + minute + " " + suffix;  //Combine hour minute and the suffix
            function addZero(number){
                            if (number<10){
                                number = "0" + number;
                            }
                            return number;
            }
            function removeMilitary(hour){ //This function can be removed if desired by user.
    
                if (hour > 0 && hour <= 12) {
                    hour = "" + hour;
                } else if (hour > 12) {
                    hour = "" + (hour - 12);
                } else if (hour === 0) {
                    hour= "12";
                }
                return hour;
            }
    setFullTime(fullyTime);
    setFullDate(fullyDate);
  }
  function getForcast() {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${props.weatherList.name}&cnt=5&appid=246e699a8af0dc16769c498345ead1a2&units=metric`)
        .then(response => setForcast(response.data))
        .catch(e => {
            console.log(e);
        });
  }
  
  useEffect(()=>{
    setInterval(GetTime, 1000);
    setDataList(props.weatherList?.sys);
   setMainList(props.weatherList?.main);
   setWindData(props.weatherList?.wind);
   getForcast();
  },[props.weatherList?.sys, props.weatherList?.main, props.weatherList?.wind])
 
  return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 mx-auto'>
            <MainDetails>
              <h1 className='cityname'><MdLocationPin className='mdlocationpin'/>{props.weatherList.name}, {dataList?.country}</h1>
              <h5 className='curdate'>{`${fullDate}`} | {`${fullTime}`}</h5>
                <div className='tempdiv'>
                   {(props.weatherList?.weather)?.map(function(weather,index,arr){
                    if(index === 0){
                     desc = weather.description;
                     var src = "https://openweathermap.org/img/wn/"+weather.icon+"@2x.png"
                     return (
                       <span className='wdimg' key={weather.icon}><img src={src} alt="thepic"/></span> 
                     );}
                     return("");
                   })}
                   <span className='wdtemp'>{Math.floor(mainList?.temp)} <span className='cel'>°C</span></span>
                </div>
                <p className='minmaxfeel'>{Math.floor(mainList?.temp_max)}°|{Math.floor(mainList?.temp_min)}° &nbsp;Feels like &nbsp;{Math.ceil(mainList?.feels_like)}°</p>
                <p className='description'>{desc}</p>
            </MainDetails>
            <div className='container-fluid' style={{padding:"0px"}}>
            <div className='row'>
             <div className='col-12 mx-auto'>
            <DetailedView>
                <div className="row">
                  <div className="col-md-4">
                    <div className='outer-part1'>
                      <div className='innerdiv1'>
                        <div className='row'>
                        <div className='col-sm-4'><MdOutlineWaterDrop className='wethericons'/> {mainList?.humidity}<br/><span>Humidity</span></div>
                        <div className='col-sm-4'><BsSpeedometer2 className='wethericons'/> {mainList?.pressure}<br/><span>Pressure</span></div>
                        <div className='col-sm-4'><FaRegEye className='wethericons'/> {props.weatherList?.visibility}<br/><span>Visibility</span></div>
                        </div>
                        <div className='row'>
                        <div className='col-sm-4'><WiWindDeg className='wethericons'/> {windData?.deg}°<br/><span>Wind Deg</span></div>
                        <div className='col-sm-4'><BiWind className='wethericons'/> {windData?.speed}<br/><span>Wind Speed</span></div>
                        <div className='col-sm-4'><BsCloudsFill className='wethericons'/> {props.weatherList?.clouds?.all}%<br/><span>Clouds</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className='outer-part2'>
                      <div className='innerdiv1'>
                        <div className='row justify-content-center'>
                        <p className='latlon'>Lat : {props.weatherList?.coord?.lat} | Lon : {props.weatherList?.coord?.lon}</p>
                        <div className='col-sm-2'>
                        {(forecast?.list)?.map(function(list,index,arr){
                               var h= (list.dt_txt).slice(11,13);
                               if(h>12){
                                dttxt[index] = h+" PM";
                               }
                               else{
                                dttxt[index] = h+" AM";
                               }
                               {(list?.weather)?.map(function(weather,index,arr){
                                  if(index === 0){
                                   var src = "https://openweathermap.org/img/wn/"+weather.icon+"@2x.png"
                                   fcicon[fccount] = src;
                                  }
                                   return("");
                                 })}
                                 {/* {(list?.main)?.map(function(main,index,arr){
                                   fcicon[fccount] = src;
                                   fccount+=1;
                                   return("");
                                 })} */}
                                 fctemp[fccount] = list?.main?.temp;
                                 fccount+=1;
                              return("");
                            })}
                          <p className='hourlytime'>{dttxt[0]}</p>
                          <span className='fcwdimg'><img src={fcicon[0]} alt="fcpic"/></span>
                          <span>{fctemp[0]}°</span>
                          </div>
                          <div className='col-sm-2'><p className='hourlytime'>{dttxt[1]}</p>
                          <span className='fcwdimg'><img src={fcicon[1]} alt="fcpic"/></span>
                          <span>{fctemp[1]}°</span>
                          </div>
                          <div className='col-sm-2'><p className='hourlytime'>{dttxt[2]}</p>
                          <span className='fcwdimg'><img src={fcicon[2]} alt="fcpic"/></span>
                          <span>{fctemp[2]}°</span>
                          </div>
                          <div className='col-sm-2'><p className='hourlytime'>{dttxt[3]}</p>
                          <span className='fcwdimg'><img src={fcicon[3]} alt="fcpic"/></span>
                          <span>{fctemp[3]}°</span>
                          </div>
                          <div className='col-sm-2'><p className='hourlytime'>{dttxt[4]}</p>
                          <span className='fcwdimg'><img src={fcicon[4]} alt="fcpic"/></span>
                          <span>{fctemp[4]}°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </DetailedView>
            </div></div></div>
          </div>
        </div>
      </div>
  )
}

export default WeatherDetails
//{}  []