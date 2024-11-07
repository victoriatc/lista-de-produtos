async function getApi() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const list = document.querySelector('#products-list')
            
            data.map((item) => {
                const li = document.createElement('li')

                li.setAttribute('id', item.id)

                const title = document.createElement('h3')
                title.innerHTML = item.title

                const image = document.createElement('img')
                image.setAttribute('src', item.image)
                image.setAttribute('alt', item.title)
                image.style.width = '100px'

                const price = document.createElement('p')
                price.innerHTML = `price: $${item.price}`
                
                li.appendChild(title)
                li.appendChild(image)
                li.appendChild(price)

                list.appendChild(li)

            })
        })
      
    }
       
getApi()  



