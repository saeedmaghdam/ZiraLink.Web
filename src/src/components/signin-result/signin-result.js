const SigninResult = () => {
  const accessToken = new URLSearchParams(window.location.search).get('access_token');
  localStorage.setItem('token', accessToken);
  window.location.href = '/';
};

export default SigninResult;
