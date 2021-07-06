<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgUrl" alt="" />
        <div
            :class="{
                shop__content: true,
                'shop__content--bordered': hideBorder ? false : true,
            }"
        >
            <div class="shop__content__title">{{ item.name }}</div>
            <div class="shop__content__tags">
                <span class="shop__content__tag">月售: {{ item.sales }} </span>
                <span class="shop__content__tag"
                    >起送 {{ item.expressLimit }}
                </span>
                <span class="shop__content__tag"
                    >基础运费: {{ item.expressPrice }}
                </span>
            </div>
            <div class="shop__highlight">{{ item.slogan }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ShopInfo",
    props: ["item", "hideBorder"],
};
</script>
<style lang="scss" scoped>
@import "../style/index.scss";
.shop {
    display: flex;
    margin-top: 1.2rem;
    &__img {
        width: 5.6rem;
        height: 5.6rem;
    }
    &__content {
        flex: 1;
        margin-left: 1.6rem;
        padding-bottom: 1.2rem;

        &--bordered {
            border-bottom: 1px solid $content-bg;
        }

        &__title {
            margin-bottom: 0.8rem;
            line-height: 2.2rem;
            font-size: 1.6rem;
        }
        &__tags {
            margin-bottom: 0.8rem;
            font-size: 1.3rem;
            line-height: 1.8rem;
        }
    }
    &__highlight {
        font-size: 1.3rem;
        color: $hightlight-fontColor;
        line-height: 1.8rem;
    }
}
</style>
