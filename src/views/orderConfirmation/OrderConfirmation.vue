<template>
    <div class="wrapper">
        <TopArea />
        <ProductList />
        <Order />
    </div>
</template>

<script>
import TopArea from "./TopArea";
import ProductList from "./ProductList";
import Order from "./Order";
export default {
    name: "OrderConfirmation",
    components: { TopArea, ProductList, Order },
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
.wrapper {
    background-color: $content-bg;
    overflow: hidden;
    height: 100vh;
}
</style>
