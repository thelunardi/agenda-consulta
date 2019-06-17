<template>
    <div class="home">
        <div class="item item-1 background-black"></div>
        <div class="item item-2 background-black">Sistema de Agendamento de Consultas</div>
        <div class="item item-3 background-black"></div>
        <div class="item item-4"></div>
        <div class="item item-5">
            <login msg="Sistema de Agendamento de Consultas"/>
        </div>
        <div class="item item-6"></div>
        <div class="item item-7 background-black"></div>
        <div class="item item-8 background-black"></div>
        <div class="item item-9 background-black"></div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Login from '@/views/Login.vue'

    export default {
        name: 'home',
        components: {
            Login
        }
    }
</script>
<style>
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    .home {
        display: grid;
        background-color: rgba(0, 0, 0, 0.0);
        grid-template-columns: auto 80% auto;
        grid-template-rows: auto minmax(100vh, auto) auto;
    }
    .item {
        background-color: white;
    }
    .background-black {
        background-color: royalblue;
        color: white;
        padding: 10px;
    }
</style>
