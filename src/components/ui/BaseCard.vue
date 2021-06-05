<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<!-- BaseCard treba da definisemo u main.js kao komponentu jer ce da bude koristena na dosta mjesta, pa da je imam globalno -->
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 75%
}
</style>