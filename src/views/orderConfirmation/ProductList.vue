<template>
    <div class="products">
        <div class="products__title">{{ shopName }}</div>
        <div class="products__list">
            <div
                class="products__item"
                v-for="item in productList"
                :key="item._id"
            >
                <img class="products__item__img" :src="item.imgUrl" />
                <div class="products__item__detail">
                    <h4 class="products__item__title">{{ item.name }}</h4>
                    <p class="products__item__price">
                        <span>
                            <span class="products__item__yen">&yen; </span>
                            {{ item.price }} x {{ item.count }}
                        </span>
                        <span class="products__item__total">
                            <span class="products__item__yen">&yen; </span>
                            {{ (item.price * item.count).toFixed(2) }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effect/cartEffect.js";
export default {
    name: "productList",
    setup() {
        const route = useRoute();
        const shopId = route.params.id;
        const { cartList, shopName, productList } = useCommonCartEffect(shopId);
        console.log(cartList);
        return { productList, shopName };
    },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";

.products {
    margin: 0.8rem 1.8rem 5.5rem 1.8rem;
    background: #fff;
    overflow-y: scroll;
    height: 60%;
    &__title {
        padding: 1.6rem 1.6rem 0 1.6rem;
        font-size: 1.6rem;
        color: #333;
    }
    &__list {
    }
    &__item {
        position: relative;
        display: flex;
        padding: 1.6rem;

        &__img {
            width: 4.6rem;
            height: 4.6rem;
            margin-right: 1.6rem;
        }
        &__detail {
            flex: 1;
        }
        &__title {
            margin: 0;
            line-height: 2rem;
            font-size: 1.4rem;
            color: $content-font-color;
            @include ellipsis;
        }
        &__price {
            display: flex;
            margin: 0.6rem 0 0 0;
            line-height: 2rem;
            font-size: 1.4rem;
            color: $hightlight-fontColor;
        }
        &__total {
            flex: 1;
            text-align: right;
            color: #000;
        }
        &__yen {
            font-size: 1.2rem;
        }
    }
}
</style>
