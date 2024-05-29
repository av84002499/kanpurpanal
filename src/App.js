import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./component/pages/Signin";
import Signup from "./component/pages/Signup";
import Userprofile from "./component/Menu/Userprofile";
import Cookies from "js-cookie";


const App = () => {
  // Set Logged user cookie
  const setUserLogged = (userLogged) => {
    Cookies.set("userID", userLogged.userID, { expires: 1 });
    Cookies.set("name", userLogged.name, { expires: 1 });
    Cookies.set("email", userLogged.email, { expires: 1 });
    Cookies.set("token", userLogged.token, { expires: 1 });
  };

  // Get Logged user cookie
  const getUserLogged = () => {
    const userID = Cookies.get("userID");
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const token = Cookies.get("token");
    const userLogged = { userID, name, email, token };
    return userLogged;
  };

  // Delete Logged user cookie
  const deleteUserLogged = () => {
    Cookies.remove("userLogged"); // Delete cookie named 'user'
    Cookies.remove("userID");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("token");
  };

  return (
    <div>
      
      <Routes>
       
      <Route
      key="Signin"
      path="/"
      element={<Signin setUserLogged={setUserLogged} />}
    />
        
        <Route key="Signup" path="/Signup" element={<Signup />} />
        <Route
          key="Signin"
          path="/Signin"
          element={<Signin setUserLogged={setUserLogged} />}
        />
        
        
        
       
        <Route
          key="Userprofile"
          path="/Userprofile"
          element={
            <Userprofile
              userLogged={getUserLogged}
              logoutUser={deleteUserLogged}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
