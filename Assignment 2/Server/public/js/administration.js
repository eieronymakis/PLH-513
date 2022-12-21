fetch('http://127.0.0.1/user/info')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });

function loadUsers(){
    let table = document.getElementById('tablebody');
    fetch('http://127.0.0.1/user/all')
    .then((response) => response.json())
    .then((data) => {
        table.innerHTML = '';
        for(let i = 0; i < data.length; i++){
            table.innerHTML+=
            `<tr>
                <th scope="row">${data[i].user_id}</th>
                <td>${data[i].username}</td>
                <td>${data[i].email}</td>
                <td>${data[i].role_name}</td>
                <td>1</td>
                <td><button class="btn btn-success" onclick=showModal("${data[i].user_id}")>Change</button></td>
                <td><button class="btn btn-danger" onclick=deleteUser("${data[i].user_id}")>Delete</button></td>
            </tr>`
        }
    });

}

function showModal(userid){
    var myModal = document.getElementById('staticBackdrop');
    var modal = bootstrap.Modal.getOrCreateInstance(myModal)
    fetch(`http://127.0.0.1/user/info/${userid}`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('modal_id').value = data.user_id
        document.getElementById('modal_username').value = data.username;
        document.getElementById('modal_email').value = data.email;
        document.getElementById('modal_role').value = data.role_name;
        document.getElementById('modal_confirmed').value = 1;
        document.getElementById( 'updateButton' ).setAttribute( "onClick", `updateUser("${data.user_id}");loadUsers();`);
        modal.show();
    });
}

// function confirmUser(userID){
//     const data = { 
//         id:userID 
//     };
//     fetch(`http://127.0.0.1:3000/user/confirm`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
//     loadUsers();
// }

function deleteUser(userID){
    fetch(`http://127.0.0.1/user/delete/${userID}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }})
    .then((res) => {
        loadUsers();
        $("#alert3").hide().show('medium');
        setTimeout(function(){$("#alert3").hide()},2000)
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function updateUser(userID){
    let newuname = document.getElementById("")
    const data = { 
        "username": document.getElementById('modal_username').value
    };

    fetch(`http://127.0.0.1/user/update/${userID}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((res) => {
        $("#alert1").hide().show('medium');
        setTimeout(function(){$("#alert1").hide()},2000)
    })
    .catch((error) => {
        $("#alert2").hide().show('medium');
        return;
    });

}