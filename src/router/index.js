import Vue from 'vue'
import VueRouter from 'vue-router'
import mainview from '../views/mainview.vue'
import AboutUser from '../components/AboutUser.vue'
import AdministratorRecordForm from '../components/AdministratorRecordForm.vue'
import OtherRecordForm from '../components/OtherRecordForm.vue'
import RefuseClassification from '../components/RefuseClassification.vue'
import VehicleManagement from '../components/VehicleManagement.vue'
import WarrantyApproval from '../components/WarrantyApproval.vue'
import AdministratorApproval from '../components/AdministratorApproval.vue'
import UserRecordForm from '../components/UserRecordForm.vue'
import Notice from '../components/Notice.vue'
import HzFilingForm from '../components/HzFilingForm.vue'
import Commodity from '../components/Commodity.vue'
import PurchaseList from '../components/PurchaseList.vue'

import AdministratorVehicleMnagement from '../components/AdministratorVehicleMnagement.vue'
import AdministratorServiceManagement from '../components/AdministratorServiceManagement.vue'
import AdministratorEventUpload from '../components/AdministratorEventUpload.vue'
import UsersForm from '../components/UsersForm.vue'
import LiuHeCunUsers from '../components/LiuHeCunUsers.vue'
import XinLiCunUsers from '../components/XinLiCunUsers.vue'
import MaCunUsers from '../components/MaCunUsers.vue'
import LicensePlateTimeliness from '../components/LicensePlateTimeliness.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
  const routes = [
  {
    path: '/',
    name: 'mainview',
    component: mainview
  },
  
  {
    path: '/home',
    name: 'About',
    meta: {
      requiresAuth:true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/About.vue'),
    children:[
      {
        path: 'AboutUser',
        name: 'AboutUser',
        component: AboutUser,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorRecordForm',
        name: 'AdministratorRecordForm',
        component: AdministratorRecordForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'OtherRecordForm',
        name: 'OtherRecordForm',
        component: OtherRecordForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorRecordForm',
        name: 'AdministratorRecordForm',
        component: AdministratorRecordForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'WarrantyApproval',
        name: 'WarrantyApproval',
        component: WarrantyApproval,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'RefuseClassification',
        name: 'RefuseClassification',
        component: RefuseClassification,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'VehicleManagement',
        name: 'VehicleManagement',
        component: VehicleManagement,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorApproval',
        name: 'AdministratorApproval',
        component: AdministratorApproval,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'UserRecordForm',
        name: 'UserRecordForm',
        component: UserRecordForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'Notice',
        name: 'Notice',
        component: Notice,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'HzFilingForm',
        name: 'HzFilingForm',
        component: HzFilingForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'Commodity',
        name: 'Commodity',
        component: Commodity,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'PurchaseList',
        name: 'PurchaseList',
        component: PurchaseList,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorVehicleMnagement',
        name: 'AdministratorVehicleMnagement',
        component: AdministratorVehicleMnagement,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorServiceManagement',
        name: 'AdministratorServiceManagement',
        component: AdministratorServiceManagement,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'AdministratorEventUpload',
        name: 'AdministratorEventUpload',
        component: AdministratorEventUpload,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'UsersForm',
        name: 'UsersForm',
        component: UsersForm,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'LiuHeCunUsers',
        name: 'LiuHeCunUsers',
        component: LiuHeCunUsers,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'XinLiCunUsers',
        name: 'XinLiCunUsers',
        component: XinLiCunUsers,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'MaCunUsers',
        name: 'MaCunUsers',
        component: MaCunUsers,
        meta: {
          requiresAuth:true
        },
      },
      {
        path: 'LicensePlateTimeliness',
        name: 'LicensePlateTimeliness',
        component: LicensePlateTimeliness,
        meta: {
          requiresAuth:true
        },
      },

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
