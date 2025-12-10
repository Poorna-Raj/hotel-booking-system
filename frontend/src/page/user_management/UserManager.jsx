import { useState } from "react";
import styles from "./UserManager.module.css";
import AdminManager from "../../Component/UserManager/AdminManager/AdminManager";
import ReceptionistManager from "../../Component/UserManager/ReceptionistManager/ReceptionistManager";

function UserManager() {
  const [activeTab, setActiveTab] = useState("receptionists");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleSwitch}>
            {/* Sliding Background */}
            <div
              className={`${styles.slider} ${
                activeTab === "admins" ? styles.sliderRight : ""
              }`}
            />

            {/* Receptionist Button */}
            <button
              onClick={() => setActiveTab("receptionists")}
              className={`${styles.toggleButton} ${
                activeTab === "receptionists" ? styles.active : ""
              }`}
            >
              Receptionists
            </button>

            {/* Admin Button */}
            <button
              onClick={() => setActiveTab("admins")}
              className={`${styles.toggleButton} ${
                activeTab === "admins" ? styles.active : ""
              }`}
            >
              Admins
            </button>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div key={activeTab} className={styles.contentInner}>
            {activeTab === "receptionists" ? (
              <ReceptionistManager />
            ) : (
              <AdminManager />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManager;
