import {Button, Typography} from "@mui/material";
import googleIcon from "../images/googleIcon.png"

const GoogleLoginComponent = ({ userName }) => {
  return (
          <div className="col-md-6">

            {userName ? (
                    <>
                      Logged in as: <Typography component="span" id="user">{userName}</Typography>
                      <Button href="/logout" variant="contained"
                      >Logout</Button>
                    </>
            ) : (
                    <a href="/oauth2/authorization/google">
                      <img src={googleIcon} alt={"구글로 로그인 하기"}/>
                    </a>

            )}
          </div>
  );
};

export default GoogleLoginComponent;