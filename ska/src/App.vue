<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');
textarea:focus, input:focus, select:focus, button:focus {
   outline: 0;
}
html{
  height: 100%;
  background: #333333;
  background: url('./assets/fundo@2x.png') no-repeat center fixed;
}
#app {
  height: 100%
}
</style>
