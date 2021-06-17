<template>
    <div class="wrapper">
        <div class="search">
            <div
                class="search__back iconfont icon-arrow-left"
                @click="handleBackClick"
            ></div>
            <div class="search__content">
                <div class="search__icon iconfont icon-search"></div>
                <input
                    class="search__content__input"
                    placeholder="Please enter your item"
                />
            </div>
        </div>
        <!--v-show="item.imgURL get rid of the flashing img reaction. IT means only the img has been loaded, the shopInfo will be present. -->
        <ShopInfo :item="item" :hideBorder="true" />
    </div>
    <Content />
    <Cart />
</template>
<script>
import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from "./Cart";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import { reactive, toRefs } from "vue";

// get current shop infor
const useShopInfoEffect = () => {
    // console.log(route.name, route.params);// shop {id:1},这个ID是在router里面developer写入的
    const route = useRoute();
    console.log(route.params.id);
    const data = reactive({ item: {} });
    // console.log(route.params.id);
    const getItemData = async () => {
        const result = await get(`api/shop/:${route.params.id}`);
        console.log(result);
        if (result?.errno === 0 && result?.data) {
            data.item = result.data;
        }
    };
    const { item } = toRefs(data);
    return { item, getItemData };
};

// click to return
const useBackRouterEffect = () => {
    const router = useRouter();
    function handleBackClick() {
        router.back();
    }
    return { handleBackClick };
};
export default {
    name: "Shop",
    components: { ShopInfo, Content, Cart },
    setup() {
        const { item, getItemData } = useShopInfoEffect();
        const { handleBackClick } = useBackRouterEffect();
        getItemData();
        return { item, handleBackClick };
    },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";

.wrapper {
    margin: 0 1.8rem;
    //  background-color: blue;
    .search {
        display: flex;
        align-items: center;
        margin: 1.6rem 0;
        color: $search-font-color;
        .icon-arrow-left {
            font-size: 3rem;
            margin-right: 1.5rem;
        }
        &__content {
            display: flex;
            align-items: center;
            padding: 0.8rem 0;
            background-color: $content-bg-2;
            border-radius: $border-radius-large;
            width: 100%;
            padding-left: 1.5rem;
            .icon-search {
                font-size: 2rem;
                margin-right: 1.5rem;
                fill: $content-notice-fontcolor;
            }
            &__input {
                border: none;
                font-size: 1.4rem;
                background-color: $content-bg-2;
            }
        }
    }
}
</style>
