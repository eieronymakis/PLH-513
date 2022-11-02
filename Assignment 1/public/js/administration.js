let table = document.getElementById('tablebody');

fetch('http://127.0.0.1:3000/user/all')
  .then((response) => response.json())
  .then((data) => {
    for(let i = 0; i < data.length; i++){
        table.innerHTML+=
        `<tr>
            <th scope="row">${data[i].id}</th>
            <td>${data[i].name}</td>
            <td>${data[i].surname}</td>
            <td>${data[i].username}</td>
            <td>${data[i].email}</td>
            <td>${data[i].role}</td>
            <td>${data[i].confirmed}</td>
            <td><button class="btn btn-success" onclick=showModal(${data[i].id})>Change</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
            ${data[i].confirmed == 0 ? `<td><button class="btn btn-primary" onclick="confirmUser(${data[i].id})">Confirm</button></td>` : "<td></td>"}
        </tr>`
    }
});


var myModal = document.getElementById('staticBackdrop');
var modal = bootstrap.Modal.getOrCreateInstance(myModal)

function showModal(userid){
    fetch(`http://127.0.0.1:3000/user/info/${userid}`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('modal_id').value = data[0].id
        document.getElementById('modal_name').value = data[0].name;
        document.getElementById('modal_surname').value = data[0].surname;
        document.getElementById('modal_username').value = data[0].username;
        document.getElementById('modal_email').value = data[0].email;
        document.getElementById('modal_role').value = data[0].role;
        document.getElementById('modal_confirmed').value = data[0].confirmed;
        modal.show();
    });
}

function confirmUser(id){
    const data = {
        id: id
    }
    fetch(`http://127.0.0.1:3000/user/cofirm`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success: ',data);
    })
    .catch((error) => {
        console.log('Error: ',error);
    });
}

function updateUserData(userid,username){
    const data = { 
        id: document.getElementById('modal_id').value,
        name: document.getElementById('modal_name').value,
        surname: document.getElementById('modal_surname').value,
        username: document.getElementById('modal_username').value,
        email : document.getElementById('modal_email').value,
        role : document.getElementById('modal_role').value,
        confirmed : document.getElementById('modal_confirmed').value
    };

    fetch(`http://127.0.0.1:3000/user/update`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}