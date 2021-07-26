<template>
    <div
        class="mask"
        v-if="showCart && calculations.total > 0"
        @click="handleCartShowChange"
    />
    <div class="cart">
        <div class="product" v-if="showCart && calculations.total > 0">
            <div class="product__header">
                <div class="product__header__all">
                    <span
                        class="product__header__checkedIcon iconfont"
                        v-if="calculations.allChecked"
                        @click="
                            () =>
                                changeSelectAllCheckedState(
                                    shopId,
                                    calculations.allChecked
                                )
                        "
                        >&#xe605;</span
                    >
                    <span
                        class="product__header__uncheckedIcon iconfont"
                        v-else
                        @click="
                            () =>
                                changeSelectAllCheckedState(
                                    shopId,
                                    calculations.allChecked
                                )
                        "
                        >&#xe66e;</span
                    >
                    Select All
                </div>
                <div
                    class="product__header__clear"
                    @click="() => clearCartProduct(shopId)"
                >
                    Clear Cart
                </div>
            </div>
            <template v-for="item in productList" :key="item._id">
                <div class="product__item" v-if="item.count > 0">
                    <div
                        class="product__item__checked iconfont"
                        v-if="item.check"
                        @click="() => changeCartItemChecked(shopId, item._id)"
                    >
                        &#xe605;
                    </div>
                    <div
                        class="product__item__unchecked iconfont"
                        v-else
                        @click="() => changeCartItemChecked(shopId, item._id)"
                    >
                        &#xe66e;
                    </div>
                    <img class="product__item__img" :src="item.imgUrl" />
                    <div class="product__item__detail">
                        <h4 class="product__item__title">
                            {{ item.name }}
                        </h4>
                        <p class="product__item__price">
                            <span class="product__item__yen">&yen;</span
                            >{{ item.price }}
                            <span class="product__item__origin"
                                >&yen;{{ item.oldPrice }}</span
                            >
                        </p>
                    </div>
                    <div class="product__number">
                        <span
                            class="product__number__minus"
                            @click="
                                () => {
                                    changeCartItemInfo(
                                        shopId,
                                        shopName,
                                        item._id,
                                        item,
                                        -1
                                    );
                                }
                            "
                            >-</span
                        >
                        {{ item.count }}
                        <span
                            class="product__number__plus"
                            @click="
                                () => {
                                    changeCartItemInfo(
                                        shopId,
                                        shopName,
                                        item._id,
                                        item,
                                        1
                                    );
                                }
                            "
                            >+</span
                        >
                    </div>
                </div>
            </template>
        </div>
        <div class="check">
            <div class="check__icon">
                <img
                    src="http://www.dell-lee.com/imgs/vue3/basket.png"
                    class="check__icon__img"
                    @click="handleCartShowChange"
                />
                <div class="check__icon__tag">{{ calculations.total }}</div>
            </div>
            <div class="check__info">
                Total：<span class="check__info__price"
                    >&yen; {{ calculations.price }}</span
                >
            </div>
            <div class="check__btn" v-show="calculations.total">
                <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
                    Check Out
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCommonCartEffect } from "../../effect/cartEffect";
import { ref } from "vue";
const useCartEffect = (shopId) => {
    const { calculations, productList, changeCartItemInfo } =
        useCommonCartEffect(shopId);
    const store = useStore();

    function changeSelectAllCheckedState(shopId, allChecked) {
        store.commit("changeSelectAllCheckedState", { shopId, allChecked });
    }

    const changeCartItemChecked = (shopId, productId) => {
        store.commit("changeCartItemChecked", { shopId, productId });
    };

    const clearCartProduct = (shopId) => {
        store.commit("clearCartProduct", { shopId });
    };

    return {
        calculations,
        productList,
        changeCartItemInfo,
        changeCartItemChecked,
        clearCartProduct,
        changeSelectAllCheckedState,
    };
};
const toggleCartEffect = () => {
    let showCart = ref(false);
    // when clicked, showCart function change
    const handleCartShowChange = () => {
        showCart.value = !showCart.value;
        return showCart;
    };
    return { showCart, handleCartShowChange };
};
export default {
    name: "Cart",
    setup() {
        const route = useRoute();
        const shopId = route.params.id;
        const {
            calculations,
            productList,
            cartList,
            changeCartItemInfo,
            changeCartItemChecked,
            clearCartProduct,
            changeSelectAllCheckedState,
        } = useCartEffect(shopId);
        const { showCart, handleCartShowChange } = toggleCartEffect();
        return {
            calculations,
            shopId,
            cartList,
            productList,
            changeCartItemInfo,
            changeCartItemChecked,
            clearCartProduct,
            changeSelectAllCheckedState,
            handleCartShowChange,
            showCart,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}
.product {
    overflow-y: scroll;
    flex: 1;
    background: $content-bg;
    &__header {
        display: flex;
        justify-content: space-between;
        line-height: 5.2rem;
        border-bottom: 0.1rem solid #f1f1f1;
        font-size: 1.4rem;
        color: #333;
        &__all {
            min-width: 6.4rem;
            margin-left: 1.8rem;
        }
        &__uncheckedIcon,
        &__checkedIcon {
            display: inline-block;
            color: $light-fontColor;
            font-size: 2rem;
        }
        &__checkedIcon {
            color: $btn-bgColor;
        }
        &__clear {
            margin-right: 1.6rem;
            text-align: right;
        }
    }
    &__item {
        position: relative;
        display: flex;
        padding: 1.2rem 0;
        margin: 0 1.6rem;
        border-bottom: 0.1rem solid $content-bg;
        &__checked,
        &__unchecked {
            line-height: 5rem;
            margin-right: 2rem;
            color: $light-fontColor;
            font-size: 2.5rem;
            padding: 0.5rem;
        }
        &__checked {
            color: $btn-bgColor;
        }
        &__detail {
            overflow: hidden;
        }
        &__img {
            width: 4.6rem;
            height: 4.6rem;
            margin-right: 1.6rem;
        }
        &__title {
            margin: 0;
            line-height: 2rem;
            font-size: 1.4rem;
            color: $content-font-color;
            @include ellipsis;
        }
        &__price {
            margin: 0.6rem 0 0 0;
            line-height: 2rem;
            font-size: 1.4rem;
            color: $hightlight-fontColor;
        }
        &__yen {
            font-size: 1.2rem;
        }
        &__origin {
            margin-left: 0.6rem;
            line-height: 2rem;
            font-size: 1.2rem;
            color: $light-fontColor;
            text-decoration: line-through;
        }
        .product__number {
            position: absolute;
            right: 0;
            bottom: 1.2rem;
            &__minus,
            &__plus {
                display: inline-block;
                width: 2rem;
                height: 2rem;
                line-height: 1.6rem;
                border-radius: 50%;
                font-size: 2rem;
                text-align: center;
            }
            &__minus {
                border: 0.1rem solid $medium-fontColor;
                color: $medium-fontColor;
                margin-right: 0.5rem;
            }
            &__plus {
                background: $btn-bgColor;
                color: $bgColor;
                margin-left: 0.5rem;
            }
        }
    }
}
.check {
    display: flex;
    height: 5rem;
    border-top: 0.1rem solid $content-bg;
    line-height: 5rem;
    background-color: #fff;
    &__icon {
        position: relative;
        width: 8.4rem;

        &__img {
            display: block;
            margin: 1.2rem auto;
            width: 2.8rem;
            height: 2.6rem;
        }
        &__tag {
            position: absolute;
            right: 2rem;
            top: 0.4rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            background-color: $hightlight-fontColor;
            border-radius: 50%;
            font-size: 1.2rem;
            text-align: center;
            color: $bgColor;
            transform: scale(0.5);
        }
    }
    &__info {
        flex: 1;
        color: $content-font-color;
        font-size: 1.6rem;
        &__price {
            line-height: 5rem;
            color: $hightlight-fontColor;
            font-size: 1.8rem;
        }
    }
    a {
        text-decoration: none;
        color: $bgColor;
    }
    &__btn {
        width: 9.8rem;
        background-color: #4fb0f9;
        text-align: center;
        color: $bgColor;
        font-size: 1.4rem;
    }
}
</style>
