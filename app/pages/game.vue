<script setup>

</script>

<template>
  <section>
    <nav>
        <NuxtLink 
            to="/game/chart" 
            class="container_link"
            exact-active-class="active_class"
        >
            Chart
        </NuxtLink>

        <NuxtLink 
            to="/game/result"
            class="container_link"
            exact-active-class="active_class"
        >
            Result
        </NuxtLink>

        <NuxtLink 
            to="/game/part2"
            class="container_link"
            exact-active-class="active_class"
        >
            Task2
        </NuxtLink>
    </nav>

    <NuxtPage />
  </section>
</template>

<style scoped>
nav {
  margin: 1rem 0;
}
nav a {
  margin-right: 1rem;
  color: #007acc;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}

.container_link{
    text-decoration: none;
    position: relative;
    color: white;
    padding: 10px 30px;
    background-color: blue;
    border-radius: 10px
}

.container_link:hover{
    text-decoration: none;
}

.active_class::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid blue;
}

</style>
