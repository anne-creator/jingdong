<template>
    <!-- \\\\\\\\\ nearby \\\\\\\\ -->
    <div class="nearby">
        <span class="nearby__title">附近的店铺</span>
        <!--router-link 生成了一个a tag方便跳转，所以去掉下划线是去掉a标签的下划线-->
        <router-link
            v-for="item in nearbyList"
            :key="item._id"
            :to="`/Shop/${item._id}`"
        >
            <!-- 传递数据 ：item=“item” 子组件用props接受数据-->
            <ShopInfo :item="item" />
        </router-link>
    </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";

const useNearbyEffect = () => {
    const nearbyList = ref([]);
    const getNearbyList = async () => {
        const result = await get("/api/shop/hot-list");
        if (result?.errno === 0 && result?.data?.length) {
            nearbyList.value = result.data;
        }
    };
    return { nearbyList, getNearbyList };
};
export default {
    name: "Nearby",
    components: { ShopInfo },
    setup() {
        const { nearbyList, getNearbyList } = useNearbyEffect();
        getNearbyList();
        return { nearbyList };
    },
};
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/font_2593379_4q1e2oi4ln5.css";
@import "../../style/variable.scss";
.nearby {
    // background-color: red;
    display: flex;
    flex-direction: column;
    color: $content-font-color;

    &__title {
        font-size: 1.8rem;
        margin-top: 1.6rem;
    }
    /* item */
    a {
        text-decoration: none;
        color: $content-font-color;
    }
}
</style>
