import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import CustomFetch from "../utils/CustomFetch";

function SetGithubName() {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const {provider} = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await CustomFetch(`/user/api`);
        if (!response.ok) {
          throw new Error('서버에 문제가 발생했습니다. 상태 코드:', response.status);
        }
        const data = await response.json();
        setName(data.username);
        setPicture(data.picture);
      } catch (e) {
        console.error(e);
      }
    }

    fetchAccessToken();
  }, [provider]);

  // 사용자 이름을 받아 서버에 전송하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 새로 고침 방지

    const token = localStorage.getItem('Authorization');
    try {
      const response = await CustomFetch(`/api/github-name`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        method: 'POST',
        body: JSON.stringify({
          githubName: text,
        }),
      });

      if (!response.ok) {
        throw new Error("서버에 문제가 발생했습니다. 상태 코드:", response.status);
      }
      navigate('/main');
    } catch (e) {
      console.error(e);
    }
  };

  const renderContent = () => {
    if (name && picture) {
      return (
              <>
                <img src={picture} alt="프로필 사진"/>
                <h2>{name} 님 안녕하세요👋</h2>
                <h3>깃허브 이름을 등록해주세요!!</h3>
                <form onSubmit={handleSubmit}>
                  <input type="text" value={text} onChange={handleChange}/>&nbsp;
                  <Button type="submit" variant={"contained"} color={"secondary"} size={"small"}>제출</Button>
                </form>
                <br></br>
                <br></br>
                <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                >홈으로 가기</Button></Link>
              </>
      );
    } else {
      return (
              <div><p>유저 정보를 읽어오는데 실패했습니다!</p>
                <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                >홈으로 가기</Button></Link></div>
      )
    }
  };

  return <div>{renderContent()}</div>;
}

export default SetGithubName;