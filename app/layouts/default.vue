<script setup>
const sidebarCollapsed = ref(false);
const sidebarWidth = ref(256);
const isResizing = ref(false);

// State untuk menu yang terbuka
const openMenus = ref({});

// Menu Configuration dengan nested structure
const dataManagementMenu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: 'ic:outline-analytics'
  },
  {
    id: 'data-master',
    label: 'Data Master',
    icon: 'ic:baseline-article',
    to: '/admin/user',
    children: [
      {
        id: 'users',
        label: 'Users',
        to: '/admin/user'
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        to: '/dashboard/suppliers'
      },
      {
        id: 'products',
        label: 'Products',
        children: [
          {
            id: 'all-products',
            label: 'All Products',
            to: '/dashboard/products/all'
          },
          {
            id: 'categories',
            label: 'Categories',
            children: [
              {
                id: 'main-categories',
                label: 'Main Categories',
                to: '/dashboard/products/categories/main'
              },
              {
                id: 'sub-categories',
                label: 'Sub Categories',
                to: '/dashboard/products/categories/sub'
              },
              {
                id: 'tags',
                label: 'Tags',
                to: '/dashboard/products/categories/tags'
              }
            ]
          },
          {
            id: 'inventory',
            label: 'Inventory',
            to: '/dashboard/products/inventory'
          }
        ]
      }
    ]
  },
  {
    id: 'reports asd',
    label: 'Reports',
    icon: 'ic:baseline-area-chart',
    children: [
      {
        id: 'sales-report',
        label: 'Sales Report',
        children: [
          {
            id: 'daily-sales',
            label: 'Daily Sales',
            to: '/dashboard/reports/sales/daily'
          },
          {
            id: 'monthly-sales',
            label: 'Monthly Sales',
            to: '/dashboard/reports/sales/monthly'
          },
          {
            id: 'yearly-sales',
            label: 'Yearly Sales',
            to: '/dashboard/reports/sales/yearly'
          }
        ]
      },
      {
        id: 'inventory-report',
        label: 'Inventory Report',
        to: '/dashboard/reports/inventory'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        children: [
          {
            id: 'customer-analytics',
            label: 'Customer Analytics',
            to: '/dashboard/reports/analytics/customers'
          },
          {
            id: 'product-analytics',
            label: 'Product Analytics',
            to: '/dashboard/reports/analytics/products'
          }
        ]
      }
    ]
  }
];

const settingsMenu = [
  {
    id: 'settings',
    label: 'Settings',
    icon: 'tabler:settings',
    children: [
      {
        id: 'profile',
        label: 'Profile',
        to: '/dashboard/settings/profile'
      },
      {
        id: 'security',
        label: 'Security',
        children: [
          {
            id: 'change-password',
            label: 'Change Password',
            to: '/dashboard/settings/security/password'
          },
          {
            id: 'two-factor',
            label: 'Two-Factor Auth',
            to: '/dashboard/settings/security/2fa'
          },
          {
            id: 'sessions',
            label: 'Active Sessions',
            to: '/dashboard/settings/security/sessions'
          }
        ]
      },
      {
        id: 'preferences',
        label: 'Preferences',
        to: '/dashboard/settings/preferences'
      }
    ]
  }
];

// Handle menu toggle
function handleMenuToggle(menuId, value) {
  openMenus.value[menuId] = value;
}

// Computed Classes
const sidebarClasses = computed(() => [
  'fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out',
  sidebarCollapsed.value ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'w-64'
]);

const sidebarStyles = computed(() =>
  !sidebarCollapsed.value && sidebarWidth.value ? { width: `${sidebarWidth.value}px` } : {}
);

const mainContentClasses = computed(() => [
  'flex flex-col transition-all duration-300 ease-in-out min-h-screen',
  sidebarCollapsed.value ? 'lg:ml-16' : 'lg:ml-64'
]);

const mainContentStyles = computed(() =>
  !sidebarCollapsed.value && sidebarWidth.value ? { marginLeft: `${sidebarWidth.value}px` } : {}
);

// Resize Handlers
function startResize() {
  if (isResizing.value)
    return;
  isResizing.value = true;

  const handleMove = (e) => {
    if (!isResizing.value)
      return;
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 400) {
      sidebarWidth.value = newWidth;
    }
  };

  const handleStop = () => {
    isResizing.value = false;
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleStop);
  };

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleStop);
}

// Responsive Handler
function handleWindowResize() {
  if (window.innerWidth < 1024) {
    sidebarCollapsed.value = true;
  }
}

onMounted(() => {
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize);
});
</script>

<template>
  <div class="h-screen bg-gray-50 overflow-hidden">
    <aside
      :class="sidebarClasses"
      :style="sidebarStyles"
    >
      <div class="flex items-center h-16 px-4 border-b border-gray-200">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">D</span>
        </div>
      </div>

      <nav class="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        <div v-if="!sidebarCollapsed">
          <div class="space-y-1">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Data Management
            </h3>
            <NavMenu
              v-for="item in dataManagementMenu"
              :key="item.id"
              :item="item"
              :collapsed="sidebarCollapsed"
              :open-menus="openMenus"
              @toggle="handleMenuToggle"
            />
          </div>
          <div class="pt-4 mt-4 border-t border-gray-200 space-y-1">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </h3>
            <NavMenu
              v-for="item in settingsMenu"
              :key="item.id"
              :item="item"
              :collapsed="sidebarCollapsed"
              :open-menus="openMenus"
              @toggle="handleMenuToggle"
            />
          </div>
        </div>

        <div
          v-else
          class="space-y-2"
        >
          <PopOverMenu
            v-for="item in dataManagementMenu"
            :key="item.id"
            :item="item"
          />
          <div class="pt-2 mt-2 border-t border-gray-200">
            <PopOverMenu
              v-for="item in settingsMenu"
              :key="item.id"
              :item="item"
            />
          </div>
        </div>
      </nav>

      <div
        v-if="!sidebarCollapsed"
        class="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize transition-colors group"
        @mousedown="startResize"
      />
    </aside>

    <div
      v-show="!sidebarCollapsed"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
      @click="sidebarCollapsed = true"
    />

    <div
      :class="mainContentClasses"
      :style="mainContentStyles"
    >
      <header class="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4">
        <div class="flex items-center space-x-4">
          <UButton
            icon
            variant="ghost"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            <UIcon name="i-heroicons-bars-3-16-solid" />
          </UButton>

          <nav class="flex items-center space-x-2 text-sm text-gray-600">
            <a
              href="#"
              class="hover:text-blue-600 transition-colors"
            >Dashboard</a>
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-900 font-medium">Form</span>
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-auto">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
