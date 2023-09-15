import naverIcon from "../images/naverIcon.png"

const NaverLoginComponent = () => {

  return (
          <div>
            <a href={`${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`}>
              <img src={naverIcon} alt="네이버 아이콘" className={"snsButton"}></img>
            </a>
          </div>
  );
};
export default NaverLoginComponent;