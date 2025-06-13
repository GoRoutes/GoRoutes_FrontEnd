<script setup>
import { InputComp } from "../..";
import { reactive, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:data'])

const data = reactive({
  username: props.initialData.username || "",
  name: props.initialData.name || "",
  password: props.initialData.password || "",
  userType: props.initialData.userType || ""
})

watch(data, (newValue) => {
  emit('update:data', { ...newValue })
}, { deep: true })

const selectUserType = (type) => {
  data.userType = type
}
</script>

<template>
  <div class="form-container">
    <InputComp
      label="Username"
      type="text"
      placeholder="Digite seu username"
      v-model="data.username"
      :haveSubtext=false
      padding-props="1.3rem"
    />
    <InputComp
      label="Nome Completo"
      type="text"
      placeholder="Digite seu nome completo"
      v-model="data.name"
      :haveSubtext=false
      padding-props="1.3rem"
    />
    <InputComp
      label="Senha"
      type="password"
      placeholder="Digite sua senha"
      v-model="data.password"
      :haveSubtext=false
      padding-props="1.3rem"
    />
    <div class="user-type-section">
      <label class="section-label">Tipo de Usuário</label>
      <div class="user-type-options">
        <button
          type="button"
          class="user-type-button"
          :class="{ active: data.userType === 'responsible' }"
          @click="selectUserType('responsible')"
        >
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.993 2.993 0 0 0 17.15 7c-.8 0-1.54.5-1.85 1.26L13.5 14h2.2l.6-2H18v8h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9l-2.5-7.5C6.22 6.65 5.55 6 4.75 6S3.28 6.65 3 7.5L.5 15H2v7h5.5z" fill="currentColor"/>
            </svg>
          </div>
          <div class="button-content">
            <span class="button-title">Responsável</span>
            <span class="button-subtitle">Responsável por outros passageiros</span>
          </div>
        </button>

        <button
          type="button"
          class="user-type-button"
          :class="{ active: data.userType === 'passenger' }"
          @click="selectUserType('passenger')"
        >
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
          </div>
          <div class="button-content">
            <span class="button-title">Passageiro</span>
            <span class="button-subtitle">Apenas passageiro individual</span>
          </div>
        </button>
      </div>
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

.user-type-section {
  width: 100%;
}

.section-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.user-type-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.user-type-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;
}

.user-type-button:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.user-type-button.active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.user-type-button.active .icon-container {
  background: #3b82f6;
  color: white;
}

.user-type-button.active .button-title {
  color: #1d4ed8;
  font-weight: 600;
}

.user-type-button.active .button-subtitle {
  color: #3730a3;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f3f4f6;
  color: #6b7280;
  margin-right: 1rem;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
}

.button-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
}

.button-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  transition: all 0.2s ease-in-out;
}

.button-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  transition: all 0.2s ease-in-out;
}

/* Responsividade */
@media screen and (max-width: 768px) {
  .user-type-button {
    padding: 0.875rem;
  }

  .icon-container {
    width: 40px;
    height: 40px;
    margin-right: 0.75rem;
  }

  .button-title {
    font-size: 0.925rem;
  }

  .button-subtitle {
    font-size: 0.8rem;
  }
}

</style>
