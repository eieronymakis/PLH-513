fetch('http://127.0.0.1:3000/user/info')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });


let p_container = document.getElementById('product_container');

function loadProducts(){
    fetch('http://127.0.0.1:3000/products/all')
    .then((response) => response.json())
    .then((data) => {
    p_container.innerHTML = '';
    for(let i = 0; i < data.length; i++){
        p_container.innerHTML +=
        `<div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
                <div class="card-body bg-dark" style="border-radius:1rem;">
                <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0" style="display:flex!important;justify-content:center !important;align-items:center!important;">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface product-photo-container">
                            <!--<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" class="bi bi-box" viewBox="0 0 16 16">
                                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                            </svg>-->
                            <img src="${data[i].pphoto}">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                    <h3 class="fw-bold text-light">${data[i].name}</h3>
                    <div class="mt-1 mb-0 text-muted small">
                        <span class="h5 text-warning">Seller : ${data[i].sellername}</span>
                    </div>
                    <div class="mt-1 mb-2 text-muted small">
                        <span class="h5 text-primary">Product Code : ${data[i].pcode}</span>
                    </div>
                    <p class="mb-4 mb-md-0 text-light mt-1">
                        No description yet...
                    </p>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1 text-light">$${data[i].price}</h4>
                        <span class="text-danger"><s></s></span>
                    </div>
                    <h6 class="text-success"></h6>
                    <div class="d-flex flex-column mt-4">
                        <button class="btn btn-primary btn-lg" type="button">Details</button>
                        <button class="btn text-light  bg-success btn-lg mt-2" type="button">
                            Add to Cart
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`
    }
    });
}
