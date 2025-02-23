import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../../redux/reducers/authSlice";
import style from './login.module.scss';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("http://localhost:5555/api/auth/login", { 
        email,  
        password 
      });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className={style["login-container"]}>
      <div className={style["login-card"]}>
        <h2 className={style["login-title"]}>Login</h2>
        <form onSubmit={handleSubmit} className={style["login-form"]}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={style["input-field"]}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style["input-field"]}
          />
          <button type="submit" className={style["submit-button"]} disabled={loading}>
            Login
          </button>
        </form>
        {error && <p className={style["error-message"]}>{error}</p>}
        <p className={style["register-text"]}>
          Don’t have an account? <Link to="/register" className={style["register-link"]}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
