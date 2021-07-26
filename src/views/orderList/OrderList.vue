<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div class="order" v-for="item in list" :key="item.shopId">
                <div class="order__title">
                    {{ item.shopName }}
                    <span class="order__status">{{
                        item.isCanceled ? "Canceled" : "Valid"
                    }}</span>
                </div>
                <div class="order__content">
                    <div
                        class="order__content__imgs"
                        v-for="(innerItem, index) in item.products"
                        :key="index"
                    >
                        <img
                            class="order__content__img"
                            :src="innerItem.product.img"
                            v-if="index <= 3"
                        />
                    </div>
                    <div class="order__info">
                        <div class="order__info__price">¥a</div>
                        <div class="order__info__count">共b件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2" />
</template>

<script>
import Docker from "../../components/Docker";
import { get } from "../../utils/request";
import { reactive, toRefs } from "vue";
const useOrderListEffect = () => {
    const data = reactive({ list: [] });
    const getNearbyList = async () => {
        const result = await get("/api/order");
        if (result?.errno === 0 && result?.data?.length) {
            const orderList = result.data;
            // order
            orderList.forEach((order) => {
                const products = order.products || [];
                let totalPrice = 0;
                let totalNumber = 0;
                // products list
                products.forEach((productItem) => {
                    console.log(productItem?.orderSales);
                    totalNumber += productItem?.orderSales || 0;
                    totalPrice +=
                        productItem?.product?.price * productItem?.orderSales ||
                        0;
                });
                order.totalPrice = totalPrice;
                order.totalNumber = totalNumber;
            });
            data.list = result.data;
        }
    };
    getNearbyList();
    const { list } = toRefs(data);
    return { list };
};
// const useOrderListEffect = () => {
//     const data = reactive({ list: [] });
//     // add a data for export purpose coz it is outside the get method.
//     const getNearbyList = async () => {
//         const result = await get("/api/order");
//         if (result?.errno === 0 && result?.data?.length) {
//             let orderList = result?.data;
//             // each order in different store
//             orderList.forEach((item) => {
//                 let price = 0;
//                 let number = 0;
//                 // product list
//                 const products = item?.products || [];
//                 // each product
//                 products.forEach((productItem) => {
//                     console.log(productItem?.product?.sales);
//                     price +=
//                         productItem?.product?.price *
//                         productItem?.product?.sales;
//                     number += productItem?.product?.sales;
//                 });
//                 item.totalPrice = price;
//                 item.totalNumber = number;
//             });
//             data.list = list;
//         }
//     };
//     getNearbyList();
//     const { list } = toRefs(data);
//     return { list };
// };
export default {
    name: "OrderList",
    components: { Docker },

    setup() {
        const { list } = useOrderListEffect();
        console.log(list.value);
        return { list };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 5rem;
    right: 0;
    background: #eee;
}
.title {
    line-height: 4.4rem;
    background: #fff;
    font-size: 1.6rem;
    color: #333;
    text-align: center;
}
.order {
    margin: 1.6rem 1.8rem;
    padding: 1.6rem;
    background: $bgColor;
    &__title {
        margin-bottom: 1.6rem;
        line-height: 2.2rem;
        font-size: 1.6rem;
        color: $content-font-color;
    }
    &__status {
        float: right;
        font-size: 1.4rem;
        color: $light-fontColor;
    }
    &__content {
        display: flex;
        &__imgs {
            flex: 1;
            display: flex;
        }
        &__img {
            width: 4rem;
            height: 4rem;
            margin-right: 1.2rem;
        }
        &__price {
            margin-bottom: 0.4rem;
            line-height: 2rem;
            font-size: 1.4rem;
            color: $hightlight-fontColor;
            text-align: right;
        }
        &__count {
            line-height: 1.4rem;
            font-size: 1.2rem;
            color: $content-font-color;
            text-align: right;
        }
    }
}
</style>
