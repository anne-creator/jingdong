<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back icon-arrow-left"></div>
                Order Confirmation
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">Address</div>
                <div class="top__receiver__address">
                    Ripplewood Cres. Kitchener, Ontario, Canada
                </div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">Anne</span>
                    <span class="top__receiver__info__name">226-504-5355</span>
                </div>
                <div class="iconfont top__receiver__icon">&#xe743;</div>
            </div>
        </div>
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
        <div class="order">
            <div class="order__price">实付金额 <b>¥0</b></div>
            <div class="order__btn">提交订单</div>
        </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effect/cartEffect.js";
export default {
    name: "OrderConfirmation",
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
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $content-bg;
}
.top {
    position: relative;
    height: 15.9rem;
    background-size: 100% 15.9rem;
    background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
    );
    background-repeat: no-repeat;

    &__header {
        position: relative;
        padding-top: 2.6rem;
        line-height: 2.4rem;
        color: #fff;
        text-align: center;
        font-size: 1.6rem;
        &__back {
            position: absolute;
            font-size: 4.2rem;
            left: 0.8rem;
        }
    }
    &__receiver {
        position: absolute;
        left: 1.8rem;
        right: 1.8rem;
        bottom: 0;
        top: 8.5rem;
        height: 11.1rem;
        background: #fff;
        border-radius: 0.4rem;
        &__title {
            line-height: 2.2rem;
            padding: 1.6rem 0 1.4rem 1.6rem;
            font-size: 1.6rem;
            color: #333;
        }
        &__address {
            line-height: 2rem;
            padding: 0 4rem 0 1.6rem;
            font-size: 1.4rem;
            color: #333;
        }
        &__info {
            padding: 0.6rem 0 0 1.6rem;
            &__name {
                margin-right: 0.6rem;
                line-height: 1.8rem;
                font-size: 1.2rem;
                color: #666;
            }
        }
        &__icon {
            transform: rotate(180deg);
            position: absolute;
            right: 1.6rem;
            top: 5rem;
            color: $medium-fontColor;
            font-size: 3.4rem;
        }
    }
}
.products {
    margin: 5.3rem 1.8rem 5.5rem 1.8rem;
    background: #fff;
    &__title {
        padding: 1.6rem 1.6rem 0 1.6rem;
        font-size: 1.6rem;
        color: #333;
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
.order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 4.9rem;
    line-height: 4.9rem;
    background: #fff;
    &__price {
        flex: 1;
        text-indent: 2.4rem;
        font-size: 1.4rem;
        color: #333;
    }
    &__btn {
        width: 9.8rem;
        background: #4fb0f9;
        color: #fff;
        text-align: center;
        font-size: 1.4rem;
    }
}
</style>
