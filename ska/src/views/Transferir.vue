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
        <input v-model="valorTransferir" class="item" autofocus type="number" placeholder="$KA 0" />
        <p
          class="item"
          style="color:#333333; font-size:10px;"
        >Digite um valor entre $KA 10,00 e $KA 15.000,00</p>
      </div>
      <div class="selecao-user">
        <p class="item">Para <strong>quem</strong> você deseja <strong>enviar?</strong></p>
        <div class="selecao"> 
        <select v-model="select">
          <option class="item" v-for="email  in emails" :key="email" :value="email">
           {{email}}
          </option>
        </select>
        </div>
        <div class="action">
          <button @click="transferir()">Transferir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "transferir",
  data: () => ({
    valorTransferir: '',
    select: '',
    emails:[],     
  }),
  mounted () {
    const email = firebase.auth().currentUser.email
    console.log(email)
    firebase.firestore().collection(`users`).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.emails.push(doc.data().email)
          const index = this.emails.indexOf(email)
          if (index > -1) {
            this.emails.splice(index,1)
          }
          console.log(this.emails)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  },
  methods: {
    handleIndex() {
      this.$router.push({ path: "/sarakin" });
    },
    transferir(){
      let saldoUser
      let saldoDeb
      const uid = firebase.auth().currentUser.uid
      const collection = firebase.firestore().collection(`users`)
      //confirmando se o valor da Transferencia esta no intevalo de 10 e 15000
      //e pegando o saldo do usuario logado
      if (this.valorTransferir >= 10 && this.valorTransferir <= 15000) {
        collection.doc(uid).get()
          .then((doc) => {
            saldoUser = doc.data().saldo
            //verificando se o saldo é maior que 0 e 
            //se o valor da transferencia não é maior que o saldo atual
            //e em seguida pega o respectivo usuario segundo o email da variavel select
              if(saldoUser > 0 && saldoUser >= this.valorTransferir){
                collection.where('email', '==', this.select).get()
                  .then(snapshot => {
                    snapshot.forEach(doc => {
                      //pega o valor do saldo de quem vai receber a transferencia e o uid dela
                      // depois faz um incremento no saldo
                      saldoDeb = doc.data().saldo
                      const uidDeb = doc.data().uid
                      saldoDeb += parseFloat(this.valorTransferir)
                      collection.doc(uidDeb).update({saldo: saldoDeb})
                      //só depois de fazer tudo isso ele subtrai o valor da conta do usuario
                      //que esta transferindo e faz o update no saldo
                      saldoUser -= parseFloat(this.valorTransferir)
                      collection.doc(uid).update({saldo: saldoUser})
                      //e da um alert de trasferencia realizada
                      alert('Transferencia Realizada com Sucesso!')
                    })  
                  })
              }else{
                alert('Voce não tem saldo o suficiente para realizar essa transferencia. \n\n Faça um deposito primeiro.')
              } 
          })
        }else{
          alert('Por favor inserir um valor entre $KA 10 e $KA 15.000')
        }
    },
  },
}
</script>

 <style scoped>
 input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
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
  margin-top:50px;
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
.selecao-user{
  background-color: rgb(212, 208, 208);
  margin-top: -25px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.selecao-user  p{
 padding-top:10px;
}
.selecao {
  display: flex;
  align-content: center;
  justify-content: center;
}
.selecao > select {
  border:none;
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
}
</style>
 