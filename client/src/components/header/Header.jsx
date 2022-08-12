import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { faBed, faCar, faMapLocationDot, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.scss'
import { DateRange } from 'react-date-range'
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../context/searchContext';
import { AuthContext } from "../../context/authContext";

const Header = ({type}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const handleOption = (name, operation) => {
        setOptions((prev)=>{
            return{
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }


    const {dispatch} = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
        navigate("/hotels", {state: {destination, dates, options}})
    };
    


    return (
      <div className="header">
        <div className={type === "list" ? "header--container list--mode" : "header--container"}>
            <div className="header--list">
                <div className="header--list_item header--active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="header--list_item">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="header--list_item">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rental</span>
                </div>
                <div className="header--list_item">
                    <FontAwesomeIcon icon={faMapLocationDot} />
                    <span>Attractions</span>
                </div>
                <div className="header--list_item">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>

            {type !== "list" && <>
                <h1 className="header--title">A lifetime of discounts? It's Genius</h1>
                <h3 className="header--subtitile">Get rewarded for your travels - unlock instant savings of 10% or more with a free ReactBookingApp account</h3>
                {!user && <button className="header--button">Sing in / Register</button>}

                <div className="header--search">
                    <div className="header--search-item">
                        <FontAwesomeIcon icon={faBed} className="icon"/>
                        <input 
                            type="text" 
                            className="header--search-input" 
                            placeholder='Where are you going?'
                            onChange={e=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="header--search-item">
                        <FontAwesomeIcon icon={faCalendarDays} className="icon"/>
                        <span onClick={() => setOpenDate(!openDate)} className="input--search-text">{`${format(dates[0].startDate, "dd-MM-yyyy")} to ${format(dates[0].endDate, "dd-MM-yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs = {true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="header--search-date"
                            minDate={new Date()}
                        />}
                    </div>


                    <div className="header--search-item">
                        <FontAwesomeIcon icon={faPerson } className="icon"/>
                        <span 
                            className="input--search-text"
                            onClick={() => setOpenOptions(!openOptions)}
                        >{`${options.adult} adults ${options.children} children ${options.room} room`}</span>
                        {openOptions && <div className="options">
                            <div className="option--item">
                                <div className="option--text">Adult</div>
                                <div className="option--counter">
                                    <button 
                                        className="option--counter-btn" 
                                        onClick={() => handleOption("adult", "d")}
                                        disabled={options.adult <= 1}
                                    >-</button>
                                    <span className="option--counter-number">{options.adult}</span>
                                    <button className="option--counter-btn" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="option--item">
                                <div className="option--text">Children</div>
                                <div className="option--counter">
                                    <button 
                                        className="option--counter-btn" 
                                        onClick={() => handleOption("children", "d")}
                                        disabled={options.children <= 0}
                                    >-</button>
                                    <span className="option--counter-number">{options.children}</span>
                                    <button className="option--counter-btn" onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="option--item">
                                <div className="option--text">Room</div>
                                <div className="option--counter">
                                    <button 
                                        className="option--counter-btn" 
                                        onClick={() => handleOption("room", "d")}
                                        disabled={options.room <= 1}
                                    >-</button>
                                    <span className="option--counter-number">{options.room}</span>
                                    <button className="option--counter-btn" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div> }
                    </div>
                    <div className="header--search-item">
                        <button 
                            className="header--search-btn"
                            onClick={handleSearch}
                        >Search</button>
                    </div>
                </div>
            </>}
        </div>
      </div>
    )
  }
  
  export default Header