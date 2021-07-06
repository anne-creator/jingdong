import { createStore } from "vuex";
const setLocalCartList = (state) => {
    const { cartList } = state;
    const cartListString = JSON.stringify(cartList);
    localStorage.cartList = cartListString;
};

// const getLocalCartList = () => {
//     // { shopId: {shopName:'', productList:{ productId: {} }}}
//     return JSON.parse(localStorage.cartList) || {};
// };

export default createStore({
    state: {
        cartList: {},
        // shopId: {
        //  shopName:'Walmart'
        //  productList:{
        //     productId: {
        //     _id: '1',
        //     name: '番茄250g/份',
        //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
        //     sales: 10,
        //     price: 33.6,
        //     oldPrice: 39.6,
        //     count: 2
        //     },
        //  },
        // },
        // cartList: {},
    },
    mutations: {
        changeCartItemInfo(state, payload) {
            const { shopId, productId, shopName, productInfo, num } = payload;
            // if the cartList is empty, shopInfo will be undefined, so we need to make it ={}
            let shopInfo = state.cartList[shopId] || {
                shopName: "",
                productList: {},
            };
            shopInfo.shopName = shopName;
            // get product from carList
            let product = shopInfo.productList[productId];
            // change product
            if (!product) {
                product = productInfo;
                product.count = 0;
            }
            product.count += num;
            if (num > 0) {
                product.check = true;
            }
            if (product.count < 0) {
                product.count = 0;
            } else if (product.count > 99) {
                product.count = 99;
            }
            // store porduct back into cartList
            shopInfo.productList[productId] = product;
            state.cartList[shopId] = shopInfo;
            // setLocalCartList(state);
            setLocalCartList(state);
        },
        changeCartItemChecked(state, payload) {
            const { shopId, productId } = payload;
            const product = state.cartList[shopId].productList[productId];
            product.check = !product.check;
            // setLocalCartList(state);
        },
        clearCartProduct(state, payload) {
            const { shopId } = payload;
            state.cartList[shopId].productList = {};
            // setLocalCartList(state);
        },
        changeSelectAllCheckedState(state, payload) {
            const { shopId, allChecked } = payload;
            const productList = state.cartList[shopId].productList;
            // if been checked,let it unchecked
            if (productList && allChecked) {
                for (let key in productList) {
                    productList[key].check = false;
                }
            }
            // if  been unchekd,when clicked, let the product all checked
            if (productList && !allChecked) {
                for (let key in productList) {
                    productList[key].check = true;
                }
            }
            // setLocalCartList(state);
        },
    },
});
