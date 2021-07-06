<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back icon-arrow-left"></div>
                Order Confirmation
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">Address</div>
                <div class="top__receiver__address">
                    Ripplewood Cres. Kitchener, Ontario, Canada
                </div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">Anne</span>
                    <span class="top__receiver__info__name">226-504-5355</span>
                </div>
                <div class="iconfont top__receiver__icon">&#xe743;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderConfirmation",
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
}
.top {
    position: relative;
    height: 15.9rem;
    background-size: 100% 15.9rem;
    background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
    );
    background-repeat: no-repeat;

    &__header {
        position: relative;
        padding-top: 2.6rem;
        line-height: 2.4rem;
        color: #fff;
        text-align: center;
        font-size: 1.6rem;
        &__back {
            position: absolute;
            font-size: 4.2rem;
            left: 0.8rem;
        }
    }
    &__receiver {
        position: absolute;
        left: 1.8rem;
        right: 1.8rem;
        bottom: 0;
        top: 8.5rem;
        height: 11.1rem;
        background: #fff;
        border-radius: 0.4rem;
        &__title {
            line-height: 2.2rem;
            padding: 1.6rem 0 1.4rem 1.6rem;
            font-size: 1.6rem;
            color: #333;
        }
        &__address {
            line-height: 2rem;
            padding: 0 4rem 0 1.6rem;
            font-size: 1.4rem;
            color: #333;
        }
        &__info {
            padding: 0.6rem 0 0 1.6rem;
            &__name {
                margin-right: 0.6rem;
                line-height: 1.8rem;
                font-size: 1.2rem;
                color: #666;
            }
        }
        &__icon {
            transform: rotate(180deg);
            position: absolute;
            right: 1.6rem;
            top: 5rem;
            color: $medium-fontColor;
            font-size: 3.4rem;
        }
    }
}
</style>
