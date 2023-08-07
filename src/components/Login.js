import React from "react";
import {Button, Stack} from "@mui/material";
import GoogleLoginComponent from "./GoogleLoginComponent";
import NaverLoginComponent from "./NaverLoginComponent";
import GithubLoginComponent from "./GithubLoginComponent";
import {Link} from "react-router-dom";

function Login() {
  return (
          <div>
            <Stack spacing={2} alignItems='center' mt={2}>
              <GoogleLoginComponent/>
              <NaverLoginComponent/>
              <GithubLoginComponent/>
              <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                                     id={"loginButton"}>뒤로 가기</Button></Link>
            </Stack>

          </div>
  );
}

export default Login;