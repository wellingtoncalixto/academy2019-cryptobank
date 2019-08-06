<template >
  <div class="pagar">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="voltar">
        <img @click="handleIndex" src="../assets/left-arrow.png" alt />
        <p>Efetuar Pagamento</p>
      </div>
      <div class="depositar-valor">
        <p class="item">Informe a <strong>quantidade</strong> desejada
        </p>
        <input v-model="valorPagar" class="item" autofocus type="number" placeholder="$KA 0" />
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
            if(saldo > 0){
            saldo -= parseFloat(this.valorPagar)
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #4076ad;
  height: 70px;
}
.voltar p{
  flex:1;
  margin-top:12px;
  text-align: center;
  color: white;
}
.voltar  img{
  width: 16px;
  height: 20px;
  margin-top: 12px;
  margin-left: 10px
}
.depositar-valor{
  display:flex;
  flex-direction:column;
  background-color: white;
  border-radius: 10px;
  margin-top: -30px;
}
.depositar-valor > input{
  border:none;
  height: 150px;
  font-size: 1.5em;
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
 