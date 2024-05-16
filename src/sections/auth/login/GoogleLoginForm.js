import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Iconify from "../../../components/iconify/Iconify";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../../../context/EmployeeContext";

export default function GoogleLoginForm() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const {userLogin} =  useEmployeeContext();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user?.access_token) {
      localStorage.setItem("loginData", JSON.stringify(user));
      sessionStorage.setItem('IsuserLogin',true)
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("userProfile", JSON.stringify(res.data));
          const payload = {
            firstName : res?.data?.given_name,
            lastName : res?.data?.family_name,
            email: res?.data?.email,
            googleId : res?.data?.id
          };
           userLogin(payload)
            .then((response) => {
              if (response.data.success == true) {
                navigate("/dashboard", { replace: true });
              }
            })
            .catch((error) => {
              console.error(error);
            });
       
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <Button
        className="no-uppercase mt-3"
        fullWidth
        size="large"
        color="inherit"
        variant="outlined"
        onClick={() => login()}
        style={{ backgroundColor: 'white' }}
      >
        <Iconify
          icon="eva:google-fill"
          color="#DF3E30"
          width={22}
          height={22}
        />
        &emsp;<span style={{ fontWeight: 'bold' }}>Sign in with Google</span>
      </Button>
    </div>
  );
}