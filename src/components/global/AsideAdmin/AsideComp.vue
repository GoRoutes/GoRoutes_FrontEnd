<template>
  <div>
    <button class="toggle-btn" @click="toggleSidebar">☰</button>
    
    <div class="sidebar" :class="{ show: isSidebarVisible }">
      <div class="menu-category" v-for="(category, index) in menuItems" :key="index">
        <div 
          class="menu-item" 
          :class="{ active: category.active }" 
          @click="category.name === 'Configurações' ? activateCategory(index) : toggleCategory(index)">
          <div class="menu-icon">
            <component :is="category.icon" />
          </div>
          <span>{{ category.name }}</span>
          <span v-if="category.subItems.length > 0" class="arrow" :class="{ rotated: category.expanded }">▼</span>
        </div>
        <Transition name="accordion">
          <div class="submenu" v-if="category.expanded && category.subItems.length > 0">
            <a href="#" 
               class="submenu-item" 
               :class="{ active: subItem.active }"
               v-for="(subItem, subIndex) in category.subItems" 
               :key="subIndex"
               @click.prevent="activateSubItem(index, subIndex)">
              <span>{{ subItem.name }}</span>
            </a>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CarIcon from "vue-material-design-icons/Car.vue";
import AccountIcon from "vue-material-design-icons/Account.vue";
import MapMarkerPathIcon from "vue-material-design-icons/MapMarkerPath.vue";
import CogIcon from "vue-material-design-icons/Cog.vue";
import SettingsIcon from "vue-material-design-icons/Cog.vue";

const isSidebarVisible = ref(true);
const menuItems = ref([
  {
    name: 'Veículos',
    icon: CarIcon,
    expanded: false,
    active: false,
    subItems: [
      { name: '> Vans e Micros', active: false },
      { name: '> Rastrear Veiculo', active: false },
    ]
  },
  {
    name: 'Clientes',
    icon: CogIcon,
    expanded: false,
    active: false,
    subItems: [
      { name: '> Alunos', active: false },
      { name: '> Pais', active: false },
    ]
  },
  {
    name: 'Motoristas',
    icon: AccountIcon,
    expanded: false,
    active: false,
    subItems: [
      { name: '> Motoristas', active: false },
      { name: '> Rastrear Motorista', active: false },
    ]
  },
  {
    name: 'Rotas',
    icon: MapMarkerPathIcon,
    expanded: false,
    active: false,
    subItems: [
      { name: '> Ver Rotas', active: false },
      { name: '> Criar Rota', active: false },
      { name: '> Consultar Rota', active: false }
    ]
  },
  {
    name: 'Configurações',
    icon: SettingsIcon,
    expanded: false,
    active: false,
    subItems: []
  }
]);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const toggleCategory = (index) => {
  menuItems.value[index].expanded = !menuItems.value[index].expanded;
  
  // Close other categories when opening a new one
  menuItems.value.forEach((category, i) => {
    if (i !== index) {
      category.expanded = false;
    }
  });

  // Mark category as active
  menuItems.value.forEach((category, i) => {
    category.active = i === index;
  });
};

const activateCategory = (index) => {
  menuItems.value.forEach((category, i) => {
    category.active = i === index;
  });
};

const activateSubItem = (categoryIndex, subItemIndex) => {
  menuItems.value.forEach(category => {
    category.subItems.forEach(subItem => {
      subItem.active = false;
    });
  });
  
  // Activate selected subitem
  menuItems.value[categoryIndex].subItems[subItemIndex].active = true;
};
</script>

<style scoped>
/* Estilos permanecem os mesmos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 100%;
  background-color: #f8f8ff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow-y: auto;
  height: 100vh;
  border-right: 2px solid #E5E7EB;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0fe;
}

.menu-category {
  margin-bottom: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  color: #555;
  text-decoration: none;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #e8e8ff;
}

.menu-item.active {
  background-color: #e0e0ff;
  color: #5050ff;
  font-weight: 500;
  border-right: 2px solid #5050ff;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  color: #6464fe;
}

.submenu {
  overflow: hidden;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 55px;
  color: #666;
  text-decoration: none;
  transition: background-color 0.2s;
}

.submenu-item:hover {
  background-color: #e8e8ff;
}

.submenu-item.active {
  background-color: #e0e0ff;
  color: #5050ff;
  font-weight: 500;
  border-right: 2px solid #5050ff;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.main-content {
  flex: 1;
  padding: 20px;
}

.toggle-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 999;
  display: none;
  cursor: pointer;
  background-color: #6464fe;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -250px;
    z-index: 100;
    transition: left 0.3s ease;
  }
  
  .sidebar.show {
    left: 0;
  }
  
  .toggle-btn {
    display: block;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>