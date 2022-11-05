function loadProducts(){
    let table = document.getElementById('tablebody');
    fetch('http://127.0.0.1:3000/seller/products')
    .then((response) => response.json())
    .then((data) => {
        table.innerHTML = '';
        for(let i = 0; i < data.length; i++){
            table.innerHTML+=
            `<tr>
                <th scope="row">${data[i].id}</th>
                <td>${data[i].name}</td>
                <td>${data[i].pcode}</td>
                <td>${data[i].price}</td>
                <td>${data[i].dateofwithdrawl}</td>
                <td>${data[i].category}</td>
                <td>${data[i].pphoto}</td>
                <td><button class="btn btn-success" onclick=showModal(${data[i].id})>Change</button></td>
                <td><button class="btn btn-danger" onclick=deleteProduct(${data[i].id})>Delete</button></td>
            </tr>`
        }
    });
}

function removeItem(pid){
    fetch(`http://127.0.0.1:3000/seller/products/${pid}/delete`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    loadProducts();
}



function showModal(pid){
    var myModal = document.getElementById('staticBackdrop');
    var modal = bootstrap.Modal.getOrCreateInstance(myModal);
    fetch(`http://127.0.0.1:3000/seller/products/${pid}/info`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('modal_id').value = data[0].id
        document.getElementById('modal_name').value = data[0].name;
        document.getElementById('modal_pcode').value = data[0].pcode;
        document.getElementById('modal_price').value = data[0].price;
        document.getElementById('modal_dow').value = data[0].dateofwithdrawl;
        document.getElementById('modal_sname').value = data[0].sellername;
        document.getElementById('modal_category').value = data[0].category;
        document.getElementById('modal_pphoto').value = data[0].pphoto;
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
        pcode : document.getElementById('modal_pcode').value,
        price: document.getElementById('modal_price').value,
        dow: document.getElementById('modal_dow').value,
        sname : document.getElementById('modal_sname').value,
        category: document.getElementById('modal_category').value,
        pphoto : document.getElementById('modal_pphoto').value
    };
    fetch(`http://127.0.0.1:3000/seller/products/${document.getElementById('modal_id').value}/update`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function addProduct(){
    const data = {
        name : document.getElementById('modal2_name').value,
        pcode : document.getElementById('modal2_pcode').value,
        price: document.getElementById('modal2_price').value,
        dow: document.getElementById('modal2_dow').value,
        category: document.getElementById('modal2_category').value,
        pphoto : document.getElementById('modal2_pphoto').value
    };
    fetch(`http://127.0.0.1:3000/seller/products/add`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
