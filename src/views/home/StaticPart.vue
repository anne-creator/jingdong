<template>
    <!-- \\\\\\\\\ position \\\\\\\\ -->
    <div class="position">
        <i class="position__icon--map iconfont icon-map1"></i>
        <span class="position__content"
            >北京理工大学国防科技园2号北京理工大学国防科技园2号北京理工大学国防科技园2号北京理工大学国防科技园2号楼10层</span
        >
        <i class="position__icon--remind iconfont icon-remind"></i>
    </div>
    <!-- \\\\\\\\\ search \\\\\\\\ -->
    <div class="search">
        <div class="search__icon iconfont icon-search"></div>
        <div class="search__content">山姆会员商店优惠商品</div>
    </div>
    <!-- \\\\\\\\\ banner \\\\\\\\ -->
    <div class="banner">
        <img
            class="banner__img"
            src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
            alt=""
        />
    </div>
    <!-- \\\\\\\\\ icons \\\\\\\\ -->
    <div class="icons">
        <div class="icons__item" v-for="item in iconList" :key="item.id">
            <img
                :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
                alt=""
                class="icons__item__img"
            />
            <p class="icons__item__title">{{ item.title }}</p>
        </div>
    </div>
    <!-- \\\\\\\\\ gap \\\\\\\\ -->
    <div class="gap"></div>
</template>
<script>
export default {
    name: "StaticPart",
    setup() {
        const iconList = [
            {
                id: 1,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 2,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 3,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 4,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 5,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 6,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 7,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 8,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 9,
                imgName: "超市",
                title: "超市便利",
            },
            {
                id: 10,
                imgName: "超市",
                title: "超市便利",
            },
        ];
        return { iconList };
    },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";

.position {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* background-color: red; */
    margin: 1.6rem 0 1.6rem 0;
    line-height: 2.2rem;
    font-size: 1.6rem;
    color: $content-font-color;

    &__icon--map {
        /* margin-left: -0.5rem; */
        font-size: 2.2rem;
    }

    &__content {
        font-size: 1.6rem;
        @include ellipsis;
    }
    &__icon--remind {
        font-size: 2.2rem;
        margin-left: 4.3rem;
    }
}

.search {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    background: $content-bg-2;
    color: $search-font-color;
    border-radius: 1.6rem;
    font-size: 1.4rem;
    height: 3.2rem;
    width: 100%;

    &__icon {
        margin-right: 1.2rem;
        margin-left: $border-radius-large;
    }
}

.banner {
    height: 0;
    overflow: hidden;
    /* 屏幕宽度的25.4%（图片的宽高比）就是图片的高度*/
    padding-bottom: 25.4%;
    &__img {
        width: 100%;
    }
}
.icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.6rem;

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
        &__img {
            width: 4rem;
        }
        &__title {
            margin-top: 0.4rem;
            font-size: 1.2rem;
        }
    }
}
.gap {
    margin: 0 -1.8rem;
    height: 1rem;
    background-color: $content-bg;
}
</style>
