<template>
    <div class="wrapper">
        <StaticPart />
        <Nearby />
    </div>
    <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from "./StaticPart";
import Nearby from "./Nearby";
import Docker from "../../components/Docker";
export default {
    name: "Home",
    components: { StaticPart, Nearby, Docker },
};
</script>

<style lang="scss" scoped>
.wrapper {
    // background-color: yellow;
    padding: 0 1.8rem 1rem 1.8rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 5rem;
    right: 0;
    scroll-behavior: smooth;
    overflow-y: scroll;
}
</style>
