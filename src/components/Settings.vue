<template>
    <div>
        
        <main>
        <div id="leftSection">
            <!-- left section -->
            <p>TPA</p>
            <ul id="list">
                
                <router-link to="/dashboard"><li>Панель</li></router-link>
                <router-link to="/graphs"><li>Графики</li></router-link>
                <router-link to="/enterData"><li>Ввести данные</li></router-link>
                <router-link to="/settings"><li>Настройки</li></router-link>
                <a href=""><li @click="Signout">Выйти</li></a>

            </ul>
        </div>
        <div id="rightSection">
            <!-- right section -->
            <div class="wrapper">

                <div id="top">
                    <div id="user">
                        <p>{{name}}</p>
                        <img src="../assets/user.png" alt="">
                    </div>
                </div>

                <div class="container">
                    <div>
                        <p id="totalScore">367</p>
                        <p id="totalScoreTitle"> баллов набрано</p>
                    </div>
                    <p id="fromThat">из них</p>
                    <div class="container_section">
                        <div class="container_left">
                            <div class="statText">
                                <p class="number">39</p>
                                <p class="textTitle">за Дополнительные уроки</p>
                            </div>
                            <div class="statText">
                                <p class="number">89</p>
                                <p class="textTitle">за ПБЛ или Открытый урок</p>
                            </div>
                            <div class="statText">
                                <p class="number">71</p>
                                <p class="textTitle">за Поурочный план</p>
                            </div>
                        </div>
                        <div class="container_right">
                            <div class="statText">
                                <p class="number">00</p>
                                <p class="textTitle">за Посещение других уроков</p>
                            </div>
                            <div class="statText">
                                <p class="number">72</p>
                                <p class="textTitle">за Edupage</p>
                            </div>
                            <div class="statText">
                                <p class="number">96</p>
                                <p class="textTitle">за ID Card</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
    </div>
</template>
<script>
import firebase from "firebase"
export default {
    name: 'settings',
    data(){
        return{
            name: firebase.auth().currentUser.displayName
        }
    },
    methods:{
        
        Signout(){
            firebase.auth().signOut()
            this.$router.replace("/login")
        }
    },
    

}
</script>