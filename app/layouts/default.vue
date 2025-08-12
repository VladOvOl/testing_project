<script setup lang="ts">
import '~/assets/reset_styles.css'

const route = useRoute();

</script>


<template>

    <main class="main_container">
        <aside class="sidebar_container"> 
            <p class="url">
                {{ route.path }}
            </p>
           
                <Sidebar/>

        </aside>

        <div class="content_container">
            <NuxtPage/>
        </div>
    </main>

</template>


<style scoped>

.main_container{
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    background-color: rgb(211, 211, 211);
}

.sidebar_container{
    position: relative;
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.url{
    position: absolute;
    top: 20px;
    left: 20px;
}

.content_container{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
