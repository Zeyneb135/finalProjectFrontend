import React, { useState } from "react";
import style from "./header.module.scss";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const increment = (setter, value) => {
    if (value < 4) setter(value + 1);
  };

  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const handleSearch = () => {
    console.log("Search Data:", {
      destination,
      startDate,
      endDate,
      adults,
      children,
      rooms,
    });
  };

  return (
    <div className={style.headers}>
      <h2 className={style.title}>Find Your Perfect Stay</h2>
      <p className={style.subtitle}>Choose your destination, dates, and preferences</p>
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
            <div className={style.dropdownMenu} onClick={(e) => e.stopPropagation()}>
              <div className={style.counter}>
                <span>Rooms</span>
                <button onClick={() => decrement(setRooms, rooms)}>-</button>
                <span>{rooms}</span>
                <button onClick={() => increment(setRooms, rooms)}>+</button>
              </div>
              <div className={style.counter}>
                <span>Adults</span>
                <button onClick={() => decrement(setAdults, adults)}>-</button>
                <span>{adults}</span>
                <button onClick={() => increment(setAdults, adults)}>+</button>
              </div>
              <div className={style.counter}>
                <span>Children</span>
                <button onClick={() => decrement(setChildren, children)}>-</button>
                <span>{children}</span>
                <button onClick={() => increment(setChildren, children)}>+</button>
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
