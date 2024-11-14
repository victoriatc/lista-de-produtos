async function getApi() {
    const loading = document.querySelector("#loading")
    const errorDiv = document.querySelector("#error")
    const productList = document.querySelector("#products-list")
    const inputSearch = document.querySelector("#search")

    loading.style.display = "block"
    productList.style.display = "none"
    errorDiv.style.display = "none"

    try {
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        loading.style.display = "none"
        productList.style.display = "block"

        populateList(data)

        //filtro de pesquisa:
        inputSearch.addEventListener("input", () => {
            if (inputSearch.value.length > 2) {
                const filteredData = data.filter(product =>
                    product.title.toLowerCase().includes(inputSearch.value.toLowerCase())
                );
                productList.innerHTML = ""
                populateList(filteredData)
            } else {
                productList.innerHTML = ""
                populateList(data)
            }
        })}
        
        catch (error) {
        loading.style.display = "none"
        errorDiv.style.display = "block"
        errorDiv.textContent = "Failed to load the products."

        console.error("Error fetching data:", error)
    }
}

function populateList(data) {
    const list = document.querySelector("#products-list")
    const fragment = document.createDocumentFragment()

    data.forEach((item) => {
        const li = document.createElement("li")
        li.setAttribute("id", item.id)

        const image = document.createElement("img")
        image.setAttribute("src", item.image)
        image.setAttribute("alt", item.title)
        image.style.width = "100px"

        const details = document.createElement("div")

       
        const titleLink = document.createElement("a")
        titleLink.setAttribute("href", "#")
        titleLink.textContent = item.title
        titleLink.style.textDecoration = "none"
        titleLink.style.color = "black"

        const price = document.createElement("p")
        price.innerHTML = `Price: $${item.price}`

      // checkbox:
        const saveCheckbox = document.createElement("input")
        saveCheckbox.setAttribute("type", "checkbox")
        saveCheckbox.setAttribute("id", `save-${item.id}`)
        saveCheckbox.setAttribute("name", "save")
        saveCheckbox.setAttribute("value", item.id)

        const saveLabel = document.createElement("label")
        saveLabel.setAttribute("for", `save-${item.id}`)
        saveLabel.textContent = " Save in my list"

        
        const addToCartButton = document.createElement("button")
        addToCartButton.textContent = "Add to Cart"


        details.append(titleLink, price, saveCheckbox, saveLabel, addToCartButton)
        li.append(image, details)
        fragment.appendChild(li)

    })

    list.appendChild(fragment)
}

getApi()
