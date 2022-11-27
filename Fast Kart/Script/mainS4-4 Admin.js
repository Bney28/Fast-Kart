console.log("Buenas desde el Admin");

// Para ejecutar la página web correctamente, primero cargar el API en la terminal

// Función para Crear Tarjetas en el Admin

let tarjetas = document.querySelector("#mainAdmin")

const crearTarjetas = async (e, div) => {

	div.innerHTML += `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${e.image}" class="img-fluid rounded-start" alt="Product-image">
            </div>

            <div class="col-md-4">
                <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">Categoría:${e.description} <br> ${e.grams}</p>
                </div>
            </div>

			<div class="col-md-2">
                <div class="card-body">
                <h5 class="card-title">Category</h5>
                <p class="card-text">${e.category}</p>
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
                <h5 class="card-title">Acciones</h5>
                <p class="card-text remove" onclick="deleteProduct(${e.id})">Remove</p>
				<a href="#editForm"><p class="card-text edit" onclick="editar(${e.id})">Edit</p></a>
                </div>
            </div>

        </div>
    `
}


//Invocar la función para Imprimir las Tarjetas

let _data;

const imprimirTarjetas = async (search) => {
	tarjetas.innerHTML = ""

	_data = await getProducts(search)

	_data.forEach(producto => {
		crearTarjetas(producto, tarjetas)
	})
	return _data
}

imprimirTarjetas()


// Función para Ingresar Nuevos Productos

const ingresar = async () =>{
    
    let newName = document.querySelector("#inputName").value
    let newCategory = document.querySelector("#inputState").value
    let newContent = document.querySelector("#inputContent").value
    let newPrice = document.querySelector("#inputPrice").value
    let newDescription = document.querySelector("#inputDescription").value
    let newImage = document.querySelector("#inputImage").value

    const newProduct = {
        image: newImage,
        category: newCategory,
        name: newName,
        description: newDescription,
        grams: newContent,
        price: newPrice,
        quantity: 0
    }

    console.log(newProduct);
    await createProduct(newProduct)
    return newProduct
}

const btnIngresar = document.querySelector("#btnIngresar")
btnIngresar.addEventListener("click", async () =>{
    ingresar()
})


// Función para Editar Productos

const editar = async (id) =>{

    const mostrarInfo = await getOneProduct(id)
    
    document.querySelector("#editId").value = mostrarInfo.id
    document.querySelector("#editName").value = mostrarInfo.name
    document.querySelector("#editState").value = mostrarInfo.category
    document.querySelector("#editContent").value = mostrarInfo.grams
    document.querySelector("#editPrice").value = mostrarInfo.price
    document.querySelector("#editDescription").value = mostrarInfo.description
    document.querySelector("#editImage").value = mostrarInfo.image
}

const btnEditar = document.querySelector("#btnEditar")
btnEditar.addEventListener("click", async () =>{

    let editId = document.querySelector("#editId").value
    let editName = document.querySelector("#editName").value
    let editCategory = document.querySelector("#editState").value
    let editContent = document.querySelector("#editContent").value
    let editPrice = document.querySelector("#editPrice").value
    let editDescription = document.querySelector("#editDescription").value
    let editImage = document.querySelector("#editImage").value


    const productEdit = {
        id: editId,
        image: editImage,
        category: editCategory,
        name: editName,
        description: editDescription,
        grams: editContent,
        price: editPrice,
        quantity: 0
    }

    console.log(editId, productEdit);
    await updateProduct(editId, productEdit)
    location.reload()
    return productEdit

})


// Función para Eliminar Productos

const eliminar = (id) => {
    deleteProduct(id)
    alert("Este producto ha sido Eliminado")
    location.reload()
}


// Función para Ver los Nuevos Pedidos

let tablas = document.querySelector("#mainOrder")

const crearTabla = async (e, div) => {

	div.innerHTML += `
    <tr>
        <th scope="row">${e.id}</th>
        <td>${e.name}</td>
        <td>${e.address}</td>
        <td>${e.phone}</td>
        <td>$${e.total} COP</td>
    </tr>
    `
}


//Invocar la función para Mostrar los Pedidos

let table;

const mostrarInfo = async (search) => {
	tablas.innerHTML = ""

	table = await getOrder(search)

	table.forEach(order => {
		crearTabla(order, tablas)
	})
	return table
}

mostrarInfo()
