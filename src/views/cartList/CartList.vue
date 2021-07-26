<template>
    <div class="cart">作业部分代码，同学尝试实现</div>
    <div class="orders" v-for="(item, index) in cartList" :key="index">
        <div class="order">
            <div class="order__title">
                {{ item.shopName }}
                <span class="order__status">已取消</span>
            </div>
            <div
                class="order__content"
                v-for="(product, index) in item.productList"
                :key="item.productList[index]"
            >
                <div class="order__content__imgs">
                    <img class="order__content__img" src="product.imgUrl" />
                </div>
                <div class="order__info">
                    <div class="order__info__price">¥36.88</div>
                    <div class="order__info__count">共2件</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartList",
};
// import Docker from "../../components/Docker";
// import { useStore } from "vuex";
// const useOrderListEffect = () => {
//     const store = useStore();
//     const cartList = store.state.cartList;
//     return { cartList };
// };
// export default {
//     name: "OrderList",
//     components: { Docker },

//     setup() {
//         const { cartList } = useOrderListEffect();
//         console.log(cartList);
//         return { cartList };
//     },
// };
</script>

<style lang="scss" scoped>
.cart {
    margin-top: 0.2rem;
    text-align: center;
}
</style>
