import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../redux/reducers/allHotelsSlice";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import style from "./thirdSection.module.scss";
import { FaHeart } from "react-icons/fa"; 
import { addToWishlist } from "../../redux/reducers/allHotelsSlice";
import { useNavigate } from "react-router-dom"; // React Router'dan navigate funksiyasını əlavə et

const ThirdSection = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.allHotels);
  const { user } = useSelector((state) => state.auth); // auth slice'dan istifadəçinin məlumatını alırıq
  const navigate = useNavigate(); // yönləndirmək üçün

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToWishlist = (item) => {
    if (!user) {
      alert("You need to be logged in to add to wishlist.");
      navigate("/login"); // Login səhifəsinə yönləndirir
    } else {
      dispatch(addToWishlist(item))
        .unwrap()
        .catch((error) => {
          alert(error.message || "An error occurred while adding to wishlist");
        });
    }
  };

  return (
    <div className={style.fp}>
      <h2 className={style.sectionTitle}>Reservation System</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data: {error}</p>
      ) : (
        <>
          <div className={style.fpItemsWrapper}>
            <AiOutlineLeft className={style.paginationLeftIcon} onClick={prevPage} />
            
            <div className={style.fpItems}>
              {currentItems.map((item) => (
                <div className={style.fpItem} key={item._id}>
                  <div className={style.fpImgContainer}>
                    <img
                      src={item.photos[0] || "/default-hotel.jpg"}
                      alt={item.name}
                      className={style.fpImg}
                    />
                    <div className={style.heartIcon}>
                      <FaHeart
                        className={style.likeIcon}
                        onClick={() => handleAddToWishlist(item)} // Wishlist-ə əlavə etmə
                      />
                    </div>
                  </div>
                  <span className={style.fpName}>{item.name}</span>
                  <span className={style.fpCity}>{item.city}</span>
                  <span className={style.fpPrice}>Starting from ${item.cheapestPrice}</span>
                  {item.rating && (
                    <div className={style.fpRating}>
                      <button>{item.rating}</button>
                      <span>Excellent</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AiOutlineRight className={style.paginationRightIcon} onClick={nextPage} />
          </div>
          
          <div className={style.pagination}>
            {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? style.activePage : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThirdSection;
