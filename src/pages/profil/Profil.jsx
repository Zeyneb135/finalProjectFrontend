import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import edilir
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/reducers/authSlice'; // authSlice faylını doğru yerdə yoxlayın

const Profil = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate istifadə olunur

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/profile/${id}`);
                setUser({
                    ...response.data,
                    id: response.data._id,
                });
                setIsLoading(false);
            } catch (error) {
                setMessage("Məlumatlar yüklənərkən səhv baş verdi.");
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== passwordConfirm) {
            setMessage("Şifrələr uyğun gəlmir!");
            return;
        }

        if (!user.id) {
            setMessage("İstifadəçi id tapılmadı!");
            return;
        }

        try {
            const updatedUser = {
                username: user.username,
                email: user.email,
                password: user.password,
            };

            const response = await axios.put(`/api/user/update/${user.id}`, updatedUser);
            dispatch(loginSuccess(response.data)); // Redux store-u yeniləyirik
            setMessage("Profil uğurla yeniləndi!");
            navigate('/'); // Ana səhifəyə yönləndiririk
        } catch (err) {
            setMessage("Profil yenilənərkən səhv baş verdi.");
        }
    };

    if (isLoading) return <div>Yüklənir...</div>;

    return (
        <div>
            <h2>Profil Məlumatları</h2>
            {message && <p className={message.includes('səhv') ? 'error' : 'success'}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>İstifadəçi Adı:</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Şifrə:</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div>
                    <label>Şifrəni Təsdiqlə:</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button type="submit">Yenilə</button>
            </form>
        </div>
    );
};

export default Profil;
