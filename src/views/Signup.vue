<template>
  <div class="home">
    <div class="content">
      <input type="text" placeholder="enter name" class="field" v-model="name"><br>
      <input type="text" placeholder="enter surname" class="field" v-model="surname"><br>
      <input type="email" placeholder="enter email" class="field" v-model="email"><br>
      <input type="password" placeholder="enter passowrd" class="field" v-model="password"><br>
      <button class="btn" @click="Signup">Submit</button>
      <p>У вас уже есть аккаунт? Хотите <router-link to="/login">войти?</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: 'login',  
  data(){
    return{
      name: "",
      surname: "",
      email: "",
      password: "",
      // displayName: name + " " + surname
  }
},
methods:{
  Signup(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
      (user) => {
                  user.user.updateProfile({displayName: this.name + " " + this.surname})
                  this.$router.replace("/dashboard")
                  
                  },
              (err) => {
                  alert("Ooops "+ err.message)
              }
    )

    
  }

}
}
</script>



<style>
*{
  padding: 0px;
  margin: 0px;
  /* border: 1px solid green; */
}
.home{
 display: flex;
 justify-content: center;

}
.content{
  justify-content: center;
  align-items: center;
  padding: 0px auto;
  margin: 0px auto;
}
.field{
  padding: 10px 0px;
  width: 300px;
  margin: 10px 0px;
  justify-content: center;
}
.btn{
  padding: 10px 0px;
  width: 300px;
}
</style>

