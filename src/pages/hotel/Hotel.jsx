import './hotel.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'



const Hotel = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="hotel--container">
        <div className="hotel--wrapper">
          <div className="hotel--tittle">Grand Hotel</div>
          <div className="hotel--address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotel