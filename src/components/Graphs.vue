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
                    <div class="adminStats">
                        <v-date-picker
                                    mode='range'
                                    v-model='myRange'
                                    show-caps>
                        </v-date-picker>
                        <GChart
                            type="ColumnChart"
                            :data="chartData"
                            :options="chartOptions"
                        />
                        
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
import { GChart } from 'vue-google-charts'
export default {
    name: 'graphs',
    components:{
        GChart
    },
    data(){
        return{
            
      chartOptions: {
        chart: {
          title: 'Teacher Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      },





            name: firebase.auth().currentUser.displayName,

            extraLessons: [],
            PBLorOpenLesson: [],
            dailyPlan: [],
            otherLesssonsVisit: [],
            Edupage: [],
            IDCard: [],
            total: [],
            storedData: [],
            
            myRange:{
                start: new Date(2018, 8, 1),
                end: new Date(2019, 5, 30)
            }

        }
    },
    created(){
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.extraLessons.push(snapshot.val().extraLessons))
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.PBLorOpenLesson.push(snapshot.val().PBLorOpenLesson))
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.dailyPlan.push(snapshot.val().dailyPlan))
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.otherLesssonsVisit.push(snapshot.val().otherLesssonsVisit))
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.Edupage.push(snapshot.val().Edupage))
        // store.ref('teachers').child(this.name).on('child_added', snapshot => this.IDCard.push(snapshot.val().IDCard))
        store.ref('teachers').child(this.name).on('child_added', snapshot => this.storedData.push(snapshot.val()))

    },

    methods:{
        
        Signout(){
            firebase.auth().signOut()
            this.$router.replace("/login")
        }
    },
    computed:{
        chartData(){
            var exL = this.totalPoints
            return [
                ['Year', 'Extra lessons', 'PBL', 'Daily plan', 'Other lessons visit', 'Edupage', 'ID card'],
                [this.name, this.el, this.pbl, this.dp, this.olv, this.ep, this.id],
                
      ]
        }, 
        el(){
            var result = 0;
            for(var i in this.extraLessons){
                result += this.extraLessons[i]
            }
            return result 
            
        },
        pbl(){
            var result = 0;
            for(var i in this.PBLorOpenLesson){
                result += this.PBLorOpenLesson[i]
            }
            return result
        },
        dp(){
            var result = 0;
            for(var i in this.dailyPlan){
                result += this.dailyPlan[i]
            }
            return result
        },
        olv(){
            var result = 0;
            for(var i in this.otherLesssonsVisit){
                result += this.otherLesssonsVisit[i]
            }
            return result
        },
        ep(){
            var result = 0;
            for(var i in this.Edupage){
                result += this.Edupage[i]
            }
            return result
            
        },
        id(){
            var result = 0;
            for(var i in this.IDCard){
                result += this.IDCard[i]
            }
            return result
        },
        // totalPoints(){
        //     return this.el + this.pbl + this.dp + this.olv + this.ep + this.id
        // },
        test(){
//             var ar = []
//             store.ref("teachers").once('value', function(snapshot) {
//             snapshot.forEach(function(childSnapshot) {
//             ar += childSnapshot.key;
//             console.log(ar)  <------ this shit also works
//   });
// });
            var keys = []
            store.ref("teachers").orderByKey().on("child_added", function(snapshot){
            console.log(snapshot.key);
            keys.push(snapshot.key)

            }); 
            return keys
        },
        // startDate(){
        //     // console.log(this.startHistory)
        //     var selectedStartDay = new Date(this.myRange.start).getDate()
        //     var selectedStartMonth = new Date(this.myRange.start).getMonth()+1
        //     var selectedStartYear = new Date(this.myRange.start).getFullYear()

        //     for(var i in this.storedData){
        //         if(this.storedData[i].startDate.year <= selectedStartYear
        //          && this.storedData[i].startDate.month <= selectedStartMonth
        //          && this.storedData[i].startDate.day <= selectedStartDay
        //          ){
        //             console.log("true")

        //         }else{
        //             console.log("false")
        //         }
                
        //     }
        
        // },
        totalPoints(){
            // && (selectedEndYear >= this.storedData[i].endDate.year
            //     && selectedEndMonth >= this.storedData[i].endDate.month
            //     && selectedEndDay >= this.storedData[i].endDate.day)

            // console.log(this.startHistory)

            var selectedStartDay = new Date(this.myRange.start).getDate()
            var selectedStartMonth = new Date(this.myRange.start).getMonth()+1
            var selectedStartYear = new Date(this.myRange.start).getFullYear()
            
            var selectedEndDay = new Date(this.myRange.end).getDate()
            var selectedEndMonth = new Date(this.myRange.end).getMonth()+1
            var selectedEndYear = new Date(this.myRange.end).getFullYear()

            this.extraLessons = []
            this.PBLorOpenLesson = []
            this.dailyPlan = []
            this.otherLesssonsVisit = []
            this.Edupage = []
            this.IDCard = [] 

            for(var i in this.storedData){
                if(selectedStartYear <= this.storedData[i].startDate.year
                && selectedEndYear >= this.storedData[i].endDate.year
                && selectedStartMonth <= this.storedData[i].startDate.month
                && selectedEndMonth >= this.storedData[i].endDate.month
                && selectedStartDay <= this.storedData[i].startDate.day
                && selectedEndDay >= this.storedData[i].endDate.day){
                    console.log("its goood " + this.storedData[i].startDate.month + " "+ this.storedData[i].endDate.month)
                    this.extraLessons.push(this.storedData[i].extraLessons)
                    this.PBLorOpenLesson.push(this.storedData[i].PBLorOpenLesson)
                    this.dailyPlan.push(this.storedData[i].dailyPlan)
                    this.otherLesssonsVisit.push(this.storedData[i].otherLesssonsVisit)
                    this.Edupage.push(this.storedData[i].Edupage)
                    this.IDCard.push(this.storedData[i].IDCard)
                    
                }
                else if(selectedStartYear <= this.storedData[i].startDate.year
                && selectedEndYear >= this.storedData[i].endDate.year
                && selectedStartMonth < this.storedData[i].startDate.month
                && selectedEndMonth >= this.storedData[i].endDate.month
                && selectedStartDay >= this.storedData[i].startDate.day
                && selectedEndDay >= this.storedData[i].endDate.day){
                    console.log("november "+ this.storedData[i].startDate.month + " "+ this.storedData[i].endDate.month)
                    this.extraLessons.push(this.storedData[i].extraLessons)
                    this.PBLorOpenLesson.push(this.storedData[i].PBLorOpenLesson)
                    this.dailyPlan.push(this.storedData[i].dailyPlan)
                    this.otherLesssonsVisit.push(this.storedData[i].otherLesssonsVisit)
                    this.Edupage.push(this.storedData[i].Edupage)
                    this.IDCard.push(this.storedData[i].IDCard)
                   
                }
                else if(selectedStartYear <= this.storedData[i].startDate.year
                && selectedEndYear > this.storedData[i].endDate.year
                && selectedStartMonth < this.storedData[i].startDate.month
                && selectedEndMonth < this.storedData[i].endDate.month
                // && selectedStartDay >= this.storedData[i].startDate.day
                // && selectedEndDay >= this.storedData[i].endDate.day
                ){
                    console.log("november2 "+ this.storedData[i].startDate.month + " "+ this.storedData[i].endDate.month)
                    this.extraLessons.push(this.storedData[i].extraLessons)
                    this.PBLorOpenLesson.push(this.storedData[i].PBLorOpenLesson)
                    this.dailyPlan.push(this.storedData[i].dailyPlan)
                    this.otherLesssonsVisit.push(this.storedData[i].otherLesssonsVisit)
                    this.Edupage.push(this.storedData[i].Edupage)
                    this.IDCard.push(this.storedData[i].IDCard)
                    
                }
                else if(selectedStartYear < this.storedData[i].startDate.year
                && selectedEndYear >= this.storedData[i].endDate.year
                && selectedStartMonth > this.storedData[i].startDate.month
                && selectedEndMonth >= this.storedData[i].endDate.month){
                    console.log("january " + this.storedData[i].startDate.month + " "+ this.storedData[i].endDate.month)
                    this.extraLessons.push(this.storedData[i].extraLessons)
                    this.PBLorOpenLesson.push(this.storedData[i].PBLorOpenLesson)
                    this.dailyPlan.push(this.storedData[i].dailyPlan)
                    this.otherLesssonsVisit.push(this.storedData[i].otherLesssonsVisit)
                    this.Edupage.push(this.storedData[i].Edupage)
                    this.IDCard.push(this.storedData[i].IDCard)
                    
                }
                else{
                    console.log("its baaad " + this.storedData[i].startDate.month + " "+ this.storedData[i].endDate.month)
                }
            }
            return this.el + this.pbl + this.dp + this.olv + this.ep + this.id

        },
   
    }
}
</script>
<style>
GChart{
    width: 1000px;
}
</style>
