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
    const calculations = computed(() => {
        const productList = cartList[shopId]?.productList || "";
        const result = { total: 0, price: 0, allChecked: true };
        if (productList) {
            for (let i in productList) {
                const product = productList[i];
                result.total += product.count;
            }
        }
        if (productList) {
            for (let i in productList) {
                const product = productList[i];
                if (product.check) {
                    result.price += product.count * product.price;
                }
            }
            result.price = result.price.toFixed(2);
        }
        if (productList) {
            for (let key in productList) {
                if (productList[key].count > 0 && !productList[key].check) {
                    result.allChecked = false;
                }
            }
        }
        return result;
    });
    return {
        productList,
        shopName,
        cartList,
        changeCartItemInfo,
        calculations,
    };
};
