import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.scss'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const  { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min-1 || 0}&max=${Number(max)+1 || 9999}`);

  const handleClick = () => {
    reFetch();
    alert(max+1)
  }

  return (
    <div>
      <Navbar />
      <Header type="list"/>

      <div className="list--container">
        <div className="list--wrapper">
          <div className="list--search">
            <h1 className="list--title">Search</h1>
            <div className="list--item">
                <label>Destination</label>
                <input 
                  type="text"
                  placeholder={destination}
                  onChange={e=>setDestination(e.target.value)}
                />
            </div>
            <div className="list--item">
                <label>Check-in Date</label>
                <span onClick={()=> setOpenDate(!openDate)} className="input--search-text">{`${format(dates[0].startDate, "dd-MM-yyyy")} to ${format(dates[0].endDate, "dd-MM-yyyy")}`}</span>
                {openDate && (<DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />)}
            </div>
            <div className="list--item">
              <label>Options</label>
              <div className="list--options--item">
                <span className="list--options--text">Min price <small>per night</small></span>
                <input 
                  type="number"
                  className="list--options--input"
                  onChange={e=>setMin(e.target.value)}
                  min={0}
                />
              </div>
              <div className="list--options--item">
                <span className="list--options--text">Max price <small>per night</small></span>
                <input 
                  type="number"
                  className="list--options--input"
                  onChange={e=>setMax(e.target.value)}
                  min={0}
                />
              </div>
              <div className="list--options--item">
                <span className="list--options--text">Adult</span>
                <input 
                  type="number"
                  className="list--options--input"
                  placeholder={options.adult}
                  min={1}
                />
              </div>
              <div className="list--options--item">
                <span className="list--options--text">Children</span>
                <input 
                  type="number"
                  className="list--options--input"
                  placeholder={options.children}
                  min={0}
                />
              </div>
              <div className="list--options--item">
                <span className="list--options--text">Room</span>
                <input 
                  type="number"
                  className="list--options--input"
                  placeholder={options.room}
                  min={1}
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="list--result">
            {loading ? "loading" : (<> 
              {data.map((item) =>(
                <SearchItem item={item} key={item._id}/>
              ))}
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List