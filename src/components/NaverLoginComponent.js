import naverIcon from "../images/naverIcon.png"

const NaverLoginComponent = () => {

  return (
          <div>
            <a href={"http://localhost:8080/oauth2/authorization/naver"}>
              <img src={naverIcon} alt="네이버 아이콘" className={"snsButton"}></img>
            </a>
          </div>
  );
};
export default NaverLoginComponent;