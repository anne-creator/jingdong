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
                autocomplete="new-password"
                v-model="password"
            />
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                placeholder="Please Confirm your Password"
                type="password"
                v-model="ensurement"
            />
        </div>
        <div class="wrapper__register-button" @click="handleRegister">
            Register
        </div>
        <div class="Wrapper__go-login" @click="handleGoLoginClick">
            Already have account
        </div>
        <Toast v-if="showToast" :message="toastMessage" />
    </div>
</template>

<script>
// 引入路由对象
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useRegisterEffect = (useToast) => {
    const router = useRouter();
    const registerData = reactive({
        username: "",
        password: "",
        ensurement: "",
    });
    const handleRegister = async () => {
        try {
            const result = await post("/api/user/register", {
                username: registerData.username,
                password: registerData.password,
            });
            if (result?.errno === 0) {
                router.push({ name: "Login" });
            } else {
                useToast("failed to register");
            }
        } catch (e) {
            useToast("NetWork Error");
        }
    };
    const { username, password, ensurement } = toRefs(registerData);
    return { username, password, ensurement, handleRegister };
};
const useGoLoginEffect = () => {
    const router = useRouter();
    const handleGoLoginClick = () => {
        router.push({ name: "Login" });
    };
    return { handleGoLoginClick };
};

export default {
    name: "Register",
    components: { Toast },
    setup() {
        const { useToast, showToast, toastMessage } = useToastEffect();
        const { username, password, ensurement, handleRegister } =
            useRegisterEffect(useToast);
        const { handleGoLoginClick } = useGoLoginEffect();

        return {
            handleGoLoginClick,
            showToast,
            toastMessage,
            username,
            password,
            ensurement,
            handleRegister,
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
        border-radius: $border-radius;
        height: 4.8rem;
        width: 100%;
        margin-bottom: 1.6rem;

        &__content {
            border: none;
            padding-left: 1.6rem;
            width: 100%;
            height: 100%;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: $border-radius;

            &::placeholder {
                opacity: 0.6;

                letter-spacing: 1.2;
            }
        }
    }
    &__register-button {
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
        color: red;
    }
    &__go-login {
        /* color: $content-notice-fontcolor; */
        opacity: 0.6;
    }
}
</style>
