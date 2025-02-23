import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import style from './register.module.scss';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/api/auth/register", {
        username: name,  
        email: email,
        password: password
      });
      console.log("User registered:", response.data);
      navigate("/login");  
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={style['register-container']}>
      <div className={style['register-card']}>
        <h2 className={style['register-title']}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={style['input-field']}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={style['input-field']}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={style['input-field']}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={style['submit-button']} type="submit">Register</button>
        </form>
        {error && <p className={style['error-message']}>{error}</p>} 
        <p className={style['register-text']}>
          Already have an account? <Link className={style['register-link']} to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
