import { useState } from "react";
import styles from "./UserManager.module.css";

function UserManager() {
  const [activeTab, setActiveTab] = useState("receptionists");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        {/* Toggle Switch */}
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

        {/* Content Area with Animation */}
        <div className={styles.contentArea}>
          <div key={activeTab} className={styles.contentInner}>
            {activeTab === "receptionists" ? (
              <div>
                <h2 className={styles.contentTitle}>Receptionist Management</h2>
                <p className={styles.contentText}>
                  Manage receptionist accounts, permissions, and settings here.
                </p>
              </div>
            ) : (
              <div>
                <h2 className={styles.contentTitle}>Admin Management</h2>
                <p className={styles.contentText}>
                  Manage admin accounts, permissions, and settings here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManager;
