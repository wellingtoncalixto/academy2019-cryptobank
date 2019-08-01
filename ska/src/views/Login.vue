<template>
  <div class="login">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="form-control">
        <form @submit.prevent="singInAccount">
          <div class="input-control">
            <label for="email-input">E-mail</label>
            <input v-model="email" type="email" name="email" id="email-input" class="input" />
          </div>
          <div class="input-control">
            <label for="passoword-input">Password</label>
            <input v-model="password" type="password" name="password" id="password-input" class="input"/>
          </div>
          <div class="action">
            <button type="submit" id="sing-button">Entrar</button>
          </div>
          <br />
          <div class="action" style="color:#FFFFFF">
           Novo usuário? <a href="#" @click="handleNewAccount" style="color: white;"> Criar conta</a> 
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase';
firebase.collection('users').get()
 .then((snapshot) => {
   snapshot.forEach((doc) => {
     console.log(doc.id, '=>', doc.data());
   });
 })
 .catch((err) => {
   console.log('Error getting documents', err);
 });
export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    singInAccount() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Bem Vindo " + this.email);
          this.$router.push({path: "/sarakin"})
        })
        .catch(error => {
          alert("Erro ao Realizar o Login" + error);
        });
    },
    handleNewAccount() {
      this.$router.push({path: "/create-account" });
    },
  }
};
</script>

 <style scoped>
.login{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 200px;
    font-family: 'Roboto', sans-serif;
}
.input-control{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.input-control > label{
    color: white;
    margin-top: 20px;
    margin-bottom: 5px;
}
.input-control > input{
    height: 45px;
    border: none;
    border-radius: 5px;
}
.action{
    display: flex;
    justify-content: center;
}
.action > button{
    margin-top: 40px;
    width: 100px;
    height: 45px;
    color:white;
    background-color: #FA7268;
    border: none;
    border-radius: 5px;
}
</style>
 