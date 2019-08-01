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
                        <div class="form_enter_data">
                            <input class="field" v-model="extraLessons" type="number" placeholder="Введите количество дополнительных уроков" required>
                            <input class="field" v-model="PBLorOpenLesson" type="number" placeholder="Введите количество ПБЛ или Открытых уроков" required>
                            <input class="field" v-model="dailyPlan" type="number" placeholder="Введите количество Поурочных планов" required>
                            <input class="field" v-model="otherLesssonsVisit" type="number" placeholder="Введите количество посещения других уроков" required>
                            <input class="field" v-model="Edupage" type="number" placeholder="Введите количество оценок в Едупэйдже" required>
                            <input class="field" v-model="IDCard" type="number" placeholder="Введите ID карту" required>
                            
                            <v-date-picker
                                mode='range'
                                v-model='myRange'
                                show-caps>
                            </v-date-picker>
                            
                            
                            
                            <button class="btn" @click="Submit">Submit</button>

                        </div>
                    </div>

            </div>
        </div>
    </main>
    </div>
</template>
<script>
import firebase from "firebase"
import moment from "moment"
import { store } from '../main'
export default {
    name: 'enterData',
    data(){
        return{
            name: firebase.auth().currentUser.displayName,
            extraLessons: "",
            PBLorOpenLesson: "",
            dailyPlan: "",
            otherLesssonsVisit: "",
            Edupage: "",
            IDCard: "",
            myRange: {},
            
            
        }
    },
    // firebase: {
    //     store: firebase.database().ref('teachers')
    // },
    methods:{
        
        Signout(){
            firebase.auth().signOut()
            this.$router.replace("/login")
        },
        Submit(){
            console.log("hello")
            // firebase.database().ref("teachers").push({title: "hello", name: "there"})
            store.ref("teachers").child(this.name).push({
                
                extraLessons: this.extraLessons*10,
                PBLorOpenLesson: this.PBLorOpenLesson*10,
                dailyPlan: this.dailyPlan*10,
                otherLesssonsVisit: this.otherLesssonsVisit*10,
                Edupage: this.Edupage*10,
                IDCard: this.IDCard*10,
                startDate:{
                    day: this.startDay,
                    month: this.startMonth,
                    year: this.startYear
                },
                endDate:{
                    day: this.endDay,
                    month: this.endMonth,
                    year: this.endYear
                },
                

                

                
                })
                alert("Ваши данные добавлены")
                this.extraLessons = ""
                this.PBLorOpenLesson = ""
                this.dailyPlan = ""
                this.Edupage = ""
                this.otherLesssonsVisit = ""
                this.IDCard = ""
                this.myRange = {}
            
        }
    },
    computed:{
        uakyt(){
             
            var d = new Date(this.myRange.start).getDate();
            var m = new Date(this.myRange.start).getMonth()+1;
            var y = new Date(this.myRange.start).getFullYear();
            return d+"."+m+"."+y
            
        },
        vremya(){
            
            var d = new Date(this.myRange.end).getDate();
            var m = new Date(this.myRange.end).getMonth()+1;
            var y = new Date(this.myRange.end).getFullYear();
            return d+"."+m+"."+y
            
        },
        startDay(){
            return new Date(this.myRange.start).getDate();
        },
        startMonth(){
            return new Date(this.myRange.start).getMonth()+1;
        },
        startYear(){
            return new Date(this.myRange.start).getFullYear();
        },
        endDay(){
            return new Date(this.myRange.end).getDate();
        },
        endMonth(){
            return new Date(this.myRange.end).getMonth()+1;
        },
        endYear(){
            return new Date(this.myRange.end).getFullYear();
        },
        

    }
}
</script>
<style scoped>
.popover-container input{
    margin: 10px 0px;
    width: 97.6%;
    padding: 10px 0px;
    padding-left: 10px;
    font-size: 20px;
    border: 1px solid #979797;
    border-radius: 4px;
}
</style>
