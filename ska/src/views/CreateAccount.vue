<template>
  <div class="account">
    <div class="content">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png"> 
      </div>
      <div class="form-control" >
        <form  @submit.prevent="createAccount">
          <div class="input-control">
            <label for="email-input">E-mail</label>
            <input v-model="email" type="email" name="email" id="email-input" class="input" />
          </div>
          <div class="input-control">
            <label for="passoword-input">Password</label>
            <input v-model="password" type="password" name="password" id="password-input" class="input" />
          </div>
          <div class="action">
            <button type="submit" id="new-account-button">Criar Conta</button>
          </div>
          <br />
          <div class="action" style="color:#FFFFFF">
           Já possui conta?<a href="" @click="handleAccount" style="color: white;"> Acessar</a> 
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "nova-conta",
  data: () => ({
    email: '',
    password: '', 
  }),
  methods:{
    createAccount () {
      if (this.password.length >= 6) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(()=>{
          alert('Conta Criada Com Sucesso !')
          this.$router.push({path: '/sarakin'})
        }).catch((error) =>{
          alert('Erro ao criar conta \n\n' + error)
        })  
      }else{
        alert('Insira um email e senha validos ')
      }
    },
    handleAccount(){
      this.$router.push({path: '/login'})
    }
  }
};
</script>

<style scoped>
.account{
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
 