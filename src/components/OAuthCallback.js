import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const {provider} = useParams();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch(`/api/auth/access-token`);
        if (!response.ok) {
          throw new Error('서버에 문제가 발생했습니다. 상태 코드:', response.status);
        }
        const data = await response.json();
        const accessToken = data.accessToken;

        if (!accessToken) {
          throw new Error('Access Token이 없습니다.');
        }
        localStorage.setItem('Authorization', "Bearer " + accessToken);
        navigate('/user/set-gitName');
      } catch (e) {
        console.error(e);
      }
    }

    fetchAccessToken();
  }, [provider, navigate]);

  return <div>{provider}로그인 처리 중...</div>;
};

export default OAuthCallback;
