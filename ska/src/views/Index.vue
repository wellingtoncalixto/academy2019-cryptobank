<template>
  <div class="index">
    <div class="content">
      <div class="sair">
        <button @click="logOff">Sair</button>
      </div>
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="content-saldo">
        <p>Saldo disponivel</p>
        <h1 style="color:#333333">$KA {{getValor()}}{{valor}}</h1>
      </div>
      <div class="action">
        <button @click="handleDepositar"><img src="../assets/piggy-bank.png" alt=""><p>Depositar</p></button>
        <button @click="handlePagar"><img src="../assets/pay.png" alt=""><p>Pagar</p></button>
        <button @click="handleTransferir"><img src="../assets/debit-card.png" alt=""><p>Transfrir</p></button>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "sarakin",
  data: () => ({
    valor: 0
  }),
  methods:{
        handleDepositar (){
          this.$router.push({path: '/sarakin/depositar'})
        },
        handlePagar(){
            this.$router.push({path: '/sarakin/pagar'})
        },
        handleTransferir(){
            this.$router.push({path: '/sarakin/transferir'})
        },
        logOff(){
          firebase.auth().signOut().then(() => {
            this.$router.push({path: '/login'})
          })
        },
        getValor(){
          const uid = firebase.auth().currentUser.uid
         firebase.firestore().collection(`users`).doc(uid).get()
          .then((doc) => {
            this.valor = doc.data().saldo
          }).catch((err) => {
            console.log('Error getting documents', err);
            });     
        }
  }
};
</script>

 <style scoped>
.index { 
  display: flex;
  width: 100%;
  justify-content: center;
  font-family:'Roboto', sans-serif;
  margin-top: 100px;
}
.sair{
  display: flex;
  justify-content: flex-end;

}
.sair > button {
  color: white;
  background-color: #fa7268;
  border: none;
  border-radius: 5px;
}
.content-saldo{
    background-color: white;
    padding: 1px;
    width:100%;
    border-radius: 5px;
    margin-top: 10px;
}
.content-saldo > h1 {
    font-size: 40px;
    margin-top:-10px;
}
.content-saldo > p,h1{
    margin-left: 10px;
}
.action {
  display: flex;
  flex-direction: column;
  margin-top:200px;
}
.action > button {
  margin-top: 15px;
  justify-content: center;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #fa7268;
  border: none;
  border-radius: 5px;
}
.action > button > p{
    float: right;
    font-size: 20px;
    margin-top: 10px;
    margin-right: 10px;
}
.action > button > img{
    width: 30px;
    height: 30px;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
}
</style>
 