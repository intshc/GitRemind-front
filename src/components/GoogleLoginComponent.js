import {GoogleLogin} from "@react-oauth/google";

const apikey = process.env.REACT_APP_googleClientId;


const GoogleLoginComponent = () => {

  const onFailure = (response) => {
    console.log('Login failed response:', response);
  };
  function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function handleCredentialResponse(response) {
    //console.log(response)

    console.log(JSON.stringify(parseJwt(response.credential)));
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

          </div>
  );
};



export default GoogleLoginComponent;