import React from "react";
import { Link } from "react-router-dom"; 
import style from "./searchItem.module.scss";

const SearchItem = ({ item }) => {
  return (
    <div className={style.searchItem}>
      <img src={item.photos[0]} alt={item.name} className={style.siImg} />
      <div className={style.siDesc}>
        <h1 className={style.siTitle}>{item.name}</h1>
        <span className={style.siDistance}>{item.distance}m from center</span>
        <span className={style.siTaxiOp}>Free airport taxi</span>
        <span className={style.siSubtitle}>Studio Apartment with Air conditioning</span>
        <span className={style.siFeatures}>{item.desc}</span>
        <span className={style.siCancelOp}>Free cancellation</span>
        <span className={style.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={style.siDetails}>
        {item.rating && (
          <div className={style.siRating}>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className={style.siDetailTexts}>
          <span className={style.siPrice}>${item.cheapestPrice}</span>
          <span className={style.siTaxOp}>Includes taxes and fees</span>
        </div>
        <Link to={`/detail/${item.id}`} className={style.siDetailButton}>
          <button>See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
