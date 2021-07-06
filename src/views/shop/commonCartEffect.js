import { useStore } from "vuex";
// * * cart related methods
export const useCommonCartEffect = () => {
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
    return { cartList, changeCartItemInfo };
};
