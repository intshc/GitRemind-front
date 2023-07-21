import {GoogleLogin} from "@react-oauth/google";

const apikey = process.env.REACT_APP_googleClientId;


const GoogleLoginComponent = () => {

  const onFailure = (response) => {
    console.log('Login failed response:', response);
  };

  //jwt 파싱
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function handleCredentialResponse(response) {
    const jsonLog = parseJwt(response.credential)

    const nameValue = jsonLog.name;
    console.log(nameValue)

    // <h1> 태그 찾기
    const myHeader = document.getElementById("nameValue");
    // <h1> 태그 내용을 nameValue로 설정
    myHeader.textContent = `${nameValue}님 안녕하세요!`;
  }

  return (
          <div>
            <GoogleLogin
                    clientId={apikey}
                    buttonText="Login with Google"
                    onSuccess={handleCredentialResponse}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
            />
            <h6 id="nameValue"></h6>

          </div>
  );
};


export default GoogleLoginComponent;