import * as React from 'react';
import {useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import CustomFetch from "../utils/CustomFetch";

function User() {
  const [name, setName] = useState('');
  const [gitName, setGitName] = useState('');
  const [picture, setPicture] = useState('');
  const [email, setEmail] = useState('');
  const defaultTheme = createTheme();
  const [tempName,setTempName] = useState('');
  const [tempGitName,setTempGitName] = useState('');
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await CustomFetch(`/api/user`);
        if (!response.ok) {
          throw new Error('서버에 문제가 발생했습니다. 상태 코드:', response.status);
        }
        const data = await response.json();
        setName(data.username);
        setPicture(data.picture);
        setGitName(data.gitName);
        setEmail(data.email);
        setTempName(data.username);
        setTempGitName(data.gitName);
      } catch (e) {
        console.error(e);
      }
    }

    getUserInfo();
  },[]);
  const handleSubmit = async (event) => {
    event.preventDefault(); // 새로 고침 방지

    const token = localStorage.getItem('Authorization');
    try {
      const response = await CustomFetch(`/api/user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        method: 'PATCH',
        body: JSON.stringify({
          githubName: gitName,
          userName: name
        }),
      });

      if (!response.ok) {
        throw new Error("서버에 문제가 발생했습니다. 상태 코드:", response.status);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const renderContent = () => {
    return (
            <>
              <ThemeProvider theme={defaultTheme}>
                <Box sx={{display: 'flex'}}>
                  <Box
                          component="main"
                          sx={{
                            backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                          }}
                  >
                    <Toolbar/>
                    <h2>사용자 정보 수정하기</h2>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} md={8} lg={9}>
                          <Paper
                                  sx={{
                                    p: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'auto', // 높이를 자동으로 설정하도록 변경
                                  }}
                          >
                            <form noValidate autoComplete="off">
                              <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box mr={3}>이름/닉네임</Box>
                                <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                />
                              </Box>

                              <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box mr={1}>깃허브 닉네임</Box>
                                <TextField
                                        id="github-name"
                                        label="GitHub Name"
                                        variant="outlined"
                                        value={gitName}
                                        onChange={(e) => setGitName(e.target.value)}
                                />
                              </Box><Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box mr={8}>이메일</Box>
                              <TextField
                                      disabled
                                      id="outlined-disabled"
                                      label="Email"
                                      value={email}
                              />
                            </Box>
                            </form>
                          </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                          <Paper
                                  sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                  }}
                          >
                            &nbsp;<img src={picture} alt="프로필 사진" className={"Picture"}/>
                            이름: {tempName}
                            <br></br>
                            깃허브 닉네임: {tempGitName}
                          </Paper>
                        </Grid>
                      </Grid>
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                      수정
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to={"/main"}><Button variant={"contained"} color={"secondary"} size={"large"}
                      >홈으로 가기</Button></Link>
                    </Container>
                  </Box>
                </Box>
              </ThemeProvider>
            </>
    );
  }

  return <div>{renderContent()}</div>;
}

export default User;