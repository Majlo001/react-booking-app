import './hotel.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faCircleArrowLeft, faCircleXmark, faLocationDot, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/searchContext';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Reserve from '../../components/reserve/Reserve'



const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error} = useFetch(`/hotels/find/${id}`);
  


  const {dates, options} = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  
  const days = dayDifference(dates[0].endDate, dates[0].startDate);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true)
  }
  const handleMove = (direction) => {
    let newSliderNoumber;

    if (direction === 'l'){
      newSliderNoumber = slideNumber === 0 ? (parseInt(data.photos.length) - 1) : slideNumber - 1;
    } else {
      newSliderNoumber = slideNumber === (parseInt(data.photos.length) - 1) ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSliderNoumber)
  }


  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if(user){
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }


  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("loading") : (
        <div className="hotel--container">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")}/>
          <div className="slider--wrapper">
            <img src={data.photos[slideNumber]} alt="" className="slider--image" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")}/>
        </div>}

        <div className="hotel--wrapper">
          <div className="hotel--tittle">{data.name}</div>
          <div className="hotel--address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotel--distance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotel--price-highlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotel--images">
            {data.photos?.map((photo, i) => (
              <div className="hotel--img-wrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt="none"
                  className="hotel--img"
                />
              </div>
            ))}
          </div>
          <div className="hotel--details">
            <div className="hotel--details-texts">
              <h1 className="hotel--title">{data.title}</h1>
              <p className="hotel--desc">
                {data.desc}
              </p>
            </div>
            <div className="hotel--details-price">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />

      </div>)}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel