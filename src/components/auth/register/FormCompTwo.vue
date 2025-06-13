<script setup>
import { reactive, watch } from 'vue'
import { InputComp } from "../.."

const props = defineProps({
  initialData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:data'])

const data = reactive({
  email: props.initialData.email || '',
  telephone: props.initialData.telephone || '',
  cpf: props.initialData.cpf || '',
  data_of_birth: props.initialData.data_of_birth || '',
  photo: null
})

watch(data, (newValue) => {
  emit('update:data', { ...newValue })
}, { deep: true })
</script>



<template>
    <div class="form-container">
        <InputComp
            label="Email"
            type="email"
            placeholder="Digite seu email"
            v-model="data.email"
            :haveSubtext=false
            padding-props="1.3rem"
        />
        <InputComp
            label="Telefone"
            type="tel"
            placeholder="Digite seu telefone"
            v-model="data.telephone"
            :haveSubtext=false
            padding-props="1.3rem"
        />
        <InputComp
            label="CPF"
            type="text"
            placeholder="Digite seu CPF"
            v-model="data.cpf"
            :haveSubtext=false
            padding-props="1.3rem"
        />
        <InputComp
            label="Data de Nascimento"
            type="date"
            placeholder="Digite sua data de nascimento"
            v-model="data.data_of_birth"
            :haveSubtext=true
            style="color: #353DCCE5 !important;"
            padding-props="1.3rem"
        />
        <!-- <InputComp label="Foto" type="file" placeholder="Upload your photo" @change="handleFileChange"
            :haveSubtext=true style="color: #353DCCE5 !important;" padding-props="1.3rem" /> -->
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
