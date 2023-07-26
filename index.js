const main = document.getElementById("prices")

// FUNCTION TO CREATE THE ELEMENTS WITH PURE JAVASCRIPT
const createDiv = (name , priceS , priceB) => {
    const div = document.createElement("div")
    const h2N = document.createElement("h2")
    const contP = document.createElement("div")
    const h3S = document.createElement("h3")
    const h3B = document.createElement("h3")

    h2N.textContent = name
    h3S.textContent = `Venta: ${priceB}`
    h3B.textContent = `Compra: ${priceS}`

    div.classList.add("contenedor")
    h2N.classList.add("name")
    contP.classList.add("prices-cont")
    h3S.classList.add("price-sell")
    h3B.classList.add("price-buy")

    contP.appendChild(h3S)
    contP.appendChild(h3B)
    div.appendChild(h2N)
    div.appendChild(contP)

    main.appendChild(div)
}

// FETCH TO THE API
fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
.then(response => response.json())
.then(data => 
    data.forEach(item => {
        createDiv(item.casa.nombre , item.casa.venta , item.casa.compra)
    })
)
.catch(error => {
    console.log("Error when the program call the API" + error)
})

/* CALCULATOR FOR ALL THE DOLLARS OF THE API
const calculatePrice = (amountInPesos) => {
    // Clear previous prices from the screen
    const previousPrices = document.querySelectorAll(".paraPrueba");
    previousPrices.forEach(price => price.remove());

    const cards = document.querySelectorAll(".contenedor");
    cards.forEach(card => {
        const priceBuyElement = card.querySelector(".price-buy");
        const name = card.querySelector(".name");
        if (priceBuyElement) {
            const prices = document.getElementById("pricesTwo")
            const priceBuy = parseFloat(priceBuyElement.textContent.replace("Compra: ", ""));
            const calculatedPrice = amountInPesos / priceBuy;

            // Create a new element to display the calculated price
            const calculatedPriceElement = document.createElement("p");
            calculatedPriceElement.textContent = `$${amountInPesos} Pesos = $${calculatedPrice.toFixed(2)} ${name.textContent}`;
            calculatedPriceElement.classList.add("paraPrueba");
            prices.appendChild(calculatedPriceElement);
        }
    });
} */

// CALCULATOR FOR JUST DOLLAR BLUE AND OFICIAL
const calculatePrice = (amountInPesos) => {
    // Clear previous prices from the screen
    const previousPrices = document.querySelectorAll(".pricesTwo-text")
    previousPrices.forEach(price => price.remove())

    const cards = document.querySelectorAll(".contenedor")
    let containersProcessed = 0

    cards.forEach(card => {
        const priceBuyElement = card.querySelector(".price-buy")
        const name = card.querySelector(".name")
        
        if (priceBuyElement && containersProcessed < 2) {
            const prices = document.getElementById("pricesTwo")
            const priceBuy = parseFloat(priceBuyElement.textContent.replace("Compra: ", ""))
            const calculatedPrice = amountInPesos / priceBuy

            const calculatedPriceElement = document.createElement("p")
            calculatedPriceElement.textContent = `$${amountInPesos} Pesos = $${calculatedPrice.toFixed(2)} ${name.textContent}`
            calculatedPriceElement.classList.add("pricesTwo-text")
            prices.appendChild(calculatedPriceElement)

            containersProcessed++
        }
    })
}

// EVENT LISTENER TO EXECUTE THE calculatePrice FUNCTION
const calculateButton = document.getElementById("calculateButton")
calculateButton.addEventListener("click", () => {
    const pesosInput = document.getElementById("pesosInput")
    const amountInPesos = parseFloat(pesosInput.value)
    if (!isNaN(amountInPesos)) {
        calculatePrice(amountInPesos)
    } else {
        console.log("Invalid input. Please enter a valid numeric amount in Pesos.")
    }
})