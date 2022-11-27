const API_URL = "http://localhost:3000/"

const API_PATHS = {
	productos: "productos/",
	pedido: "pedido/"
}


const handleError = (error) => {
	alert("Oh! Parece que tenemos un error: " + error)
	console.log("Oh! Parece que tenemos un error: " + error);
}

//Petición GET - Async / Await para traer la info de las Tarjetas desde la API

let data;

const traerProductos = async (path, search = "") => {
	try {
		let response = await fetch(API_URL + path + "?q=" + search)
		return await response.json()

	} catch (error) {
		handleError(error)
	}
}

//Petición GET - Async / Await para traer un solo Id

const traerUnProducto = async (path, id) => {
	try {

		let response = await fetch(API_URL + path + id)
		return await response.json()

	} catch (error) {
		handleError(error);
	}
}

//Petición PATCH - Async / Await para modificar un Producto

const httpPATCH = async (path, newProp, id) => {
	try {

		let response = await fetch(
			API_URL + path + id,
			{
				body: JSON.stringify(newProp),
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		let data = await response.json()
		return data
	} catch (error) {
		handleError(error)
	}
}

//Petición POST - Async / Await para crear un nuevo Producto

const httpPOST = async (path, newObject) => {
	try {

		let response = await fetch(
			API_URL + path,
			{
				body: JSON.stringify(newObject),
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		return await response.json()
	
	} catch (error) {
		handleError(error);
	}
}

//Petición POST - Async / Await para Eliminar un Producto

const httpDELETE = async (path, id) => {
	try {

		let response = await fetch(
			`${API_URL}${path}${id}`,
			{
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		return await response.json()

	} catch (error) {
		handleError(error)
	}
}


// CRUD Productos

const getProducts = async (search) => await traerProductos(API_PATHS.productos, search)
const getOneProduct = async (id) => await traerUnProducto(API_PATHS.productos, id)
const updateProduct = async (id, newProp) => await httpPATCH(API_PATHS.productos, newProp, id)
const deleteProduct = async (id) => await httpDELETE(API_PATHS.productos, id)
const createProduct = async (newProduct) => await httpPOST(API_PATHS.productos, newProduct)


// CRUD Pedidos
const getOrder = async (search) => await traerProductos(API_PATHS.pedido, search)
const newOrder = async (newOrder) => await httpPOST(API_PATHS.pedido, newOrder)
