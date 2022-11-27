console.log("Buenas desde el Carrito");

// Para ejecutar la página web correctamente, primero cargar el API en la terminal

// Función para Crear Tarjetas en el Carrito

let tarjetas = document.querySelector("#main")
let total = 0;

const crearTarjetas = async (e, div) => {
    let allInfo = await getOneProduct(e.id)
    let cantidad = parseInt(allInfo.quantity)
    let subTotal = cantidad * e.price
    total += subTotal 
    document.querySelector("#total").innerHTML = `$${total} COP`

    div.innerHTML += `
        <div class="row g-0">
            <div class="col-md-1">
                <img src="${e.image}" class="img-fluid rounded-start" alt="Product-image">
            </div>

            <div class="col-md-3">
                <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">Categoría: ${e.category} <br> ${e.description} <br> ${e.grams}</p>
                </div>
            </div>
        
            <div class="col-md-2">
                <div class="card-body">
                <h5 class="card-title">Precio</h5>
                <p class="card-text">$${e.price} COP</p>
                </div>
            </div>

            <div class="col-md-2">
                <div class="card-body">
                    <h5 class="card-title">Cantidad</h5>
                    <div class="calculadora">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" onclick="restar(${e.id})">-</button>
                        <input type="text" class="form-control inputQuantity" disabled placeholder="" value="${cantidad}" id="input${e.id}">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" onclick="sumar(${e.id})">+</button>
                    </div>
                </div>
            </div>

            <div class="col-md-2">
                <div class="card-body">
                <h5 class="card-title">Total</h5>
                <p class="card-text" id="subTotal${e.id}">$${subTotal} COP</p>
                </div>
            </div>

            <div class="col-md-2">
                <div class="card-body">
                <h5 class="card-title">Acción</h5>
                <p class="card-text remove" onclick="addCart(${e.id})">Remove</p>
                </div>
            </div>

        </div>
    `
}

// Función para agregar productos al carrito
//Guardar info en el Local Storage para el carrito


const addCart = (id) => {

    let localData = localStorage.getItem("cartJSON")
    let cartsAdd = JSON.parse(localData)

    if (localData == undefined) {
        cartsAdd = []
    }

    if (cartsAdd.find((producto) => producto.id === id)) {
        localStorage.removeItem("cartJSON")
        alert("Este producto ha sido eliminado")
        //Usamos el find para compararlo con el id del click

        let cartFilter = cartsAdd.filter((producto) => {
            return producto.id !== id
        })

        let cartJSON = JSON.stringify(cartFilter)
        localStorage.setItem("cartJSON", cartJSON)

    } else {

        let dataResponse = _data.find((producto) => producto.id === id);

        cartsAdd.push(dataResponse)

        let cartJSON = JSON.stringify(cartsAdd)
        localStorage.setItem("cartJSON", cartJSON)
        alert("Este producto ha sido agregado exitosamente")
    }
}


//Función para imprimir Tarjetas en el Carrito

const tarjetasCart = document.querySelector("#mainCart")

const cartCards = () => {
    let dataCart = localStorage.getItem("cartJSON")
    let localCart = JSON.parse(dataCart)
    console.log(localCart)

    if ( localCart == null || localCart.length == 0) {
        tarjetasCart.innerHTML = `
        <div class="emptyWishList">
        <h3>Your Cart is empty</h3>
      </div>
        `
    } else {
        localCart.forEach(product => {
            crearTarjetas(product, tarjetasCart)

        });
    }

}

cartCards()


//Función Calculadora

document.querySelector("#total").innerHTML = `$${total} COP`

const restar = async (id) => {
    const oneProduct = await getOneProduct(id)

    if (`${oneProduct.quantity}` >= 1) 
        
        {
        let newQuantity = oneProduct.quantity - 1
        updateProduct(id, { quantity: newQuantity })
        console.log("Estoy restando");

        let subT = newQuantity * oneProduct.price

        document.getElementById(`input${oneProduct.id}`).value = newQuantity
        document.getElementById(`subTotal${oneProduct.id}`).innerHTML = `
        $${subT} COP
    `

    total -= parseInt(oneProduct.price)
    document.querySelector("#total").innerHTML = `$${total} COP`

    }

}


const sumar = async (id) => {
    const oneProduct = await getOneProduct(id)

    let newQuantity = oneProduct.quantity + 1
    updateProduct(id, { quantity: newQuantity })
    console.log("Estoy sumando");

    let subT = newQuantity * oneProduct.price


    document.getElementById(`input${oneProduct.id}`).value = newQuantity
    document.getElementById(`subTotal${oneProduct.id}`).innerHTML = `
        $${subT} COP
    
    `
    total += parseInt(oneProduct.price)
    document.querySelector("#total").innerHTML = `$${total} COP`
}


// Función para Guardar los nuevos Pedidos en el JSON Server

const nuevoPedido = async () =>{
    
    let orderName = document.querySelector("#orderName").value
    let orderAddress = document.querySelector("#orderAddress").value
    let orderPhone = document.querySelector("#orderPhone").value
    let orderTotal = `${total}`

    const newOrderInput = {
        name: orderName,
        address: orderAddress,
        phone: orderPhone,
        total: orderTotal
    }

    console.log(newOrderInput);
    /* localStorage.removeItem("cartJSON") */
    await newOrder(newOrderInput)

    return newOrderInput
}


const btnBuyNow = document.querySelector("#btnBuyNow")
btnBuyNow.addEventListener("click", async (e) =>{
    e.preventDefault()
    console.log(nuevoPedido);
    nuevoPedido()

})