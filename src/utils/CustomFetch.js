async function customFetch(url, options = {}) {
  const serverUrl = process.env.REACT_APP_BASE_URL;
  options.headers = options.headers || {};

  // 인증 헤더 추가 (토큰이 있는 경우)
  const token = localStorage.getItem('accessToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${serverUrl}${url}`, options);

  // 401 응답이 있는 경우 토큰 갱신 시도
  if (response.status === 401) {
    const refreshTokenResponse = await fetch(`${serverUrl}/auth/refresh`, {
      method: 'POST',
    });

    if (refreshTokenResponse.ok) {
      const data = await refreshTokenResponse.json();
      localStorage.setItem('Authorization', 'Bearer ' + data.accessToken);
      // 기존 요청 재시도
      options.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return fetch(`${serverUrl}${url}`, options);
    }
  }

  return response;
}

export default customFetch;
