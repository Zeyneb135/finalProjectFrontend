import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelsByCities } from "../../redux/reducers/hotelsByCitiesSlice";
import style from "./firstSection.module.scss";

const FirstSection = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.fetchHotelsByCities);

  useEffect(() => {
    dispatch(fetchHotelsByCities());
  }, [dispatch]);

  return (
    <div className={style.first}>
      <h1>Explore Top Destinations</h1>
      {loading ? (
        "Loading please wait"
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={style.featured}>
          <div className={style.featuredItem}>
            <img 
              src="https://cruise.ru/upload/iblock/282/xn767xn3s7r3b0o2rg0ctx0nzhwy553j/stambul_15.jpg" 
              alt="Istanbul" 
              className={style.featuredImg}
            />
            <div className={style.featuredTitles}>
            <h2>Istanbul</h2>
            <p>{data[0]} properties</p>
            </div>
          </div>
          <div className={style.featuredItem}>
            <img 
              src="https://phoenix.ieu.edu.tr/betanix/images/uploads/haber/7674_1.jpeg" 
              alt="Izmir" 
              className={style.featuredImg}
            />
            <div className={style.featuredTitles}>
            <h2>Izmir</h2>
            <p>{data[1]} properties</p>
            </div>
          </div>
          <div className={style.featuredItem}>
            <img 
              src="https://i.pinimg.com/originals/e6/51/05/e65105f933ee3d101939d94e3ea753d0.jpg" 
              alt="Ankara" 
              className={style.featuredImg}
            />
           <div className={style.featuredTitles}>
           <h2>Ankara</h2>
           <p>{data[2]} properties</p>
           </div>
          </div>
          <div className={style.featuredItem}>
            <img 
              src="https://excursionmania.ru/wp-content/uploads/sites/2/2021/12/turkey_antalya.jpg" 
              alt="Antalya" 
              className={style.featuredImg}
            />
           <div className={style.featuredTitles}>
           <h2>Antalya</h2>
           <p>{data[3]} properties</p>
           </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstSection;
