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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/About.vue'),
    children:[
      {
        path: 'AboutUser',
        name: 'AboutUser',
        component: AboutUser,
      },
      {
        path: 'AdministratorRecordForm',
        name: 'AdministratorRecordForm',
        component: AdministratorRecordForm,
      },
      {
        path: 'OtherRecordForm',
        name: 'OtherRecordForm',
        component: OtherRecordForm,
      },
      {
        path: 'AdministratorRecordForm',
        name: 'AdministratorRecordForm',
        component: AdministratorRecordForm,
      },
      {
        path: 'WarrantyApproval',
        name: 'WarrantyApproval',
        component: WarrantyApproval,
      },
      {
        path: 'RefuseClassification',
        name: 'RefuseClassification',
        component: RefuseClassification,
      },
      {
        path: 'VehicleManagement',
        name: 'VehicleManagement',
        component: VehicleManagement,
      },
      {
        path: 'AdministratorApproval',
        name: 'AdministratorApproval',
        component: AdministratorApproval,
      },
      {
        path: 'UserRecordForm',
        name: 'UserRecordForm',
        component: UserRecordForm,
      },
      {
        path: 'Notice',
        name: 'Notice',
        component: Notice,
      },
      {
        path: 'HzFilingForm',
        name: 'HzFilingForm',
        component: HzFilingForm,
      },
      {
        path: 'Commodity',
        name: 'Commodity',
        component: Commodity,
      },
      {
        path: 'PurchaseList',
        name: 'PurchaseList',
        component: PurchaseList,
      },
      {
        path: 'AdministratorVehicleMnagement',
        name: 'AdministratorVehicleMnagement',
        component: AdministratorVehicleMnagement,
      },
      {
        path: 'AdministratorServiceManagement',
        name: 'AdministratorServiceManagement',
        component: AdministratorServiceManagement,
      },
      {
        path: 'AdministratorEventUpload',
        name: 'AdministratorEventUpload',
        component: AdministratorEventUpload,
      },

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
