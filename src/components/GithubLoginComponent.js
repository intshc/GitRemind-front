import gitIcon from "../images/gitIcon.png";

const GithubLoginComponent = () => {

  return (
          <div>
            <a href="http://localhost:8080/oauth2/authorization/github">
              <img src={gitIcon} alt="위의 이미지를 누르면 연결됩니다."></img>
            </a>
          </div>
  );
};

export default GithubLoginComponent;