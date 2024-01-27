import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch } from './redux/data/dataAction.js';
import './style.css';

function Component() {
  const data = useSelector((state) => state.data);
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || !data.regional) {
      dispatch(fetch());
    } else {
      setInfo(data.regional);
      setSummary(data.summary);
    }
  }, [data, dispatch]);
  console.log(data)
  // Check if info is an array before applying the filter
  let filteredUser = Array.isArray(info)
    ? info.filter((user) => user.loc.toLowerCase().includes(search))
    : [];

  let Items =
    filteredUser.length > 0 ? (
      filteredUser.map((item) => (
        <div key={item.loc} className="ui card" style={{ cursor: 'pointer', boxShadow: '5px 10px red', margin: '15px' }} id="zoom-on-hover">
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
      ))
    ) : (
      <p>No matching results found.</p>
    );

  return (
    <>
      <center style={{ backgroundImage: "https://corp-uc1.azureedge.net/-/media/sc-johnson/our-news/coronavirus/coronavirus-cell.jpg?h=3776&w=6713&hash=392A6D292B2A346D3DA8957DF2B5BCF7" }}>
        <div className="ui category search">
          <div className="ui icon input" style={{ marginTop: "30px" }}>
            <input className="prompt" type="text" placeholder="Search Cases by State" onChange={(e) => setSearch(e.target.value)} />
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
        <h2 id='a'>{Items}</h2>
        <div id='b' ><h4>Summary of Covid-19 in INDIA</h4><hr></hr><p>Total Cases:{summary.total}</p>
          <p>Discharged:{summary.discharged}</p>
          <p>Deaths:{summary.deaths}</p>
        </div></center>
    </>
  );
}

export default Component;
