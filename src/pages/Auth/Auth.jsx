import React from 'react';
import axios from '../../axios.js';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.scss';
import { AuthContext } from '../../App';

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const [isLogin, setIsLogin] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedForm, setSelectedForm] = React.useState('');
  const { user, checkAuth } = React.useContext(AuthContext);

  const formOptions = [
    '8А',
    '8Б',
    '8В',
    '8Г',
    '9А',
    '9Б',
    '9В',
    '9Г',
    '10А',
    '10Б',
    '10В',
    '10Г',
    '11А',
    '11Б',
    '11В',
    '11Г',
  ];

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await axios.post(`/auth/${isLogin ? 'login' : 'register'}`, data);

      console.log('Токен доступа:', response.data.token);
      localStorage.setItem('token', response.data.token);

      await checkAuth();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  const logOut = async () => {
    localStorage.removeItem('token');
    await checkAuth();
  };

  if (user.isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.authorizedContainer}>
          <img width={128} height={128} src="img/tick.png" alt="Authorized!" />
          <h1>
            Hello, {user.username}! You are authorized as {user.role.toUpperCase()}!
          </h1>
          <Link to="/">
            <button className={styles.button}>Home</button>
            <button onClick={() => logOut()} className={styles.button}>
              Log Out
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {!isLogin && (
            <>
              <div className={styles.wideGroup}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name:
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="name"
                    id="name"
                    className={styles.input}
                  />
                  {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="surname" className={styles.label}>
                    Surname:
                  </label>
                  <input
                    {...register('surname', { required: 'Surname is required' })}
                    type="name"
                    id="surname"
                    className={styles.input}
                  />
                  {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="form" className={styles.label}>
                  Form:
                </label>
                <select
                  {...register('form', { required: 'Form is required' })}
                  id="form"
                  className={styles.input}
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}>
                  <option value="">Select Form</option>
                  {formOptions.map((formOption) => (
                    <option key={formOption} value={formOption}>
                      {formOption}
                    </option>
                  ))}
                </select>
                {errors.form && <p className={styles.error}>{errors.form.message}</p>}
              </div>
            </>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              id="username"
              className={styles.input}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              id="password"
              className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <div>
            <button disabled={!isValid} type="submit" className={styles.button}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
        <p className={styles.signupText}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)} className={styles.signupLink}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
