import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const Signin = (props) => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true); 
  const [count, setCount] = useState(2); 
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(prevCount => prevCount - 1);
    }, 2000);

    // Stop the loading and countdown when count reaches 1
    if (count === 2) {
      setLoading(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [count]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const formData = { 'email': email, 'password': password };
    // console.log('formdata:', formData)

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch('https://kanpurback.onrender.com/api/users/signin', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid credentials!',
          timer: 3000, // 1 second

        });
      } else if (response.status === 409) { // Assuming 409 represents a conflict (email already exists)
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The email already exists!',
          timer: 3000, // 1 second

        });
    }
      

      const responseData = await response.json();
      if (responseData) {
        // console.log(responseData);
        props.setUserLogged(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully!',
          showConfirmButton: false,
          timer: 1000, //  seconds
        });
        navigate('/Userprofile');
      }
      else {
        console.log('Something went wrong:', responseData);
        navigate('/Signin');
      }


    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert(error.message);
    }
  };
  return (
    <div className="card" style={{ maxWidth: '400px', margin: 'auto', marginTop: 7 + 'rem', marginBottom: 3 + 'rem' }}>
      <div className="card-body">
        <div className="animate form login_form" style={{ background: 'azure', padding: '10px' }}>
          <section className="login_content">
            <form id="login">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img style={{ height: '200px' }} src="./images/hiring-tag.png" alt="Description" />
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


                <div>
                  <div className="row mt-2">
                    
                    <div className="col-md-4 mt-2">
                      <button type="submit" className="width-35 btn btn-success" onClick={handleSubmit}>
                      {loading ? (
                        <p>Please wait {count} sec...</p>
                      ) : (
                        <p>Continue</p>
                      )} 
                      </button>
                    </div>

                  </div>
                </div>

            </form>

            <div className="clearfix">
            </div>

            <div className="separator">
             
              <p className="change_link">New to site?
                <a href="https:/signup"> <u>Sign Up</u> </a>
              </p>

              <div className="clearfix"></div>
              <br />

              <div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1><i className="fa fa-paw"></i> EMENU!</h1>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <p>©2024 All Rights Reserved. EMENU!</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Signin