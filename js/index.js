// import productos from './productos'
let productos = []
let carrito = []

function start(){
    let renderProductos = '';
    productos&&productos.map(prod => {
        renderProductos += `<div class="producto">
            <img class="producto__img" src="${prod.url}" alt="${prod.name}">
            <div class="producto__informacion">
                <p class="producto__nombre">${prod.name}</p>
                <p class="producto__precio">${prod.price}$</p>
                <img src="https://icongr.am/entypo/shopping-bag.svg?size=29&color=ffce00" alt="" class="botonCarrito" onclick="botonCarrito('Camisa ${prod.name}.',${prod.price})">
            </div>
        </div>`
    })
    document.querySelector('.contenedorProductos').innerHTML = renderProductos;
    document.getElementById('botonPagar').addEventListener("click",(e) => pagar(e), false )
    mostrarProductos();
}

function mostrarProductos(){
    console.log(carrito)
    localStorage.getItem('Carrito')?carrito = JSON.parse(localStorage.getItem('Carrito')):null;
    let texto = '';
    let i = 0;
    for(let p of carrito){
        texto += `<li><div class="contenedorDetalleFactura"><span>${p.name}</span><span>${p.price}$</span><button value="${i++}" class="delete">X</button></div></li>`;
    }
    document.getElementById('ListaProductos').innerHTML = texto;
    let arr = document.querySelectorAll('.delete');
    arr.forEach(elem => {
        elem.addEventListener("click",(e)=>deleteProd(e),true);
    })
}

function deleteProd (e){
    e.preventDefault();
    carrito.splice(e.target.value,1);
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    mostrarProductos();
}


function botonCarrito(nombre, precio){
    carrito.push({name:nombre, price:precio})
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    mostrarProductos();
}

function pagar(e) {
    e.preventDefault()
    if(carrito.length == 0) {
        return Swal.fire('El carrito esta vacio, por favor selecciona que deseas comprar')
    }
    let total = 0;
    let factura = '';
    for(let p of carrito){
        total += p.price
        factura += `${p.name} : ${p.price}$\n`
    }
    Swal.fire({
        title: `
        ${factura}
        El total es de tu compra es: ${total}$
        Gracias por Preferirnos
        `,
        confirmButtonText: 'Ir a Pagar'
    })
    carrito = [];
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    mostrarProductos()
}

async function cargarContenido() {
    try {
        await fetch('js/productos.json')
            .then((resp) => resp.json())
            .then((data) => {
                productos=data
                start();
            })
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
    
}


cargarContenido();
