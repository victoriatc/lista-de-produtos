async function getApi() {
    const loading = document.querySelector("#loading")
    const errorDiv = document.querySelector("#error")
    const productList = document.querySelector("#products-list")

    loading.style.display = "block"
    productList.style.display = "none"
    errorDiv.style.display = "none"

    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

       
        loading.style.display = "none"
        productList.style.display = "block"

        populateList(data);
    } catch (error) {
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

        const title = document.createElement("h3")
        title.textContent = item.title

        const price = document.createElement("p")
        price.innerHTML = `Price: $${item.price}`

        details.append(title, price)
        li.append(image, details)
        fragment.appendChild(li)
    });

    list.appendChild(fragment)
}

getApi()
