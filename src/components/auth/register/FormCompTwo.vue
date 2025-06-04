<script setup>
import { ref } from 'vue'
import { InputComp } from "../.."
import { showErrorToast } from '@/utils/toast.js'

const email = ref('')
const phone = ref('')
const cpf = ref('')
const birthDate = ref('')
const photo = ref(null)

// Removido o useToast direto, pois agora usamos showErrorToast utilitário

const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if (!validTypes.includes(file.type)) {
        showErrorToast('Tipo de arquivo inválido. Use PNG ou JPG.', {
            sound: true,
        })
        photo.value = null
    } else {
        photo.value = file
    }
}
</script>



<template>
    <div class="form-container">
        <InputComp label="Endereço do email" type="email" placeholder="Enter your email" v-model="email"
            haveSubtext="false" padding-props="1.3rem" />
        <InputComp label="Telefone" type="number" placeholder="Enter your phone number" v-model="phone"
            haveSubtext="false" padding-props="1.3rem" />
        <InputComp label="CPF" type="number" placeholder="Enter your CPF" v-model="cpf" haveSubtext="false"
            padding-props="1.3rem" />

        <div class="row">
            <InputComp label="Data de Nascimento" type="date" placeholder="Enter your date of birth" v-model="birthDate"
                haveSubtext="true" style="color: #353DCCE5 !important;" padding-props="1.3rem" />
            <InputComp label="Foto" type="file" placeholder="Upload your photo" @change="handleFileChange"
                haveSubtext="true" style="color: #353DCCE5 !important;" padding-props="1.3rem" />
        </div>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 0 auto;
}

.row {
    display: flex;
    width: 100%;
    gap: 1rem;
}

.row>* {
    flex: 1;
}

.error-msg {
    color: red;
    margin-top: 0.5rem;
}
</style>
