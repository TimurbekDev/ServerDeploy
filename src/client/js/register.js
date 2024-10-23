import axios from "../../../node_modules/axios/dist/esm/axios.js";

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        full_name: name,
        email: email,
        password: password
    };

    axios.post('http://localhost:3000/auth/register', data)
        .then(response => {
            console.log(response.data);
            sessionStorage.setItem('userName', response.data.full_name);
            window.location.href = 'chat.html'
        })
        .catch(error => {
            console.error(error);
            alert('Registration failed, please try again.');
        });
});
