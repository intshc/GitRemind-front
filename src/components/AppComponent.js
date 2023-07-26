import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {Route, Routes, useLocation} from 'react-router-dom';
import Login from './Login';

function AppComponent() {
  const location = useLocation();
  const showLoginButton = location.pathname !== '/login';


  return (
          <div className="App">
            <AppBar position="static" style={{backgroundColor: 'darkviolet'}}>
              <Toolbar>
                <Typography variant="h6">GitRemind</Typography>
              </Toolbar>
            </AppBar>
            <div>
              <h1>GitRemind!!</h1>
            </div>
            {/* 로그인 창 들어가면 버튼 숨기기*/}
            {showLoginButton && <Button href={'/login'} variant={"contained"} color={"secondary"} size={"large"} id={"loginButton"}>로그인 하러 가기</Button>}
            <Routes>
              {/* 로그인 화면 */}
              <Route path="/login" element={<Login/>}/>

            </Routes>
          </div>
  );
}

export default AppComponent;
