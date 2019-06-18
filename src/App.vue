<template>
  <div id="app">
    <div class="home">
      <div class="item item-1 background-black"></div>
      <div class="item item-2 background-black">Sistema de Agendamento de Consultas</div>
      <div class="item item-3 background-black">Logout</div>
      <div class="item item-4"></div>
      <div class="item item-5">
        <router-view/>
      </div>
      <div class="item item-6"></div>
      <div class="item item-7 background-black"></div>
      <div class="item item-8 background-black"></div>
      <div class="item item-9 background-black"></div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
