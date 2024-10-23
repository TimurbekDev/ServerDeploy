import axios from "../../../node_modules/axios/dist/esm/axios.js";

document.getElementById('loginForm').addEventListener('submit', async function (e) {    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    try {
      axios.post('http://localhost:3000/auth/login', {
        email: email,
        password:password
      })
        .then(response => {
            console.log(response.data);
            sessionStorage.setItem('userName', response.data.full_name);
            window.location.href = 'chat.html'
        })
        .catch(error => {
            console.error(error);
            errorMessage.textContent = 'Login failed. Please check your credentials.';
        });
    } catch (error) {
      errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});

document.getElementById('registerButton').addEventListener('click', function() {
    window.location.href = 'register.html';
});
  