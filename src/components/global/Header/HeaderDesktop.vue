<script setup>
import Bell from "vue-material-design-icons/Bell.vue";
import MessageProcessingOutline from "vue-material-design-icons/MessageProcessingOutline.vue";
</script>

<template>
    <header>
        <div class="logo">
            <img src="../../../assets/images/LogoRemoved.png" alt="">
            <h1>GoRoutes</h1>
        </div>
        <div class="nav">
            <div class="itens">
                <input type="text">
                <button>
                    <MessageProcessingOutline />
                </button>
                <button>
                    <Bell />
                </button>
                <button>ss</button>
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

img	{
    width: 25%;
}

h1{
    color: var(--primary-color);
    font-size: 2.1rem;
    font-weight: 700;
}

.nav{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.itens{
    width: 30%;
    display: flex;
    gap: 1rem;
    margin-right: 1rem;
    align-items: center;
}

input{
    width: 100%;
    height: 3rem;
    border-radius: 20px;
    border: 2px solid #E5E7EB;
    padding: 1rem;
}

button{
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    border:  2px solid #E5E7EB;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-color);
    cursor: pointer;
}
</style>