// ----------------------------------------------------------------------

const account = {
  displayName: JSON.parse(localStorage.getItem('userProfile'))?.name,
  email:  JSON.parse(localStorage.getItem('userProfile'))?.email,
  photoURL: JSON.parse(localStorage.getItem('userProfile'))?.picture,
};

export default account;
