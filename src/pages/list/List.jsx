// SearchForm.jsx
import React, { useState } from "react";
import style from "./searchForm.module.scss";

const List = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    onSearch({
      destination,
      startDate,
      endDate,
      adults,
      children,
      rooms,
      minPrice,
      maxPrice,
    });
  };

  return (
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
      <div
        className={style.dropdown}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>
          {rooms} Room - {adults} Adults - {children} Children
        </span>
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
  );
};

export default List;
