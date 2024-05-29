import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from './Products.js';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Userprofile = (props) => {
  const navigate = useNavigate();
  const [shopdtl, setShopdtl] = useState(null);


  const getShopdtls = useCallback(async () => {
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
      return;
    }

    try {
      const formData = { 'userId': userId };
      const response = await fetch('https://kanpurback.onrender.com/api/userdata/getuserdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": props.userLogged().token,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert('Failed to load!!');
        navigate('/Signin');
        return;
      }
      try {
        const responseData = await response.json();
        setShopdtl(responseData);
      }
      catch {
        console.log('Something went wrong!!');
        return;
      }
    }
    catch (error) {
      console.error('Error loading details:', error.message);
      alert(error.message);
    }
  }, [props, navigate]);

  if (shopdtl) {
    document.getElementById('shopname').value = shopdtl.shopname;
    document.getElementById('address').value = shopdtl.address;
    document.getElementById('gstnumber').value = shopdtl.gstnumber;
   
    
  }

  const saveShopdtls = async (event) => {
    event.preventDefault();
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
      return;
    }
    // const form = document.getElementById('shopdtl');
    const shopname = document.getElementById('shopname').value;
    const address = document.getElementById('address').value;
    const gstnumber = document.getElementById('gstnumber').value;
    const formData = { shopname: shopname, address: address, gstnumber: gstnumber,userId: userId };

    console.log(formData);
    try {
      const response = await fetch('https://kanpurback.onrender.com/api/userdata/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": props.userLogged().token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log('Failed to Save!!');
        return;
      }
      try {
        const responseData = await response.json();
        console.log(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Details updated successfully!',
          showConfirmButton: false,
          timer: 3000, // 3 seconds
        });
        getShopdtls();
      }
      catch {
        console.log('Something went wrong!!');
      }
    }
    catch (error) {
      console.error('Error saving details:', error.message);
      alert(error.message);
    }
  };

  const logoutUser = async () => {
    props.logoutUser();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out successfully!',
      showConfirmButton: false,
      timer: 3000, // 3 seconds
    });
    navigate('/Signin');
    return;
  }
  useEffect(() => {
    getShopdtls();
  }, [getShopdtls]);
  return (
    <>
    
      <div className="card shadow" style={{ maxWidth: '80vw', margin: 'auto', marginTop: '7rem', marginBottom: '3rem' }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: '#2a5c99' }}>
          <h2 className="tm-hero-title mb-0 position-relative">
            Profile
            <button className="btn btn-sm btn-danger rounded-pill float-end" onClick={logoutUser}>
            Logout
          </button>         
           </h2>

        </div>

       






        <div className="card-body">
          <section className="login_content">
            <div className="tm-hero-text-container">
              <div className='row'>
               

                <div className='col-md-12 p-3'>
                  <hr />
                  <form className='m-6' id='shopdtl'>

                    
                    <label htmlFor="name" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Name:</label>
                    <input type="text" id="shopname" className="form-control mb-3 rounded-pill" placeholder="Name" required />
                    <label htmlFor="address" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Address:</label>
                    <input type="text" id="address" className="form-control mb-3 rounded-pill" placeholder="address" required />

                  
                        <label htmlFor="gstnumber" className="form-label ms-3">GST Number:</label>
                        <input type="text" id="gstnumber" className="form-control mb-3 rounded-pill" placeholder="GST Number"  />
                      
                     

                    <button className="btn btn-success rounded-pill px-3 ms-3" onClick={saveShopdtls}><i className="bi bi-check2-circle"></i> Save</button>

                  </form>
                </div>
              </div>

              <Products userLogged={props.userLogged()} />


            </div>
          </section>
        </div>
      </div>
    </>

  );
};

export default Userprofile;