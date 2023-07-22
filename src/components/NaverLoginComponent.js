import naverIcon from "../images/naverIcon.png"
const NaverLoginComponent = () => {

  return (
          <div>
              <a href="http://localhost:8080/oauth2/authorization/naver">
                <img src={naverIcon} alt="위의 이미지를 누르면 연결됩니다."></img>
              </a>
          </div>
  );
};
export default NaverLoginComponent;