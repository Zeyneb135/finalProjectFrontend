import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../redux/reducers/allHotelsSlice";
import { setSearchParams } from "../../redux/reducers/searchSlice";
import style from "./hotel.module.scss";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const Hotel = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [destination, setDestination] = useState(searchParams.get("city") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [adults, setAdults] = useState(parseInt(searchParams.get("adults")) || 1);
  const [children, setChildren] = useState(parseInt(searchParams.get("children")) || 0);
  const [rooms, setRooms] = useState(parseInt(searchParams.get("rooms")) || 1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Qiymət aralığı üçün state-lər
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // default olaraq 1000 seçilib

  const { data: hotels, loading } = useSelector((state) => state.allHotels);

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      setSearchParams({
        city: destination,
        dates: [{ startDate, endDate }],
        options: { adult: adults, children, room: rooms },
      })
    );
    navigate(
      `/hotel?city=${destination}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&rooms=${rooms}`
    );
  };

  // Qiymətə görə filtr əlavə edilir
  const filteredHotels = hotels.filter((hotel) => {
    const hotelPrice = hotel.cheapestPrice || 0;
    return (
      (destination ? hotel.city.trim().toLowerCase() === destination.trim().toLowerCase() : true) &&
      hotelPrice >= minPrice &&
      hotelPrice <= maxPrice
    );
  });

  return (
    <Layout className={style.list}>
      <div className={style.hotelWrapper}>
        {/* Filter bölməsi */}
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search city"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className={style.dropdown} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{rooms} Room - {adults} Adults - {children} Children</span>
            {isDropdownOpen && (
              <div className={style.dropdownMenu}>
                <div className={style.counter}>
                  <span>Rooms</span>
                  <button onClick={() => setRooms(rooms > 1 ? rooms - 1 : 1)}>-</button>
                  <span>{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)}>+</button>
                </div>
                <div className={style.counter}>
                  <span>Adults</span>
                  <button onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}>-</button>
                  <span>{adults}</span>
                  <button onClick={() => setAdults(adults + 1)}>+</button>
                </div>
                <div className={style.counter}>
                  <span>Children</span>
                  <button onClick={() => setChildren(children > 0 ? children - 1 : 0)}>-</button>
                  <span>{children}</span>
                  <button onClick={() => setChildren(children + 1)}>+</button>
                </div>
              </div>
            )}
          </div>

          {/* Qiymət aralığı seçiciləri */}
          <div>
            <span>Min Price</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <span>Max Price</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>

          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Məhsul bölməsi */}
        <div className={style.searchItem}>
          {loading ? (
            <p>Otel məlumatları yüklənir...</p>
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div className={style.searchItem} key={hotel._id}>
                <img src={hotel.photos[0]} alt={hotel.name} className={style.siImg} />
                <div className={style.siDesc}>
                  <h1 className={style.siTitle}>{hotel.name}</h1>
                  <span className={style.siDistance}>{hotel.distance}m from center</span>
                  <span className={style.siTaxiOp}>Free airport taxi</span>
                  <span className={style.siSubtitle}>Studio Apartment with Air conditioning</span>
                  <span className={style.siFeatures}>{hotel.desc}</span>
                  <span className={style.siCancelOp}>Free cancellation</span>
                  <span className={style.siCancelOpSubtitle}>
                    You can cancel later, so lock in this great price today!
                  </span>
                </div>
                <div className={style.siDetails}>
                  {hotel.rating && (
                    <div className={style.siRating}>
                      <span>Excellent</span>
                      <button>{hotel.rating}</button>
                    </div>
                  )}
                  <div className={style.siDetailTexts}>
                    <span className={style.siPrice}>${hotel.cheapestPrice}</span>
                    <span className={style.siTaxOp}>Includes taxes and fees</span>
                  </div>
                  <Link to={`/detail/${hotel._id}`} className={style.siDetailButton}>
                    <button>See Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Seçdiyiniz kriteriyalara uyğun otel tapılmadı.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Hotel;
