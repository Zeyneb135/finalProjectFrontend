import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchParams } from "../../redux/reducers/searchSlice";
import style from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    dispatch(
      setSearchParams({
        city: destination,
        dates: [{ startDate, endDate }],  // Dataları obyekt kimi saxladıq
        options: { adult: adults, children, room: rooms },
      })
    );
  
    navigate(
      `/hotel?city=${destination}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&rooms=${rooms}`
    );
  };

  return (
    <div className={style.headers}>
      <h2 className={style.title}>Find Your Perfect Stay</h2>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder="Search city"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

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

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Header;
