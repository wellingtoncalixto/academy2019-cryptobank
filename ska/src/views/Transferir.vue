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
        <input v-model="valorTransferir" class="item" autofocus type="text" placeholder="$KA 250,00" />
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
    // transferir(){
    //     let saldo
    //     const uid = firebase.auth().currentUser.uid
    //     if (this.valorTransferir >= 10 && this.valorTransferir <= 15000) {
    //       // pega o usuario logado da coleção e faz a retirada do saldoe atualiza o saldo
    //       firebase.firestore().collection(`users`).doc(uid).get()
    //       .then((doc) => {
    //         saldo = doc.data().saldo
    //         if(saldo > 0 && saldo >= this.valorTransferir){
    //         saldo -= parseInt(this.valorTransferir)
    //         firebase.firestore().collection(`users`).doc(uid).update({saldo: saldo})
    //         // pega o usuario que ira receber a transferencia pelo this.select que veio fo select e faz a adição e update no saldo
    //         firebase.firestore().collection(`users`).where('email', '==', this.select).get()
    //           .then(snapshot => {
    //             snapshot.forEach(doc => {
    //               saldo = doc.data().saldo
    //               let uidtransfer = doc.data().uid
    //               saldo += parseInt(this.valorTransferir)
    //               firebase.firestore().collection(`users`).doc(uidtransfer).update({saldo: saldo})
    //               alert ('Transferencia efetuada com Sucesso!')
    //             })  
    //           })
    //         }else{
    //           alert('Voce não tem saldo o suficiente para realizar essa transferencia. \n\n Faça um deposito primeiro.')
    //         } 
    //       })
    //     }else{
    //       alert('Por favor inserir um valor entre $KA 10 e $KA 15.000')
    //     }
    //   }
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
                      saldoDeb += parseInt(this.valorTransferir)
                      collection.doc(uidDeb).update({saldo: saldoDeb})
                      //só depois de fazer tudo isso ele subtrai o valor da conta do usuario
                      //que esta transferindo e faz o update no saldo
                      saldoUser -= this.valorTransferir
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
  height: 150px;
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
 