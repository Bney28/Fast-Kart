console.log("Buenas desde Favoritos");

// Para ejecutar la página web correctamente, primero cargar el API en la terminal

// Función para Crear Tarjetas

let tarjetas = document.querySelector("#main")

const crearTarjetas = (e, div) => {
           
        div.innerHTML += `
        <div class="card card-class" style="width: 14rem;">
        <div class="cardsUp">
          <img src="${e.image}" class="card-img-top"
            alt="product-image">
        </div>

        <div class="card-body cardsDown">
          <h5 class="card-text">${e.category}</h5>
          <h3 class="card-title">${e.name}</h3>
          <p class="card-text">${e.description}</p>
          <p class="card-text">${e.grams}</p>
          <h5 class="card-title" id="priceCard">${e.price}</h5>
          <div id="favoritesandcart">
            <button class="btn btn-danger" onclick="addFav(${e.id})"><i class="fa-solid fa-heart"></i></button>
            <button class="btn btn-success" onclick="addCart(${e.id})"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
      </div>
    `
    }

// Función para agregar productos a Favoritos
//Guardar info en el Local Storage para los Favoritos

const addFav = (id) => {

    let localData = localStorage.getItem("favJSON")
    let favsAdd = JSON.parse(localData)

    if (localData == undefined) {
        favsAdd = []
    }

    if (favsAdd.find((producto) => producto.id === id)) {
        localStorage.removeItem("favJSON")
        alert("Este producto ha sido eliminado")
        //Usamos el find para compararlo con el id del click

        let favFilter = favsAdd.filter((producto) => {
            return producto.id !== id
        })

        let favJSON = JSON.stringify(favFilter)
        localStorage.setItem("favJSON", favJSON)

    } else {

        let dataResponse = _data.find((producto) => producto.id === id);

        favsAdd.push(dataResponse)

        let favJSON = JSON.stringify(favsAdd)
        localStorage.setItem("favJSON", favJSON)
        alert("Este producto ha sido agregado exitosamente")
    }
}


//Función para imprimir Tarjetas en Favoritos
const tarjetasFav = document.querySelector("#mainFavs")

const favCards = () =>{
    let localData = localStorage.getItem("favJSON")
    let localCards = JSON.parse(localData)

    if (localCards.length == 0) {
        tarjetasFav.innerHTML = `
        <div class="emptyWishList">
        <h3>Your wishlist is empty</h3>
      </div>
        `
  } else {
        localCards.forEach(product=> {
            crearTarjetas(product, tarjetasFav) 
           
        });
   }
}

favCards()
