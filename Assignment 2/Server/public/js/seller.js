fetch('http://127.0.0.1/user/info')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });
  
function loadProducts(){
    let table = document.getElementById('tablebody');
    fetch('http://127.0.0.1/seller/products')
    .then((response) => response.json())
    .then((data) => {
        table.innerHTML = '';
        for(let i = 0; i < data.length; i++){
            table.innerHTML+=
            `<tr>
                <th scope="row">${data[i].id}</th>
                <td>${data[i].name}</td>
                <td>${data[i].code}</td>
                <td>${data[i].price}</td>
                <td>${(data[i].dateofwithdrawl).split('T')[0]}</td>
                <td>${data[i].category}</td>
                <td>${data[i].photo}</td>
                <td>${data[i].available}</td>
                <td><button class="btn btn-success" onclick=showModal("${data[i].id}")>Change</button></td>
                <td><button class="btn btn-danger" onclick=removeItem("${data[i].id}")>Delete</button></td>
            </tr>`
        }
    });
}

function removeItem(pid){
    fetch(`http://127.0.0.1/seller/products/${pid}/delete`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then((res)=>{
        loadProducts();
        $("#alert3").hide().show('medium');
        setTimeout(function(){$("#alert3").hide()},2000)
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function showModal(pid){
    var myModal = document.getElementById('staticBackdrop');
    var modal = bootstrap.Modal.getOrCreateInstance(myModal);
    fetch(`http://127.0.0.1/seller/products/${pid}/info`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('modal_id').value = data.id
        document.getElementById('modal_name').value = data.name;
        document.getElementById('modal_pcode').value = data.code;
        document.getElementById('modal_price').value = data.price;
        document.getElementById('modal_dow').value = data.dateofwithdrawl;
        document.getElementById('modal_sname').value = data.seller;
        document.getElementById('modal_category').value = data.category;
        document.getElementById('modal_pphoto').value = data.photo;
        document.getElementById('modal_available').value = data.available;
        modal.show();
    })
}

function showModal2(){
    var myModal = document.getElementById('staticBackdrop2');
    var modal = bootstrap.Modal.getOrCreateInstance(myModal);
    modal.show();
}


function updateProduct(){
    const data = {
        name : document.getElementById('modal_name').value,
        code : document.getElementById('modal_pcode').value,
        price: document.getElementById('modal_price').value,
        dateofwithdrawl: document.getElementById('modal_dow').value,
        category: document.getElementById('modal_category').value,
        photo : document.getElementById('modal_pphoto').value,
        available: document.getElementById('modal_available').value
    };
    let pid = document.getElementById('modal_id').value;
    fetch(`http://127.0.0.1/seller/products/${pid}/update`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }).then((res)=>{
        $("#alert1").hide().show('medium');
        setTimeout(function(){$("#alert1").hide()},2000);
        loadProducts();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function addProduct(){
    const data = {
        name : document.getElementById('modal2_name').value,
        code : document.getElementById('modal2_pcode').value,
        price: document.getElementById('modal2_price').value,
        dateofwithdrawl: document.getElementById('modal2_dow').value,
        category: document.getElementById('modal2_category').value,
        photo : document.getElementById('modal2_pphoto').value,
        available: document.getElementById('modal2_available').value
    };
    fetch(`http://127.0.0.1/seller/products/add`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((res) => {
        $("#alert4").hide().show('medium');
        setTimeout(function(){$("#alert4").hide()},2000);
        loadProducts();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
