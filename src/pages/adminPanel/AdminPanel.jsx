import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  addHotel,
  deleteHotel,
} from '../../redux/reducers/allHotelsSlice';
import style from './adminPanel.module.scss';
import Layout from '../../components/layout/Layout';

const AdminPanel = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.allHotels.data);

  const filteredHotels = hotels
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      return sort === 'asc' ? a.cheapestPrice - b.cheapestPrice : b.cheapestPrice - a.cheapestPrice;
    });

  const handleDelete = (id) => {
    dispatch(deleteHotel(id));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      address: '',
      distance: '',
      photos: '',
      title: '',
      desc: '',
      rating: '',
      cheapestPrice: '',
      featured: false,
    },
    onSubmit: (values) => {
      const hotelData = {
        ...values,
        photos: values.photos.split(','),
        rating: Number(values.rating),
        cheapestPrice: Number(values.cheapestPrice),
      };
      dispatch(addHotel(hotelData));
    },
  });

  return (
   <Layout>
     <div className={style.admin}>
      <h2>Admin Panel - Hotels</h2>
      <form onSubmit={formik.handleSubmit}>
        <input name="name" placeholder="Hotel Name" onChange={formik.handleChange} value={formik.values.name} />
        <input name="city" placeholder="City" onChange={formik.handleChange} value={formik.values.city} />
        <input name="address" placeholder="Address" onChange={formik.handleChange} value={formik.values.address} />
        <input name="distance" placeholder="Distance" onChange={formik.handleChange} value={formik.values.distance} />
        <input name="photos" placeholder="Photos (comma separated)" onChange={formik.handleChange} value={formik.values.photos} />
        <input name="title" placeholder="Title" onChange={formik.handleChange} value={formik.values.title} />
        <input name="desc" placeholder="Description" onChange={formik.handleChange} value={formik.values.desc} />
        <input name="rating" placeholder="Rating" type="number" onChange={formik.handleChange} value={formik.values.rating} />
        <input name="cheapestPrice" placeholder="Cheapest Price" type="number" onChange={formik.handleChange} value={formik.values.cheapestPrice} />
        <label>
          Featured:
          <input name="featured" type="checkbox" onChange={formik.handleChange} checked={formik.values.featured} />
        </label>
        <button type="submit">Add Hotel</button>
      </form>
      <input type="text" value={search} placeholder="Search hotels" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => setSort('asc')}>Sort by Price (Low to High)</button>
      <button onClick={() => setSort('desc')}>Sort by Price (High to Low)</button>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>City</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel._id}>
              <td><img src={hotel.photos[0]} alt={hotel.name} width="100" /></td>
              <td>{hotel.name}</td>
              <td>{hotel.city}</td>
              <td>${hotel.cheapestPrice}</td>
              <td><button onClick={() => handleDelete(hotel._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </Layout>
  );
};

export default AdminPanel;
