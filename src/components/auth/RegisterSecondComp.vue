<script setup>
import ButtonComp from './ButtonComp.vue';
import InputComp from './InputComp.vue';
import CheckBoxComp from './CheckBoxComp.vue';
</script>
<template>
    <InputComp label="Foto de Perfil" type="file" placeholder="Foto de perfil"/>
    <InputComp label="Data de Nascimento" type="date" placeholder="Data de Nascimento"/> 
    <InputComp label="Telefone" type="number" placeholder="Número de Telefone"/>
    <CheckBoxComp label="Ao clicar nesta caixa de seleção, você concorda com nossos Termos e reconhece ter lido nosso Aviso de Privacidade." /> 
    <div class="btn-container">
        <ButtonComp name="PRÓXIMO" padding=".5rem" @click="$emit('pass')" />
    </div>
    <div class="btn-container">
        <ButtonComp name="VOLTAR" padding=".5rem" @click="$emit('back')" /> 
    </div>
</template>
<style scoped>
.btn-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1rem auto 0 auto;
}
.btn{
    transition: all 0.3s ease-in-out;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 10px;
    border: none;
    padding: .5rem;
    width: 100%;
}
.btn:hover{
    background-color: #fff;
    color: var(--primary-color);
    cursor: pointer;
}
div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .5rem auto;
}
label{
    font-size: 1.2rem;
    margin-bottom: .5rem;
    color: var(--primary-color);
}
input{
    width: 100%;
    height: 2.5rem;
    border-radius: 10px;
    border: 1px solid var(--primary-color);
    padding: 1rem;
}
</style>