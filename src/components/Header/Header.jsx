import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { AuthContext } from '../../App';

const Header = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <svg viewBox="0 0 60 60" fill="none" width="60" height="60">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.887 40.914C20.71 42.41 19.506 43.636 18 43.636H8.182c-1.506 0 -2.737 -1.225 -2.631 -2.728C6.886 21.995 21.995 6.886 40.909 5.551 42.411 5.444 43.636 6.676 43.636 8.182v9.818c0 1.506 -1.227 2.71 -2.722 2.887 -10.476 1.24 -18.786 9.55 -20.027 20.027Z"
                fill="rgb(0, 0, 0)"
              />
              <mask id="path-2-inside-1_2_1368" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.342 46.369C26.165 47.864 24.961 49.091 23.455 49.091H13.636c-1.506 0 -2.737 -1.225 -2.631 -2.728C12.34 27.45 27.45 12.34 46.363 11.005 47.866 10.899 49.091 12.13 49.091 13.636v9.818c0 1.506 -1.227 2.71 -2.722 2.887 -10.476 1.24 -18.786 9.55 -20.027 20.027Z"
                />
              </mask>
              <path
                d="m46.363 11.005 -0.154 -2.176 0.154 2.176ZM13.636 49.091v2.182Zm0 2.182h9.818v-4.364H13.636v4.364ZM46.21 8.829C26.212 10.24 10.24 26.212 8.829 46.21l4.353 0.307c1.258 -17.83 15.506 -32.077 33.335 -33.335l-0.307 -4.353ZM51.273 23.455V13.636h-4.364v9.818h4.364Zm-22.764 23.17c1.122 -9.475 8.642 -16.994 18.116 -18.116l-0.513 -4.333c-11.478 1.359 -20.578 10.459 -21.937 21.937l4.333 0.513ZM46.909 23.455c0 0.139 -0.052 0.286 -0.188 0.427 -0.144 0.149 -0.36 0.265 -0.609 0.294l0.513 4.333C49.056 28.221 51.273 26.223 51.273 23.455h-4.364Zm-0.392 -10.273c0.092 -0.007 0.173 0.022 0.249 0.095 0.082 0.08 0.143 0.205 0.143 0.36h4.364c0 -2.669 -2.199 -5.01 -5.063 -4.808l0.307 4.353ZM23.455 51.273c2.769 0 4.766 -2.217 5.054 -4.648l-4.333 -0.513c-0.029 0.249 -0.145 0.465 -0.294 0.609 -0.141 0.136 -0.288 0.188 -0.427 0.188v4.364Zm-9.818 -4.364c-0.155 0 -0.28 -0.062 -0.36 -0.143 -0.074 -0.075 -0.101 -0.156 -0.095 -0.249l-4.353 -0.307C8.626 49.074 10.967 51.273 13.636 51.273v-4.364Z"
                fill="rgb(143, 45, 86)"
                mask="url(#path-2-inside-1_2_1368)"
              />
            </svg>
            <div>
              <h1>English Hub</h1>
              <p>best website to improve your English </p>
            </div>
          </div>
        </Link>
        <div className={styles.leftComponents}>
          {user.isAuthenticated && user.role == 'admin' && (
            <>
              <Link to="/create-test">
                <img width={35} height={35} src="img/add.png" alt="Add Page" />
              </Link>
              <Link to="/admin">
                <img width={35} height={35} src="img/admin.png" alt="Add Page" />
              </Link>
            </>
          )}
          <Link to="/auth">
            <img width={35} height={35} src="img/user.png" alt="Add Page" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
