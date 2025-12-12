import { useState } from "react";
import styles from "./Login.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const formContainer = formRef.current;
    if (formContainer) {
      const activeForm = formContainer.querySelector(`.${styles.show} form`);
      if (activeForm) {
        formContainer.style.height = `${activeForm.scrollHeight}px`;
      }
    }
  }, [activeTab]);

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      activeTab === "login"
        ? "http://localhost:8080/user-service/users/login"
        : "http://localhost:8080/user-service/receptionists";

    const data =
      activeTab === "login"
        ? {
            username: formData.username,
            password: formData.password,
          }
        : {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            address: formData.address,
          };

    try {
      const response = await axios.post(url, data);
      console.log(`${activeTab} successful:`, response.data);

      if (activeTab === "login" && response.data && response.status === 200) {
        localStorage.setItem("userId", response.data.id);
        navigate("/Dashboard");
      }

      if (activeTab === "register" && response.status === 201) {
        setActiveTab("login");
      }

      setFormData({ username: "", email: "", password: "", address: "" });
    } catch (err) {
      if (err.response) {
        console.error("Error:", err.response.data.message || err.response.data);
      } else {
        console.error("Network or server error:", err.error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <h2>Red Pepper</h2>

        <p className={styles.descriptionText}>
          Discover a refined stay at Red Pepper. Log in to access your
          personalized hotel services.
        </p>

        <hr />

        <div className={styles.loginBar}>
          <span
            className={`${styles.tab} ${
              activeTab === "login" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            <FontAwesomeIcon icon={faUser} className={styles.fontIcon} />
            Login
          </span>
          <span
            className={`${styles.tab} ${
              activeTab === "register" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            <FontAwesomeIcon icon={faUserPlus} className={styles.fontIcon} />
            Register
          </span>
        </div>

        <div className={styles.formContainer} ref={formRef}>
          <div
            className={`${styles.formTransition} ${
              activeTab === "login" ? styles.show : styles.hide
            }`}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={handleChanges}
                name="username"
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handleChanges}
                name="password"
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSignIn} className={styles.fontIcon} />
                Login
              </button>
            </form>
          </div>

          <div
            className={`${styles.formTransition} ${
              activeTab === "register" ? styles.show : styles.hide
            }`}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={handleChanges}
                name="username"
              />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={handleChanges}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handleChanges}
                name="password"
              />
              <input
                type="text"
                placeholder="Address"
                required
                onChange={handleChanges}
                name="address"
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSignIn} className={styles.fontIcon} />
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
