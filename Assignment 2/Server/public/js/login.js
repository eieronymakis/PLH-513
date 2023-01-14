let url = 'http://35.226.48.88';

function authenticate(){
    let name = document.getElementById('uname_input').value;
    let password = document.getElementById('pass_input').value;
    let data = {
        name: name,
        password: password
    };
    fetch(`${url}/auth`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.authentication){
            window.location.replace(`${url}/welcome`)
        }else{
            document.getElementById('error').innerHTML=data.message;
            document.getElementById('error').classList.remove('invisible');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


document.getElementById("pass_input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("login_button").click();
    }
});
