import React, {useState} from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import GoogleLoginComponent from "./GoogleLoginComponent";
import NaverLoginComponent from "./NaverLoginComponent";
import GithubLoginComponent from "./GithubLoginComponent";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogin = async () => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      try {
        const serverUrl = process.env.REACT_APP_BASE_URL;
        // 서버 측에 토큰 검증 요청
        const response = await axios.get(`${serverUrl}/api/auth/verify-token`, {
          headers: {Authorization: token}
        });

        if (response.data.isValid) {
          // 토큰이 유효하다면 다음 화면으로 이동
          navigate('/main');
        } else {
          // 토큰이 유효하지 않은 경우
          throw new Error('토큰이 유효하지 않습니다.', response.status);
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
      }
    } else {
      // 토큰 없으면 안내 창 띄우기
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
          <div>
            <Stack spacing={2} alignItems='center' mt={2}>
              <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <GoogleLoginComponent/>
              <NaverLoginComponent/>
              <GithubLoginComponent/>
              <Button onClick={handleLogin} color={"secondary"}>✔ 이미 로그인을 하셨나요?</Button>
              <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                                     id={"loginButton"}>뒤로 가기</Button></Link>

              <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Token Error"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    로그인이 안 되어 있습니다.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    확인
                  </Button>
                </DialogActions>
              </Dialog>

            </Stack>
          </div>
  );
}

export default Login;