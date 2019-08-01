<template>
  <div class="home">
    <div class="content">
      <input type="email" placeholder="enter email" class="field" v-model="email"><br>
      <input type="password" placeholder="enter passowrd" class="field" v-model="password"><br>
      <button class="btn" @click="Login">Submit</button>
      
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: 'admin',
  data(){
    return{
      email: "",
      password: ""
    }
  },
  methods:{
    Login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {this.$router.replace('/admin-dashboard')},
        err => { alert("Ooops " + err.message)}
                  
          
      )
    
    },
  }
}

</script>



<style scoped>
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
}
.btn{
  padding: 10px 0px;
  width: 300px;
}
</style>

