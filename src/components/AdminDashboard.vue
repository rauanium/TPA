<template>
    <div>
        <main>
        <div id="leftSection">
            <!-- left section -->
            <p>TPA</p>
            <ul id="list">
                
                <router-link to="/admin-dashboard"><li>Панель</li></router-link>
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
                        <img src="../assets/user_image.svg" alt="">
                    </div>
                </div>

                <div class="container">
                    
                    <div class="adminStats">
                        <div>
                        <v-date-picker
                                    mode='range'
                                    v-model='myRange'
                                    show-caps>
                        </v-date-picker>
                    </div>
                    
                    <table >
                        
                        <tr>
                          <td>Учитель</td>
                          <td>Сумма</td>
                          <td>Дополнительные уроки</td>
                          <td>ПБЛ/Открытый урок</td>
                          <td>Поурочный план</td>
                          <td>Посещение других уроков</td>
                          <td>Edupage</td>
                          <td>ID Card</td>
                        </tr>
                        <tr v-for="value in valueGiver" :key="value.id">
                          <td v-if="value.name != ''">{{value.name}}</td>
                          <td v-if="value.total != ''">{{value.total}}</td>
                          <td v-if="value.extraLessons != ''">{{value.extraLessons}}</td>
                          <td v-if="value.PBLorOpenLesson != ''">{{value.PBLorOpenLesson}}</td>
                          <td v-if="value.dailyPlan != ''">{{value.dailyPlan}}</td>
                          <td v-if="value.otherLesssonsVisit != ''">{{value.otherLesssonsVisit}}</td>
                          <td v-if="value.Edupage != ''">{{value.Edupage}}</td>
                          <td v-if="value.IDCard != ''">{{value.IDCard}}</td>
                        </tr>
                      </table>
                      <download-excel
                        :data   = "valueGiver">
                        Download Data
                        <img id="downloadIcon" src="../assets/download-button.png">
                    </download-excel>

                   
                   
                    
                    
                    
                    
                </div>




                    
                    
                    <div style="visibility: hidden">
                    <p >{{ firebaseGetter}}</p>
                    <hr>
                    </div>
                     <div style="visibility: hidden">
                    <p>{{ totalPoints}}</p>
                    <hr>
                    </div>
                   

                    </div>
                </div>

            </div>
     
    </main>
    </div>
</template>

<script>
import firebase from "firebase"
import { store } from "../main"
import { all } from 'q';
export default {
    name: 'admin-dashboard',
    data(){
        return{
            name: firebase.auth().currentUser.displayName,

            extraLessons: [],
            PBLorOpenLesson: [],
            dailyPlan: [],
            otherLesssonsVisit: [],
            Edupage: [],
            IDCard: [],
            total: [],
            storedData: [],
            userNames: [],
            userValues: [],
            userKeys: [],
            fromCalendar:[],
            fromValueGiver:[],
            
            myRange:{
                start: new Date(2018, 8, 1),
                end: new Date(2019, 5, 30)
            }

        }
    },
    created(){
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.extraLessons.push(snapshot.val().extraLessons))
        store.ref('teachers').orderByKey().on('child_added', snapshot => this.userValues.push(snapshot.val()))
        store.ref('teachers').orderByKey().on('child_added', snapshot => this.userNames.push(snapshot.key))

        for(var i in this.userNames){
            store.ref('teachers').child(this.userNames[i]).on('child_added', snapshot => this.userKeys.push(snapshot.key))
        }
    },

    methods:{
        
        Signout(){
            firebase.auth().signOut()
            this.$router.replace("/admin")
        }
    },
    computed:{
        firebaseGetter(){
            var ar =[]
            var name = ""
            for(var i in this.userNames){
            name = this.userNames[i]
            store.ref("teachers").child(this.userNames[i]).on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // console.log(snapshot.val())
                ar.push({name: name, value: childSnapshot.val()})
                });
            });
            }
            
            return ar

        },
        // userNameFromCalendar(){
        //     var name = ""
        //     var userName = []
        //     for(var i in  this.userNames){
        //         for(var j in this.fromCalendar){
        //             if(this.userNames[i] == this.fromCalendar[j].name){
        //                 name = this.userNames[i]
        //             }
        //         }
        //         userName.push(name)
                
        //         console.log(name + "hello")
                
        //     }
        //     // console.log(userName)
        //     return userName
            

        // },
        valueGiver(){
            
            // var key = []
            // var value = []
            // for(var i in this.userNames){
            //     store.ref('teachers').child(this.userNames[i]).on('value', snapshot => value.push(snapshot.val()))
            //     store.ref('teachers').child(this.userNames[i]).on('child_added', snapshot => key.push(snapshot.key))
            //     }

            var el = 0
            var dp = 0
            var ed = 0
            var id = 0
            var olv = 0
            var pbl = 0
            var name = ""
            var total = []
            var sum = 0
            
            for(var i in this.userNames){
                
                el = 0
                dp = 0
                ed = 0
                id = 0
                olv = 0
                pbl = 0
                total = []
                sum = 0
                name = ""
                for(var j in this.fromCalendar){
                    
                    if(this.fromCalendar[j].name == this.userNames[i]){
                        // console.log(this.fromCalendar[j].value)
                        el += this.fromCalendar[j].value.extraLessons
                        dp += this.fromCalendar[j].value.dailyPlan
                        ed += this.fromCalendar[j].value.Edupage
                        id += this.fromCalendar[j].value.IDCard
                        olv += this.fromCalendar[j].value.otherLesssonsVisit
                        pbl += this.fromCalendar[j].value.PBLorOpenLesson
                        name = this.userNames[i]
                            
                    }
                }
                
                sum = el+dp+ed+id+olv+pbl
                console.log(sum + " " + name)
                this.fromValueGiver.push({
                    name: name,
                    total: sum,
                    Edupage: ed,
                    dailyPlan: dp,
                    IDCard: id,
                    otherLesssonsVisit: olv,
                    PBLorOpenLesson: pbl,
                    extraLessons: el,
                    })
                console.log(total)
            }
            
            return this.fromValueGiver
        },  
 

        
       
        totalPoints(){
           

            var selectedStartDay = new Date(this.myRange.start).getDate()
            var selectedStartMonth = new Date(this.myRange.start).getMonth()+1
            var selectedStartYear = new Date(this.myRange.start).getFullYear()
            
            var selectedEndDay = new Date(this.myRange.end).getDate()
            var selectedEndMonth = new Date(this.myRange.end).getMonth()+1
            var selectedEndYear = new Date(this.myRange.end).getFullYear()

            this.fromCalendar = []
            this.fromValueGiver = []

            

            for(var i in this.firebaseGetter){
                if(selectedStartYear <= this.firebaseGetter[i].value.startDate.year
                && selectedEndYear >= this.firebaseGetter[i].value.endDate.year
                && selectedStartMonth <= this.firebaseGetter[i].value.startDate.month
                && selectedEndMonth >= this.firebaseGetter[i].value.endDate.month
                && selectedStartDay <= this.firebaseGetter[i].value.startDate.day
                && selectedEndDay >= this.firebaseGetter[i].value.endDate.day){
                    console.log("its goood ")
                    this.fromCalendar.push({name: this.firebaseGetter[i].name, value: this.firebaseGetter[i].value})




                    
                }
                else if(selectedStartYear <= this.firebaseGetter[i].value.startDate.year
                && selectedEndYear >= this.firebaseGetter[i].value.endDate.year
                && selectedStartMonth < this.firebaseGetter[i].value.startDate.month
                && selectedEndMonth >= this.firebaseGetter[i].value.endDate.month
                && selectedStartDay >= this.firebaseGetter[i].value.startDate.day
                && selectedEndDay >= this.firebaseGetter[i].value.endDate.day){
                    console.log("november ")
                    this.fromCalendar.push({name: this.firebaseGetter[i].name, value: this.firebaseGetter[i].value})
                    
                    





                }
                else if(selectedStartYear <= this.firebaseGetter[i].value.startDate.year
                && selectedEndYear > this.firebaseGetter[i].value.endDate.year
                && selectedStartMonth < this.firebaseGetter[i].value.startDate.month
                && selectedEndMonth < this.firebaseGetter[i].value.endDate.month
                // && selectedStartDay >= this.storedData[i].startDate.day
                // && selectedEndDay >= this.storedData[i].endDate.day
                ){
                    console.log("november2 ")
                    this.fromCalendar.push({name: this.firebaseGetter[i].name, value: this.firebaseGetter[i].value})
                    
                    




                }
                else if(selectedStartYear < this.firebaseGetter[i].value.startDate.year
                && selectedEndYear >= this.firebaseGetter[i].value.endDate.year
                && selectedStartMonth > this.firebaseGetter[i].value.startDate.month
                && selectedEndMonth >= this.firebaseGetter[i].value.endDate.month){
                    console.log("january ")
                    this.fromCalendar.push({name: this.firebaseGetter[i].name, value: this.firebaseGetter[i].value})
                    
                    





                }
                else{
                    console.log("its baaad ")
                }
            }
            return "hello"
            
        },
   
    }
}
</script>

<style>
.popover-container input{
    margin: 10px 0px;
    width: 32%;
    padding: 10px 0px;
    padding-left: 10px;
    font-size: 20px;
    border: 1px solid #979797;
    border-radius: 4px;
}
#downloadIcon{
    width: 30px;
    height: 30px;
    margin-left: 10px;
}
#export_1551416020137{
    margin-top: 20px;
}

/* ar.push({
                    name: name,
                    Edupage: childSnapshot.val().Edupage,
                    extraLessons: childSnapshot.val().extraLessons,
                    dailyPlan: childSnapshot.val().dailyPlan,
                    PBLorOpenLesson: childSnapshot.val().PBLorOpenLesson,
                    otherLesssonsVisit: childSnapshot.val().otherLesssonsVisit,
                    IDCard: childSnapshot.val().IDCard,
                    startDate:{
                        day: childSnapshot.val().startDate.day,
                        month: childSnapshot.val().startDate.month,
                        year: childSnapshot.val().startDate.year,

                    },
                    endDate:{
                        day: childSnapshot.val().endDate.day,
                        month: childSnapshot.val().endDate.month,
                        year: childSnapshot.val().endDate.year,

                    } */
</style>




