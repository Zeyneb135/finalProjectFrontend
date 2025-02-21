import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const Detail = () => {
  const location = useLocation();

  const { hotel } = location.state || {}; // Əgər `state` yoxdursa, boş obyekt alınır.

  return (
    <Layout>
      {hotel ? (
        <div>
          <img src={hotel.photos[0]} alt={hotel.name} />
          <h1>{hotel.name}</h1>
          <p>{hotel.desc}</p>
          <p>Price: ${hotel.cheapestPrice}</p>
        </div>
      ) : (
        <p>No hotel data available.</p>
      )}
    </Layout>
  );
};

export default Detail;
