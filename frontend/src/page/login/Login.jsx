import { useState } from "react";
import styles from "./Login.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const formRef = useRef(null);

  useEffect(() => {
    const formContainer = formRef.current;
    if (formContainer) {
      const activeForm = formContainer.querySelector(`.${styles.show} form`);
      if (activeForm) {
        formContainer.style.height = `${activeForm.scrollHeight}px`;
      }
    }
  }, [activeTab]);

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
            <form className={styles.form}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
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
            <form className={styles.form}>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="number" placeholder="Age" required />
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
