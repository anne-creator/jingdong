<template>
    <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    props: ["message"],
};
export const useToastEffect = () => {
    const toastData = reactive({
        showToast: false,
        toastMessage: "",
    });

    const useToast = (message) => {
        toastData.showToast = true;
        toastData.toastMessage = message;
        setTimeout(() => {
            toastData.showToast = false;
            toastData.toastMessage = "";
        }, 2000);
    };
    const { showToast, toastMessage } = toRefs(toastData);
    return { useToast, showToast, toastMessage };
};
</script>
<style lang="scss" scoped>
@import "../style/index.scss";
.toast {
    z-index: 3;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.35);
    background-repeat: 0.5rem;
    color: $bgColor;
    padding: 1rem;
    border-radius: $border-radius;
}
</style>
