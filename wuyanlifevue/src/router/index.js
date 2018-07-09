import Vue from 'vue'
import Router from 'vue-router'

const wyArtMuseumAppointmentCenter = () =>
	import('../components/wyArtMuseumAppointmentCenter.vue')
const wyArtMuseumAppointmentDetail = () =>
	import('../components/wyArtMuseumAppointmentDetail.vue')
const wyArtMuseumAppointmentAdd = () =>
	import('../components/wyArtMuseumAppointmentAdd.vue')
const wyRegister = () =>
	import('../components/wyRegister.vue')

const wyCellStorageAppointmentCenter = () =>
	import('../components/wyCellStorageAppointmentCenter.vue')
const wyCellStorageAppointmentAdd = () =>
	import('../components/wyCellStorageAppointmentAdd.vue')
const selectTest = () =>
	import('../components/select.vue')

const wyCellStorageAppointmentDetail = () =>
	import('../components/wyCellStorageAppointmentDetail.vue')

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/wyArtMuseumAppointmentCenter',
			name: 'wyArtMuseumAppointmentCenter',
			component: wyArtMuseumAppointmentCenter,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyCellStorageAppointmentCenter',
			name: 'wyCellStorageAppointmentCenter',
			component: wyCellStorageAppointmentCenter,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyArtMuseumAppointmentDetail',
			name: 'wyArtMuseumAppointmentDetail',
			component: wyArtMuseumAppointmentDetail,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyArtMuseumAppointmentAdd',
			name: 'wyArtMuseumAppointmentAdd',
			component: wyArtMuseumAppointmentAdd,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyCellStorageAppointmentAdd',
			name: 'wyCellStorageAppointmentAdd',
			component: wyCellStorageAppointmentAdd,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyCellStorageAppointmentDetail',
			name: 'wyCellStorageAppointmentDetail',
			component: wyCellStorageAppointmentDetail,
			meta: {
				reqireLogin: false
			}
		},
		{
			path: '/selectTest',
			name: 'selectTest',
			component: selectTest,
			meta: {
				reqireLogin: false
			}
		}, {
			path: '/wyRegister',
			name: 'wyRegister',
			component: wyRegister,
			meta: {
				reqireLogin: false
			}
		}
	]
})