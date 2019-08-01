<template >
  <div class="pagar">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="voltar">
        <a href="" @click="handleIndex"><img src="../assets/left-arrow.png" alt /></a>
        <p class="item">Efetuar Pagamento</p>
      </div>
      <div class="depositar-valor">
        <p class="item">Informe a <strong>quantidade</strong> desejada
        </p>
        <input v-model="valorPagar" class="item" autofocus type="number" placeholder="$KA 250,00" />
        <p class="item" style="color:#333333; font-size:10px;">Digite um valor entre $KA 10,00 e $KA 15.000,00</p>
        <div class="action">
          <button @click="pagar">Pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "pagamento",
  data: () => ({
    valorPagar: '',
    
  }),
  methods: {
      handleIndex(){
          this.$router.push({path: '/sarakin'})
      },
      pagar(){
        let saldo=''
        const uid = firebase.auth().currentUser.uid
        if (this.valorPagar >= 10 && this.valorPagar <= 15000) {
          firebase.firestore().collection(`users`).doc(uid).get()
          .then((doc) => {
            saldo = doc.data().saldo
            if(saldo >= 0){
            saldo -= parseInt(this.valorPagar)
            firebase.firestore().collection(`users`).doc(uid).update({saldo: saldo})
            alert ('Pagamento efetuado com Sucesso!')
            }else{
              alert('Voce não tem saldo o suficiente para realizar esse pagamento. \n\n Faça um deposito primeiro.')
            } 
          })
        }else{
          alert('Por favor inserir um valor entre $KA 10 e $KA 15.000')
        }
      }
  }
};
</script>

 <style scoped>
 input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;   
}
.pagar {
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
 