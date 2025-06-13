<script setup>
import { ref, defineProps } from "vue";
import { useAuthStore } from "@/stores/auth/auth";
import Bell from "vue-material-design-icons/Bell.vue";
import MessageProcessingOutline from "vue-material-design-icons/MessageProcessingOutline.vue";

const showMenu = ref(false);
const authStore = useAuthStore();
defineProps({
    profileImage: {
        type: String,
        //required: true,
        default: "https://vignette.wikia.nocookie.net/monstros-sa/images/3/38/Mike1.png/revision/latest?cb=20130601113702&path-prefix=pt-br"
    },
});
</script>

<template>
    <header>
        <div class="logo">
            <img src="../../../assets/images/LogoRemoved.png" alt="">
            <h1>GoRoutes</h1>
        </div>
        <div class="nav">
            <div class="itens">
                <input type="text" placeholder="Search" />
                <button class="icon-btn">
                    <MessageProcessingOutline />
                </button>
                <button class="icon-btn">
                    <Bell />
                </button>

                <div class="profile-container" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
                    <button class="profile-btn" :style="{ backgroundImage: `url(https://vignette.wikia.nocookie.net/monstros-sa/images/3/38/Mike1.png/revision/latest?cb=20130601113702&path-prefix=pt-br)` }"></button>

                    <Transition name="fade">
                        <div v-if="showMenu" class="dropdown-menu">
                            <ul>
                                <li>Perfil</li>
                                <li>Configurações</li>
                                <li @click="authStore.logout">Sair</li>
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    border-bottom: 2px solid #E5E7EB;
    background-color: #f8f8ff;
}

.logo {
    display: flex;
    align-items: center;
}

img {
    width: 25%;
}

h1 {
    color: var(--primary-color);
    font-size: 2.1rem;
    font-weight: 700;
}

.nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.itens {
    width: 30%;
    display: flex;
    gap: 1rem;
    margin-right: 1rem;
    align-items: center;
}

input {
    width: 100%;
    height: 3rem;
    border-radius: 20px;
    border: 2px solid #E5E7EB;
    padding: 1rem;
}

button {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    border: 2px solid #E5E7EB;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-color);
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
    transform: scale(1.1);
    background-color: #e5e7eb;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-container {
    position: relative;
}

.profile-btn {
    background-color: #fff;
    font-weight: bold;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    border: 2px solid #E5E7EB;
}

.profile-btn:hover {
    transform: scale(1.1);
    background-color: #e5e7eb;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu {
    position: absolute;
    top: 2.5rem;
    right: 0;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 150px;
    z-index: 10;
    overflow: hidden;
}

.dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-menu li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s;
}

.dropdown-menu li:hover {
    background: #f3f4f6;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
