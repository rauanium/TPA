import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Dashboard from './views/Dashboard.vue'
import Graphs from './components/Graphs.vue'
import EnterData from './components/EnterData.vue'
import Settings from './components/Settings.vue'
import Admin from './components/Admin.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '*',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    // admin part
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: Graphs,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/enterData',
      name: 'enterData',
      component: EnterData,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta:{
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !currentUser) next("login")
  else if(!requiresAuth && currentUser) next("dashboard")
  else next ()

//   if (requiresAuth && !currentUser) {
//     next("login");
//    } else if (requiresAuth && currentUser) {
//     next("home");
//    } else {
//     next();
//    }
// })

//   if(requiresAuth){
//     if(!currentUser){
//       next('login')
//     }else {
//       next()
//     }
//   }else{
//     next()
  // }
})

export default router
