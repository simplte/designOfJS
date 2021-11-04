<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <HelloWorld msg="你好" />
</template>

<style lang="scss">
@import '@/assets/base.css';

#app {
  width: 100%;
  overflow: hidden;
}

header {
  max-height: 100vh;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 100px;
}

a,
.green {
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

#nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

#nav a.router-link-exact-active {
  color: var(--color-text);
}

#nav a.router-link-exact-active:hover {
  background-color: transparent;
}

#nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

#nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  #nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
