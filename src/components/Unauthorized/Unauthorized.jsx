import React from "react";
import { Link } from "react-router-dom";
import styles from "./Unauthorized.module.scss";

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <img
        height={128}
        width={128}
        className={styles.image}
        src="/img/cross.png" // Make sure to provide the correct path
        alt="Unauthorized"
      />
      <h1 className={styles.heading}>Unauthorized Access</h1>
      <p className={styles.description}>
        You do not have permission to access this page. Please sign in or sign
        up to continue.
      </p>
      <Link to="/auth" className={styles.authLink}>
        <button className={styles.authButton}>Sign In / Sign Up</button>
      </Link>
    </div>
  );
};

export default Unauthorized;
