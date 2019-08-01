<template >
  <div class="depositar">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="voltar">
        <a href="" @click="handleIndex"><img src="../assets/left-arrow.png" alt /></a>
        <p class="item">Depositar</p>
      </div>
      <div class="depositar-valor">
        <p class="item">Informe a <strong>quantidade</strong> desejada
        </p>
        <input v-model="valorDepositar" class="item" autofocus type="text" placeholder="$KA 250,00" />
        <p class="item" style="color:#333333; font-size:10px;">Digite um valor entre $KA 10,00 e $KA 15.000,00</p>
        <div class="action">
          <button @click="depositar">Depositar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "deposito",
  data: () => ({
    valorDepositar: '',
    
  }),
  methods: {
      handleIndex(){
          this.$router.push({path: '/sarakin'})
      },
      depositar(){
        let saldo = 0
        const uid = firebase.auth().currentUser.uid
        if (this.valorDepositar >= 10 && this.valorDepositar <= 15000) {
          firebase.firestore().collection(`users`).doc(uid).get()
          .then((doc) => {
            saldo = doc.data().saldo
            saldo += parseInt(this.valorDepositar)
            firebase.firestore().collection(`users`).doc(uid).update({saldo: saldo})
            alert ('Deposito efetuado com Sucesso!')
          })
        }else{
          alert('Por favor inserir um valor entre $KA 10 e $KA 15.000')
        }
      }
  }
};
</script>

 <style scoped>
.depositar {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  font-family: 'Roboto', sans-serif;
}
.logo{
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
 