<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="app-header__wrapper">
      <nav class="app-header__nav">
        <RouterLink
          class="app-header__link"
          :class="{ 'app-header__link--active': $route.path === '/' }"
          to="/"
        >
          Форма
        </RouterLink>
        <RouterLink
          class="app-header__link"
          :class="{ 'app-header__link--active': $route.path === '/info' }"
          to="/info"
        >
          Данные
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  line-height: 1.5;
  max-height: 100vh;
}
.app-header__wrapper {
  text-align: center;
}

.app-header__nav {
  display: inline-block;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.app-header__link {
  display: inline-block;
  padding: 8px 16px;
  position: relative;
  color: var(--vt-c-grey-dark);
  text-decoration: none;
}

.app-header__link:not(:last-child) {
  padding-right: 16px;
}

.app-header__link--active {
  color: var(--color-primary);
}

.app-header__link--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--color-primary);
}

.app-header__link:hover {
  color: var(--color-primary-soft);
}

.app-header__link--active:hover {
  color: var(--color-primary);
}
</style>
