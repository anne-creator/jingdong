<template>
    <div class="order">
        <div class="order__price">
            Total Price <b>¥&nbsp;&nbsp;{{ calculations.price }}</b>
        </div>
        <div class="order__btn" @click="() => handleShowConfirmChange(true)">
            Submit Order
        </div>
    </div>
    <div
        class="mask"
        v-show="showConfirm"
        @click="() => handleShowConfirmChange(false)"
    >
        <div
            class="mask__close iconfont"
            @click="() => handleShowConfirmChange(false)"
        >
            &#xe747;
        </div>
        <div class="mask__content">
            <h3 class="mask__content__title">确认要离开收银台？</h3>
            <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
            <div class="mask__content__btns">
                <div
                    class="mask__content__btn mask__content__btn--first"
                    @click="() => handleConfirmOrder(true)"
                >
                    取消订单
                </div>
                <div
                    class="mask__content__btn mask__content__btn--last"
                    @click="() => handleConfirmOrder(false)"
                >
                    确认支付
                </div>
            </div>
        </div>
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { useCommonCartEffect } from "../../effect/cartEffect.js";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
    name: "Order",
    components: { Toast },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const shopId = route.params.id;
        const { productList, shopName, calculations } =
            useCommonCartEffect(shopId);
        const { useToast, showToast, toastMessage } = useToastEffect();
        const store = useStore();
        const handleConfirmOrder = async (isCanceled) => {
            // get productList
            const products = [];
            for (let item in productList.value) {
                const product = productList.value[item];
                products.push({
                    id: parseInt(product._id, 10),
                    num: product.count,
                });
            }
            // get api usign get method with params: addressID, shpId, shopname, isCanceled, and products
            try {
                const result = await post("/api/order", {
                    addressId: 1,
                    shopId,
                    shopName: shopName.value,
                    isCanceled,
                    products,
                });
                // if sucessed, jump to home
                if (result?.errno === 0) {
                    store.commit("clearCartData", shopId);
                    router.push({ name: "Home" });
                } else {
                    useToast("Failed to connect");
                }
            } catch (e) {
                useToast("Failed creating order");
            }
        };
        const showConfirm = ref(false);
        const handleShowConfirmChange = (status) => {
            showConfirm.value = status;
        };
        return {
            calculations,
            handleConfirmOrder,
            showToast,
            toastMessage,
            handleShowConfirmChange,
            showConfirm,
        };
    },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";
.order {
    position: fixed;
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
.mask {
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    &__close {
        color: #fff;
        z-index: 2;
        padding: 0.5rem 0.6rem;
        background: rgba(46, 46, 46, 0.3);
        border-radius: 50%;
        margin-left: 24rem;
        margin-bottom: 10rem;
    }
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30rem;
        height: 15.6rem;
        background: #fff;
        text-align: center;
        border-radius: 0.4rem;

        &__title {
            margin: 2.4rem 0 0 0;
            line-height: 2.6rem;
            font-size: 1.8rem;
            color: #333;
        }
        &__desc {
            margin: 0.8rem 0 0 0;
            font-size: 1.4rem;
            color: #666666;
        }
        &__btns {
            display: flex;
            margin: 2.4rem 5.8rem;
        }
        &__btn {
            flex: 1;
            width: 8rem;
            line-height: 3.2rem;
            border-radius: 1.6rem;
            font-size: 1.4rem;
            &--first {
                margin-right: 1.2rem;
                border: 0.1rem solid #4fb0f9;
                color: #4fb0f9;
            }
            &--last {
                margin-left: 1.2rem;
                background: #4fb0f9;
                color: #fff;
            }
        }
    }
}
</style>
