import { useStore } from "vuex";
import { computed } from "vue";
// * * cart related methods
export const useCommonCartEffect = (shopId) => {
    // get cartList from vuex
    const store = useStore();
    const cartList = store.state.cartList;
    const changeCartItemInfo = (
        shopId,
        shopName,
        productId,
        productInfo,
        num
    ) => {
        // commite addItemToCart method with some params as the second params of the commite method
        store.commit("changeCartItemInfo", {
            shopId,
            shopName,
            productId,
            productInfo,
            num,
        });
    };

    const shopName = computed(() => {
        const shopName = cartList[shopId]?.shopName || "";
        return shopName;
    });

    const productList = computed(() => {
        const productList = cartList[shopId]?.productList || "";
        return productList;
    });
    return { productList, shopName, cartList, changeCartItemInfo };
};
