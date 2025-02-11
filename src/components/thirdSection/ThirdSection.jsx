import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../redux/reducers/allHotelsSlice";
import style from "./thirdSection.module.scss";

const ThirdSection = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.allHotels);

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  return (
    <div className={style.third}>
      <h1>All Hotels</h1>
      {loading ? (
        "Loading, please wait..."
      ) : error ? (
        <p>Error loading data: {error || "Unknown error"}</p>
      ) : (
        <div className={style.hotelsList}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((hotel) => (
              <div key={hotel._id || hotel.name} className={style.hotelItem}>
                <img src={hotel.photos?.[0] || "/default-hotel.jpg"} alt={hotel.name} />
                <div>
                  <h2>{hotel.name}</h2>
                  <p>{hotel.city}</p>
                  <p>Starting from ${hotel.cheapestPrice}</p>
                  {hotel.rating && (
                    <div className={style.fpRating}>
                      <span className={style.fpPrice}>${hotel.cheapestPrice}</span>
                      <div className={style.stars}>
                        {/* Sadece 5 yıldız */}
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={style.filledStar}>
                            &#9733;
                          </span>
                        ))}
                      </div>
                      <span>Excellent</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ThirdSection;
