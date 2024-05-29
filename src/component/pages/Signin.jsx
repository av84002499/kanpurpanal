import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signin = (props) => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false); 
  const [count, setCount] = useState(2); 
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (count > 0 && loading) {
      const timer = setTimeout(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count, loading]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setCount(2);

    const formData = { email, password };

    try {
      const response = await fetch('https://kanpurback.onrender.com/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const responseData = await response.json();
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: responseData.message || 'Invalid credentials!',
          timer: 3000,
        });
        return;
      }

      const responseData = await response.json();
      props.setUserLogged(responseData);

      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully!',
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/Userprofile');
      
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: 'auto', marginTop: '7rem', marginBottom: '3rem' }}>
      <div className="card-body">
        <div className="animate form login_form" style={{ background: 'azure', padding: '10px' }}>
          <section className="login_content">
            <form id="login" onSubmit={handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img style={{ height: '200px' }} src="./download.png" alt="Description" />
              </div>
              <h1 style={{ textAlign: 'center' }}>Login Form</h1>
              <div>
                <input type="text" id="email" className="form-control mb-3" placeholder="Email" required />
              </div>
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    required
                  />
                  <i
                    className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                  ></i>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? `Please wait ${count} sec...` : 'Continue'}
                  </button>
                </div>
              </div>
            </form>

            <div className="separator">
              <p className="change_link">New to site?
                <a href="https://kanpurpanal.vercel.app/signup"> <u>Sign Up</u> </a>
              </p>
              <div className="clearfix"></div>
              <br />
              <div className="text-center">
                <h1><i className="fa fa-paw"></i> EMENU!</h1>
                <p>©2024 All Rights Reserved. EMENU!</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Signin;
