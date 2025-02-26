<template>
    <div class="product-card">
        <img
            :src="product.imageUrl"
            :alt="product.name"
            class="product-image"
        />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        addToCart(product) {
            this.$emit('add-to-cart', product); // Emit an event to the parent component
        },
    },
};
</script>

<style scoped>
.product-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    width: 200px;
    text-align: center;
}

.product-image {
    max-width: 100%;
    height: auto;
}
</style>
