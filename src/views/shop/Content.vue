<template>
    <div class="content">
        <div class="category">
            <div
                class="category__item"
                v-for="item in categories"
                :key="item.name"
                @click="() => handleTabClick(item.tab)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in list" :key="item._id">
                <img class="product__item__img" :src="item.imgUrl" />
                <div class="product__item__detail">
                    <h4 class="product__item__title">
                        {{ item.name }}
                    </h4>
                    <p class="product__item__sales">月售{{ item.sales }}件</p>
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
                                    item.name,
                                    item._id,
                                    item,
                                    -1
                                );
                            }
                        "
                        >-</span
                    >
                    {{
                        cartList?.[shopId]?.productList?.[item._id]?.count || 0
                    }}
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
        </div>
    </div>
</template>
<script>
import { get } from "../../utils/request";
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./commonCartEffect.js";

// /api/shop/${shopId}/products

const categories = [
    { name: "全部商品", tab: "all" },
    { name: "秒杀", tab: "seckill" },
    { name: "新鲜水果", tab: "fruit" },
];

const useTabEffect = () => {
    const curTab = ref(categories[0].tab);
    const handleTabClick = (tab) => {
        curTab.value = tab;
    };
    return { curTab, handleTabClick };
};

const useContentListEffect = (curTab, shopId) => {
    // content list that will be showned
    const content = reactive({ list: [] });
    // only get the data from tab page
    const getContentData = async () => {
        // get content data from api: 两个参数，一个地址，一个tab
        const result = await get(`/api/shop/${shopId}/products`, {
            tab: curTab.value,
        });
        if (result?.errno === 0 && result?.data.length) {
            // store content data to list and show the list on the page using v-for
            content.list = result.data;
        }
    };
    watchEffect(() => {
        getContentData();
    });
    const { list } = toRefs(content);
    return { list, shopId };
};

export default {
    name: "Content",
    setup() {
        const route = useRoute();
        const shopId = route.params.id;
        const { curTab, handleTabClick } = useTabEffect();
        const { list } = useContentListEffect(curTab, shopId);
        const { cartList, changeCartItemInfo } = useCommonCartEffect();
        return {
            list,
            curTab,
            handleTabClick,
            categories,
            changeCartItemInfo,
            cartList,
            shopId,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.content {
    display: flex;
    font-size: 1.4rem;
    margin-top: 2.4rem;
    color: $content-font-color;
    position: absolute;
    left: 0;
    right: 0;
    top: 15rem;
    bottom: 5rem;

    .category {
        display: flex;
        flex-direction: column;
        width: 7.6rem;
        overflow-y: scroll;
        background-color: $content-bg-2;
        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 4rem;
            line-height: 1.6rem;
            &:hover {
                background-color: $bgColor;
                // background-color: red;
            }
        }
    }
    .product {
        overflow-y: scroll;
        flex: 1;
        &__item {
            display: flex;
            padding: 1.2rem 0;
            margin: 0 1.6rem;
            border-bottom: 0.1rem solid $content-bg;
            height: 6.8rem;
            position: relative;
            &__img {
                width: 6.8rem;
                height: 6.8rem;
            }
            &__detail {
                display: flex;
                flex-direction: column;
                line-height: 2rem;
                justify-content: space-between;
                margin-left: 1.6rem;
                overflow: hidden;
                width: 100%;
            }
            &__title {
                font-size: 1.4rem;
                color: $content-font-color;
                margin: 0;
                width: 60%;
                @include ellipsis;
            }
            &__sales {
                margin: 0;
                font-size: 1.2rem;
                color: $content-font-color;
            }

            &__price {
                margin: 0;
                line-height: 1.4rem;
                font-size: 1.4rem;
                color: $hightlight-fontColor;
            }
            &__yen {
                font-size: 1.2rem;
            }
            &__origin {
                margin-left: 0.6rem;
                font-size: 1.2rem;
                color: #999;
                text-decoration: line-through;
            }
            .product__number {
                position: absolute;
                right: 0.2rem;
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
}
</style>
