<template>
    <div class="cart">
        <div class="check">
            <div class="check__icon">
                <img
                    src="http://www.dell-lee.com/imgs/vue3/basket.png"
                    class="check__icon__img"
                />
                <div class="check__icon__tag">1</div>
            </div>
            <div class="check__info">
                Total：<span class="check__info__price">&yen;127</span>
            </div>
            <div class="check__btn">Check Out</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Cart",
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.check {
    display: flex;
    height: 5rem;
    border-top: 0.1rem solid $content-bg;
    line-height: 5rem;

    &__icon {
        position: relative;
        width: 8.4rem;

        &__img {
            display: block;
            margin: 1.2rem auto;
            width: 2.8rem;
            height: 2.6rem;
        }
        &__tag {
            position: absolute;
            right: 2rem;
            top: 0.4rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            background-color: $hightlight-fontColor;
            border-radius: 50%;
            font-size: 1.2rem;
            text-align: center;
            color: #fff;
            transform: scale(0.5);
        }
    }
    &__info {
        flex: 1;
        color: $content-font-color;
        font-size: 1.6rem;
        &__price {
            line-height: 5rem;
            color: $hightlight-fontColor;
            font-size: 1.8rem;
        }
    }
    &__btn {
        width: 9.8rem;
        background-color: #4fb0f9;
        text-align: center;
        color: #fff;
        font-size: 1.4rem;
    }
}
</style>
