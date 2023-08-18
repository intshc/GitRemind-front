async function customFetch(url, options = {}) {
  options.headers = options.headers || {};

  // 인증 헤더 추가 (토큰이 있는 경우)
  const token = localStorage.getItem('accessToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  // 401 응답이 있는 경우 토큰 갱신 시도
  if (response.status === 401) {
    const refreshTokenResponse = await fetch('/auth/refresh', {
      method: 'POST',
    });

    if (refreshTokenResponse.ok) {
      const data = await refreshTokenResponse.json();
      localStorage.setItem('Authorization', 'Bearer ' + data.accessToken);
      // 기존 요청 재시도
      options.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return fetch(url, options);
    }
  }

  return response;
}

export default customFetch;
