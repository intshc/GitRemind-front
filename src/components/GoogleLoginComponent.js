import googleIcon from "../images/googleIcon.png";

const GoogleLoginComponent = () => {

  return (
          <div>
            <a href={`${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`}>

              <img src={googleIcon} alt="위의 이미지를 누르면 연결됩니다." className={"snsButton"}></img>
            </a>
          </div>
  );
};

export default GoogleLoginComponent;