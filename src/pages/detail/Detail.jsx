import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux-dan istifadəçi məlumatını almaq üçün
import Layout from "../../components/layout/Layout";
import style from "./detail.module.scss"; // SCSS modulunu import edirik
import { MdPlace } from "react-icons/md";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state || {}; // Əgər `state` yoxdursa, boş obyekt alınır.
  const { user } = useSelector((state) => state.auth); // Redux-dan istifadəçi məlumatını alırıq

  const handleReserve = () => {
    if (!user) {
      alert("You need to be logged in to make a reservation.");
      navigate("/login"); // İstifadəçi login deyilsə, login səhifəsinə yönləndir
    } else {
      // Burada rezervasiya funksionallığını əlavə edə bilərsən
      alert("Reservation successful!");
    }
  };

  return (
    <Layout>
      <div className={style.detail}>
        <div className={style.firstly}>
          <div className={style.information}>
            <h1 className={style.title}>{hotel.name}</h1>
            <div className={style.icon}>
              <MdPlace />
              <p>{hotel.address}</p>
            </div>
            <span className={style.hotelDistance}>
              Excellent location – {hotel.distance} from center
            </span>
            <span className={style.hotelPriceHighlight}>
              Book a stay over ${hotel.cheapestPrice} at this property and get a
              free airport taxi
            </span>
          </div>
          <button onClick={handleReserve}>Reserve Now</button>
        </div>
        <div className={style.images}>
          {hotel.photos?.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${hotel.name} - ${index + 1}`}
            />
          ))}
        </div>
        <div className={style.back}>
          <div className={style.hotelDetailsTexts}>
            <h1 className={style.hotelTitle}>{hotel.title}</h1>
            <p className={style.hotelDesc}>{hotel.desc}</p>
          </div>
          <div className={style.buttons}>
            <button className={style.goBack} onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
