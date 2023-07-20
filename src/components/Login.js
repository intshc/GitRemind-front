import React from "react";
import {Stack} from "@mui/material";
import GoogleLoginComponent from "./GoogleLoginComponent";

function Login() {

  return (
          <div>
            <Stack spacing={2} alignItems='center' mt={2}>
              <GoogleLoginComponent />
            </Stack>
          </div>
  );
}

export default Login;