import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [count, setCount] = useState(2); 

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      setErrorMessage('Please agree to the Terms of Services and Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://kanpurback.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Sign up failed.');
      }
      // Handle successful signup
      Swal.fire({
        icon: 'success',
        title: 'Signed up successfully!',
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/Signin');
    } catch (error) {
      console.error('Email already exists:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The email already exists!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1500px', margin: 'auto', marginTop: '4rem', marginBottom: '1rem' }}>
      <div className="col-md-4 mx-auto">
        <div className="row login-box">
          <div className="col-md-12">
            <div className="login-img">
              <img className="img-fluid" src="signup_img.png" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="card-body login-card">
              <form id="member_registration" onSubmit={handleSubmit}>
                <h5 className="login-card-title">Sign up</h5>
                <div className="form-signin">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label htmlFor="reg-email">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="reg-email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label htmlFor="desirePassword">Set Password</label>
                        <div className="showpassword">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="form-control"
                            id="desirePassword"
                            placeholder="Desired Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'} onClick={togglePasswordVisibility}></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-left">
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck01"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          required
                        />
                        <label className="custom-control-label" htmlFor="customCheck01">
                          I agree to all Terms of Services and Privacy Policy.
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 pt-md-2 pt-1">
                      <button className="btn btn-primary comn-btn" type="submit" disabled={loading}>
                        {loading ? `Please wait ${count} sec...` : 'Continue'}
                      </button>
                    </div>
                    {errorMessage && (
                      <p className="mt-2 mb-3 text-center" style={{ fontSize: '12px', background: '#981A0C', color: 'white', padding: '5px' }}>
                        {errorMessage}
                      </p>
                    )}
                    <div className="row">
                      <div className="col-md-6">
                        <a href="/Signin"> <u>Sign in</u> </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
