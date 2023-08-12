import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Main() {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const {provider} = useParams();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch(`/user/api`);
        if (!response.ok) {
          throw new Error('서버에 문제가 발생했습니다. 상태 코드:', response.status);
        }
        const data = await response.json();
        setName(data.name);
        setPicture(data.picture);

        if (!name || !picture) {
          throw new Error('유저 정보가 없습니다.');
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchAccessToken();
  }, [name, picture, provider]);

    return (
            <div>
              {picture && <img src={picture} alt="프로필 사진"/>}
              <h2>{name} 님 안녕하세요👋</h2>
            </div>
    );
  }

  export default Main;