// without using redux
import React, { useEffect,useState} from 'react'
import axios from 'axios';
import './style.css'
const Api = () => {
   console.log("rendering..");
   const[data,setData]=useState([]);
   const[search,setSearch]=useState([]);
   const[summary,setSummary]=useState("");
   const url="https://api.rootnet.in/covid19-in/stats/latest";
   useEffect(()=>
   {
    console.log("hook is calling..");
    axios.get(url).
    then((response)=>
    {   
        console.log(response.data)
        console.log(response.data.data.regional);
        setData(response.data.data.regional);
        setSummary(response.data.data.summary);
    })
    .catch((err)=>{console.error(err)});
   }
   ,[]);
  //  to includes the words searched by the user
   let filteredUser = data.filter(user => {
    return user.loc.toLowerCase().includes(search)
  })
  let Items = filteredUser.map((item) =>  <div className="ui card" style={{boxShadow:" 5px 10px red",margin:'15px'}} id="zoom-on-hover">
  <div className="content">
    <div className="header">Location</div>
  </div>
  <div className="content">
    <h4 className="ui sub header">{item.loc}</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
             <p>Total Confirmed Cases:{item.totalConfirmed}</p> 
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
          <p>Total Deaths:{item.deaths}</p>
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
          <p>Total discharged:{item.discharged}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
 );  

   return (
    <>
     <center style={{backgroundImage:"https://corp-uc1.azureedge.net/-/media/sc-johnson/our-news/coronavirus/coronavirus-cell.jpg?h=3776&w=6713&hash=392A6D292B2A346D3DA8957DF2B5BCF7"}}>
     <div class="ui category search">
  <div class="ui icon input"  style={{marginTop:"30px"}}>
    <input class="prompt" type="text" placeholder="Search Cases by State" onChange={(e) => setSearch(e.target.value)}/>
    <i class="search icon"></i>
  </div>
  <div class="results"></div>
</div>
     <h2 id='a'>{Items}</h2>
     <div id='b' ><h4>Summary of Covid-19 in INDIA</h4><hr></hr><p>Total Cases:{summary.total}</p>
     <p>Discharged:{summary.discharged}</p>
     <p>Deaths:{summary.deaths}</p>
     </div></center>
    </> 
   )
}
export default Api
