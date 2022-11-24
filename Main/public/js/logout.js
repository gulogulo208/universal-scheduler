const logout = async () => {
    console.log('Logout logic')
    
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      
      document.location.replace('/');
    } else {
      alert("ERROR");
    }
  };
  
  let logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
  document.querySelector('#logout').addEventListener('click', logout);
}