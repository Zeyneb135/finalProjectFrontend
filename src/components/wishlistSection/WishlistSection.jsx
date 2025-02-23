import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeWishlistItem, clearMessage } from '../../redux/reducers/wishlistSlice';
import { useNavigate } from 'react-router-dom'; // 🔹 useNavigate import edilir
import style from './wishlistSection.module.scss';
import { FaTrashAlt } from 'react-icons/fa';

const WishlistSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔹 useNavigate çağırılır
  const { items, loading, error, message } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeWishlistItem(itemId));
  };
  const handleImageClick = (hotel) => {
    navigate(`/detail/${hotel._id}`, { state: { hotel } }); // Detail səhifəsinə yönləndirmək
  };
  

  return (
    <div className={style.wish}>
      <h2 className={style.sectionTitle}>Your Wishlist</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading wishlist: {error}</p>
      ) : (
        <>
          {message && <p className={style.message}>{message}</p>}

          {items.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className={style.wishlistItems}>
              {items.map((item) => (
                <div className={style.wishlistItem} key={item._id}>
                  <div className={style.wishlistItemDetails}>
                    <img
                      src={item.photos[0] || "/default-hotel.jpg"}
                      alt={item.name}
                      className={style.itemImage}
                      onClick={() => handleImageClick(item)} // ✅ Yeni funksiyanı çağır
                      style={{ cursor: "pointer" }}
                    />
                    <span className={style.itemName}>{item.name}</span>
                    <span className={style.itemCity}>{item.city || "Unknown City"}</span>
                    <span className={style.itemPrice}>${item.cheapestPrice}</span>
                    {item.rating && (
                      <div className={style.itemRating}>
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                      </div>
                    )}
                  </div>
                  <div className={style.removeButton}>
                    <FaTrashAlt
                      className={style.removeIcon}
                      onClick={() => handleRemoveItem(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistSection;
