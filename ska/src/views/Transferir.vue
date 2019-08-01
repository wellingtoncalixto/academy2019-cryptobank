<template >
  <div class="transferir">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="voltar">
        <a href="" @click="handleIndex">
          <img src="../assets/left-arrow.png" alt />
        </a>
        <p class="item">Transferir</p>
      </div>
      <div class="depositar-valor">
        <p class="item">
          Informe a
          <strong>quantidade</strong> desejada
        </p>
        <input class="item" type="text" placeholder="$KA 250,00" />
        <p
          class="item"
          style="color:#333333; font-size:10px;"
        >Digite um valor entre $KA 10,00 e $KA 15.000,00</p>
      </div>
      <div class="selecao-user">
        <p class="item">Para <strong>quem</strong> você deseja <strong>enviar?</strong></p>
        <div class="selecao">
        <select>
          <option class="item" value="teste">ola</option>
          <option value="teste">ola</option>
        </select>
        </div>
        <div class="action">
          <button>Tranferir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transferir",
  methods: {
    handleIndex() {
      this.$router.push({ path: "/sarakin" });
    }
  }
};
</script>

 <style scoped>
.transferir {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  font-family: 'Roboto', sans-serif;
}
.logo {
  display: flex;
  justify-content: center;
}
.item {
  flex: 1;
  padding: 0 10px;
  text-align: center;
  align-items: center;
}
.voltar {
  display: flex;
  flex-direction: row;
  background-color: #4076ad;
  border-radius: 10px;
  margin-bottom: -15px;
  margin-top: 50px;
}
.voltar p {
  color: white;
  font-size: 15px;
  margin-top: 11px;
  margin-bottom: 20px;
}

.voltar img {
  float: left;
  height: 15px;
  margin-top: 7px;
  margin-left: 5px;
}
.depositar-valor {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
}
.depositar-valor p {
  color: #333333;
  margin-left: 10px;
  font-size: 20px;
}
.depositar-valor input {
  color: #707070;
  font-size: 30px;
  margin: 5px;
  border: none;
}
.selecao-user {
  display: flex;
  flex-direction: column;
  background-color: #F5F5F5;
  margin-top: -15px;
  border-radius: 10px;
}
.selecao-user p {
    font-size: 20px;
    color:#333333;
}
.selecao {
    display: flex;
    justify-content: center;
}
.selecao > select {
  width: 70%;
  height: 40px;
  border-radius: 5px;
  border: none;
  margin: 5px;
}
.selecao-user > option {
  font-size: 15px;
  color: #333333;
}
.action {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.action > button {
  margin-top: 15px;
  width: 90%;
  height: 50px;
  color: white;
  background-color: #fa7268;
  border: none;
  border-radius: 5px;
  margin-top: 3px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
 