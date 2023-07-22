import React from "react";
import {Stack} from "@mui/material";
import GoogleLoginComponent from "./GoogleLoginComponent";
import NaverLoginComponent from "./NaverLoginComponent";
function Login() {

  return (
          <div>
            <Stack spacing={2} alignItems='center' mt={2}>
              <GoogleLoginComponent />
              <NaverLoginComponent />
            </Stack>
          </div>
  );
}

export default Login;