import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../redux/reducers/allHotelsSlice";
import { debounce } from "lodash"; 
import style from "./hotel.module.scss";
import Layout from "../../components/layout/Layout";

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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const { data: hotels, loading } = useSelector((state) => state.allHotels);

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (destination) params.set("city", destination);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (adults) params.set("adults", adults);
    if (children) params.set("children", children);
    if (rooms) params.set("rooms", rooms);
    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);

    navigate(`/hotel?${params.toString()}`, { replace: true });
  }, [destination, startDate, endDate, adults, children, rooms, minPrice, maxPrice, navigate]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const hotelPrice = hotel.cheapestPrice || 0;
      return (
        (destination ? hotel.city.trim().toLowerCase() === destination.trim().toLowerCase() : true) &&
        hotelPrice >= minPrice &&
        hotelPrice <= maxPrice
      );
    });
  }, [hotels, destination, minPrice, maxPrice]);

  const handleFilterChange = debounce((setter, value) => setter(value), 500);

  return (
    <Layout>
      <div className={style.hotelWrapper}>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search city"
            defaultValue={destination}
            onChange={(e) => handleFilterChange(setDestination, e.target.value)}
          />
          <input
            type="date"
            defaultValue={startDate}
            onChange={(e) => handleFilterChange(setStartDate, e.target.value)}
          />
          <input
            type="date"
            defaultValue={endDate}
            onChange={(e) => handleFilterChange(setEndDate, e.target.value)}
          />
          <div>
            <span>Rooms</span>
            <input
              type="number"
              defaultValue={rooms}
              min={1}
              onChange={(e) => handleFilterChange(setRooms, parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <span>Adults</span>
            <input
              type="number"
              defaultValue={adults}
              min={1}
              onChange={(e) => handleFilterChange(setAdults, parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <span>Children</span>
            <input
              type="number"
              defaultValue={children}
              min={0}
              onChange={(e) => handleFilterChange(setChildren, parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <span>Min Price</span>
            <input
              type="number"
              defaultValue={minPrice}
              onChange={(e) => handleFilterChange(setMinPrice, parseInt(e.target.value))}
            />
          </div>
          <div>
            <span>Max Price</span>
            <input
              type="number"
              defaultValue={maxPrice}
              onChange={(e) => handleFilterChange(setMaxPrice, parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className={style.searchItem}>
          {loading ? (
            <p>Loading hotels...</p>
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div className={style.searchs} key={hotel._id}>
                <div className={style.image}>
                  <img src={hotel.photos[0]} alt={hotel.name} className={style.siImg} />
                </div>

                <div className={style.searchContent}>
                  <div className={style.siDesc}>
                    <h1 className={style.siTitle}>{hotel.name}</h1>
                    <span className={style.siDistance}>{hotel.distance} from center</span>
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

                    <div className={style.thinks}>
                      <div className={style.siDetailTexts}>
                        <span className={style.siPrice}>${hotel.cheapestPrice}</span>
                        <span className={style.siTaxOp}>Includes taxes and fees</span>
                      </div>
                      <button className={style.siDetailButton} onClick={() => navigate(`/detail/${hotel._id}`, { state: { hotel } })}>
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels found based on your criteria.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Hotel;
