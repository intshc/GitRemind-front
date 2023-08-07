import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import Login from './Login';
import React from "react";
import OAuthCallback from "./OAuthCallback";

function AppComponent() {
  const location = useLocation();
  const showLoginButton = location.pathname !== '/login';


  function Home() {
    return (
            <div>
              <h1>GitRemind!!</h1>
              <Link to="/login">
                {showLoginButton && <Button variant={"contained"} color={"secondary"} size={"large"}
                                            id={"loginButton"}>로그인 하러 가기</Button>}
              </Link>
            </div>
    );
  }

  return (
          <div className="App">
            <AppBar position="static" style={{backgroundColor: 'darkviolet'}}>
              <Toolbar>
                <Typography variant="h6">GitRemind</Typography>
              </Toolbar>
            </AppBar>
            <Routes>
              {/* 기본 경로 */}
              <Route exact path="/" element={<Home/>}/>
              {/* 로그인 화면 */}
              <Route exact path="/login" element={<Login/>}/>
              {/* 콜백 url */}
              <Route path="login/oauth2/code/:provider" element={<OAuthCallback/>}/>
            </Routes>

          </div>
  );
}

export default AppComponent;
