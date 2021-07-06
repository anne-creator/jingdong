<template>
    <div class="docker">
        <div
            v-for="(item, index) in dockerList"
            :key="index"
            :class="{ docker__item: true, 'docker__item--active': index === 0 }"
        >
            <router-link :to="item.to" class="docker__item">
                <div class="docker__icon iconfont" :class="item.icon"></div>
                <div class="docker__title">{{ item.text }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "Docker",
    setup() {
        const dockerList = [
            { icon: "icon-home-fill", text: "home", to: { name: "Home" } },
            {
                icon: "icon-cart-full-fill",
                text: "Cart",
                to: { name: "CartList" },
            },
            { icon: "icon-order-fill", text: "Order", to: { name: "Home" } },
            { icon: "icon-account-fill", text: "Me", to: { name: "Home" } },
        ];
        return { dockerList };
    },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";

.docker {
    font-family: $roboto;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 1.8rem;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4.9rem;
    border-top: 0.1rem solid $content-bg;
    color: $content-font-color;
    a {
        text-decoration: none;
        color: $content-font-color;
    }
    &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: $bgColor;
        text-align: center;

        &--active a {
            color: $priamry;
        }
    }
    .iconfont {
        margin-bottom: 0.2rem;
        font-size: 2rem;
        /* color: #f5a623; */
        margin-bottom: 0.2rem;
    }
    &__title {
        font-size: 1.2rem;
        margin-top: -0.4rem;
    }
}
</style>
