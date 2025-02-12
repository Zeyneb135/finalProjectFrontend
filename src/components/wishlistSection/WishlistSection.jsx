import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeWishlistItem, clearMessage } from '../../redux/reducers/wishlistSlice';
import style from './wishlistSection.module.scss';
import { FaTrashAlt } from 'react-icons/fa';

const WishlistSection = () => {
  const dispatch = useDispatch();
  const { items, loading, error, message } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
    return () => {
      dispatch(clearMessage()); // Komponentdən ayrıldıqda mesajı təmizləyirik
    };
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeWishlistItem(itemId));
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
                    />
                    <span className={style.itemName}>{item.name}</span>
                    <span className={style.itemPrice}>${item.cheapestPrice}</span>
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
