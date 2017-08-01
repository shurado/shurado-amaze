const CODE_SHOULD_THROW = [400, 401, 500];
export const checkResponse = (res) => {
  if (CODE_SHOULD_THROW.indexOf(res.status) !== -1) {
    
  }

  return res.json();
}
