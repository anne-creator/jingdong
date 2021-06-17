<!-- fastmock 京东到家后端接口平台： https://fastmock.site/#/project/6581 -->
<template>
    <div class="wrapper">
        <img
            class="wrapper__img"
            src="http://www.dell-lee.com/imgs/vue3/user.png"
        />
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                placeholder="username"
                v-model="username"
            />
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                placeholder="Password"
                type="password"
                v-model="password"
            />
        </div>
        <div class="wrapper__login-button" @click="handleLogin">Log in</div>
        <div class="wrapper__login-link" @click="handleRegister">Register</div>
        <Toast v-if="showToast" :message="toastMessage" />
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request.js";
import Toast, { useToastEffect } from "../../components/Toast";

const useLoginEffect = (useToast) => {
    const router = useRouter();
    const loginData = reactive({ username: "", password: "" });
    const handleLogin = async () => {
        // to catch network error
        try {
            const result = await post("/api/user/login", {
                username: loginData.username,
                password: loginData.password,
            });
            // getting a object and stored in result
            //after conneted with API, check the error number to see if user password and name is right
            if (result?.errno === 0) {
                localStorage.isLogin = true;
                router.push({ name: "Home" });
            } else {
                useToast("failed to login");
            }
        } catch (e) {
            useToast("network error");
        }
    };
    const { username, password } = toRefs(loginData);
    return { username, password, handleLogin };
};
const useRegisterEffect = () => {
    const router = useRouter();
    const handleRegister = () => {
        router.push({ name: "Register" });
    };
    return { handleRegister };
};
export default {
    name: "Login",
    components: { Toast },
    setup() {
        const { showToast, toastMessage, useToast } = useToastEffect();
        const { username, password, handleLogin } = useLoginEffect(useToast);
        const { handleRegister } = useRegisterEffect();

        return {
            username,
            password,
            showToast,
            toastMessage,
            handleRegister,
            handleLogin,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    margin: 0 10%;
    font-family: $open-sans;

    &__img {
        width: 6.6rem;
        height: 6.6rem;
        margin-bottom: 4rem;
    }
    &__input {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        background: #f9f9f9;
        height: 4.8rem;
        width: 100%;
        margin-bottom: 1.6rem;

        &__content {
            width: 100%;
            height: 100%;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: $border-radius;

            padding-left: 1.6rem;
            &::placeholder {
                opacity: 0.6;
                letter-spacing: 1.2;
            }
        }
    }
    &__login-button {
        font-size: 1.6rem;
        border-radius: $border-radius;
        background-color: $priamry;
        color: $bgColor;
        text-align: center;
        height: 4.8rem;
        width: 100%;
        margin-bottom: 1rem;
        line-height: 4.8rem;
    }
    &__login-link {
        color: $content-notice-fontcolor;
    }
}
</style>
