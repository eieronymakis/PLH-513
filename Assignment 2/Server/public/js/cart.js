
let url = 'http://35.226.48.88';

fetch(`${url}/user/info`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });
  
let p_container = document.getElementById('product_container');
let cart_count = document.getElementById('cart_item_count');
let cart_cost = document.getElementById('total_cost');

function loadCart(){
    fetch(`${url}/cart/items`)
    .then((response) => response.json())
    .then((data) => {
        p_container.innerHTML = '';
        cart_count.innerHTML = `(${data.length} item(s) in your cart)`;
        let cost = 0.0;
        for(let i = 0; i < data.length; i++){
            cost += parseFloat(data[i].description.price);
            p_container.innerHTML +=
            `<div class="card mb-4">
                <div class="card-body p-4 bg-dark">
                    <div class="row align-items-center">
                        <div class="col-md-2" style="display:flex; justify-content:center; align-items:center;">
                            <img src="${data[i].description.photo}" style="max-height:150px; max-width:150px;" class="img-fluid" alt="Generic placeholder image">
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted text-light mb-4 pb-2">Name</p>
                            <p class="lead fw-normal mb-0 text-light">${data[i].description.name}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted text-light mb-4 pb-2">Quantity</p>
                            <p class="lead fw-normal mb-0 text-light">1</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted text-light mb-4 pb-2">Price</p>
                            <p class="lead fw-normal text-light mb-0">$${data[i].description.price}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted text-light mb-4 pb-2">Insertion Date</p>
                            <p class="lead fw-normal text-light mb-0">${(data[i].doi).split('T')[0]}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                                <button onclick="removeItem('${data[i]._id}')" type="button" class="btn btn-lg text-light" style="background:transparent !important; border: 1px solid white;">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        cart_cost.innerHTML = parseFloat(cost).toFixed(2)+"$";
    })
    .catch((error) => {
        console.log('Error:', error);
    });
}

function removeItem(id){
    fetch(`${url}/cart/items/${id}/remove`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then( () => {
        $("#alert1").hide().show('medium');
        setTimeout(function(){$("#alert1").hide()},2000);
        loadCart();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
