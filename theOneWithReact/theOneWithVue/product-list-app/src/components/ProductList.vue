<template>
    <div>
        <h2>Search</h2>
        <div>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Enter search term"
        />
        <p v-if="loading">Loading...</p>
        </div>
        <br />
        <br />
        <br />
        <h2>Product List</h2>
        <div class="product-list">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                @add-to-cart="handleAddToCart"
            />
        </div>
        <div v-if="cart.length > 0">
            <h2>Cart {{ cart.length }}</h2>
            <ul>
                <li v-for="item in cart" :key="item.id">
                    <div v-if="containsItem(item, searchQuery)">
                    {{ item.name }} - ${{ item.price }}
                    <button @click="remove(index)">X</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
    components: {
        ProductCard,
    },
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Laptop',
                    price: 999,
                    imageUrl: 'https://via.placeholder.com/150',
                },
                {
                    id: 2,
                    name: 'Smartphone',
                    price: 699,
                    imageUrl: 'https://via.placeholder.com/150',
                },
                {
                    id: 3,
                    name: 'Tablet',
                    price: 399,
                    imageUrl: 'https://via.placeholder.com/150',
                },
            ],
            cart: [],
            searchQuery: '', //Search
            searchResults: ['apple', 'pear'], //Search
            loading: false, //Search
            error: null, //Search
        };
    },
    methods: {
        handleAddToCart(product) {
            this.cart.push(product);
        },
        remove(productIndex) {
            this.cart.splice(productIndex, 1);
        },
        containsItem(item, search) {
            
            if(item.name.toLowerCase().includes(search.toLowerCase()))
            {
                console.log("product.name.contains(search) == true")
                return true;
            }
            return false;
            /*
            console.log("Contains Item");
            console.log(item)
            console.log(search)
            console.log(this.searchResults.some((search) => this.products.includes(search)));
            for(let product of this.products)
            {
                if(product.name.toLowerCase().includes(search.toLowerCase()))
                {
                    console.log("product.name.contains(search) == true")
                    return true;
                }
            }
            return false;
            //return this.searchResults.some((search) => this.products.includes(search));*/
        },
    },
    watch: {
        searchQuery(newQuery, oldQuery) {
            //this.cart.filter(result => result.toLowerCase().includes(newQuery.toLowerCase()));
            console.log(oldQuery);

            // Debounce the search to avoid excessive API calls
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                if (newQuery) {
                    this.loading = true;
                    this.error = null;

                    // Simulate an asynchronous API call (replace with your actual API)
                    setTimeout(() => {
                        if (newQuery.toLowerCase() === 'error') {
                            this.error = 'Search failed.';
                            this.loading = false;
                            this.searchResults = [];
                            return;
                        }

                        const results = [
                            this.products[0].name,
                            this.products[1].name,
                            this.products[2].name,
                        ].filter((result) =>
                            result
                                .toLowerCase()
                                .includes(newQuery.toLowerCase()),
                        );
                        
                        console.log(results);
                        
                        for(let product of this.products)
                        {
                            for(let searchResult of results)
                            {
                                if(product.name == searchResult)
                                {
                                    this.searchResults.push(product);
                                }
                             }
                        }
                        
                        console.log(this.searchResults);

                        this.searchResults = results;
                        this.loading = false;
                    }, 500); // Simulate 500ms API delay
                } else {
                    this.searchResults = [];
                }
            }, 300); // Debounce delay of 300ms
        },
    },
};
</script>

<style scoped>
.product-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
