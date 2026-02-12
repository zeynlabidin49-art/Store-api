const productsDOM = document.querySelector('.products-container')
const searchInput = document.querySelector('.search-input')
const companiesDOM = document.querySelector('.company-btn-container')
const sortInput = document.querySelector('.sort-input')

// Base URL for your API
const url = '/api/v1/products'

const fetchProducts = async () => {
    productsDOM.innerHTML = '<div class="loading"></div>'
    try {
        // Construct URL based on current inputs
        const nameValue = searchInput.value
        const sortValue = sortInput.value
        // We find the active company button (if we had a class for it), 
        // but for now let's just fetch default and let listeners handle params
        
        const params = new URLSearchParams()
        if(nameValue) params.append('name', nameValue)
        if(sortValue) params.append('sort', sortValue)
        
        // Check if a specific company was clicked (handled by event listeners below)
        // For init, we just fetch all.
        
        const resp = await fetch(`${url}?${params.toString()}`)
        const data = await resp.json()
        
        // Handle "No Products Found"
        if (data.products.length < 1) {
            productsDOM.innerHTML = '<h5 class="empty-list">No products matched your search</h5>'
            return
        }
        
        const products = data.products.map((product) => {
            const { name, price, company, featured } = product
            return `<div class="single-product">
                <footer>
                    <h5>${name}</h5>
                    <span class="company">${company}</span>
                    <span class="price">$${price}</span>
                </footer>
            </div>`
        }).join('')
        productsDOM.innerHTML = products
    } catch (error) {
        productsDOM.innerHTML = '<h5 class="error">There was an error</h5>'
    }
}

// Initial Fetch
fetchProducts()

// 1. Search Logic (Debounced slightly for performance)
searchInput.addEventListener('keyup', () => {
    fetchProducts()
})

// 2. Company Filter Logic
companiesDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.classList.contains('company-btn')) {
        const company = el.dataset.id
        
        // Build the specific URL for company
        let query = `${url}?`
        if(company !== 'all') {
            query += `company=${company}&`
        }
        if(searchInput.value) {
            query += `name=${searchInput.value}&`
        }
        if(sortInput.value) {
            query += `sort=${sortInput.value}`
        }

        // Fetch
        try {
            const resp = await fetch(query)
            const data = await resp.json()
             if (data.products.length < 1) {
                productsDOM.innerHTML = '<h5 class="empty-list">No products matched your search</h5>'
                return
            }
            const products = data.products.map((product) => {
                const { name, price, company } = product
                return `<div class="single-product">
                    <footer>
                        <h5>${name}</h5>
                        <span class="company">${company}</span>
                        <span class="price">$${price}</span>
                    </footer>
                </div>`
            }).join('')
            productsDOM.innerHTML = products
        } catch (error) {
            console.log(error)
        }
    }
})

// 3. Sort Logic
sortInput.addEventListener('change', () => {
    fetchProducts() // The main function reads the sort input value automatically
})