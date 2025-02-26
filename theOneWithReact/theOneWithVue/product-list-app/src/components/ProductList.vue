<template>
  <div>
    <h2>Search</h2>
    <input type="text" v-model="searchQuery" placeholder="Enter search term" />
    <br>
    <br>
    <br>
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
      <h2>Cart {{cart.length}}</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - ${{ item.price }} 
          <button @click="remove(index)">X</button>
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
        { id: 1, name: 'Laptop', price: 999, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Smartphone', price: 699, imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Tablet', price: 399, imageUrl: 'https://via.placeholder.com/150' },
      ],
      cart: [],
      searchQuery: '',	                //Search
      searchResults: ["apple", "pear"], //Search
      loading: false, 	                //Search
      error: null,		                //Search
    };
  },
  methods: {
    handleAddToCart(product) {
      this.cart.push(product);
    },
    remove(productIndex) {
      this.cart.splice(productIndex, 1)
    }
  },
  watch: {
    searchQuery(newQuery, oldQuery) {
        //this.cart.filter(result => result.toLowerCase().includes(newQuery.toLowerCase()));
        //console.log(oldQuery);
        
        
        
        
    }
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
