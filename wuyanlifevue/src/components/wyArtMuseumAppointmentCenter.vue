<template lang="html">
	<div class="tf-container" ref='tfContainer'>

		<tfHeader title="艺术馆预约" :show-goback="false" :show-center="true"></tfHeader>
		<div>{{deleteOrAddMsg}}</div>
		<div>{{msg}}</div>
		<div id="mycards" style="height:800px;overflow-y:auto;">
			<div id="tool">
				<span style="color:black;font-size:16px;float:right;font-style:italic;">
					<a href="javascript:void(0);" @click="addArtMuseumAppoinment($event);">{{addAppointment}}</a>
				</span>
			</div>
			<div class="add-topic-tab" v-for="appointment in appointments" style="width:100%;">
				<router-link :to="{ name: 'wyArtMuseumAppointmentDetail', params: {id : appointment.id} }" style="width:100%;">
					<div style="width:100%; padding:10px;border:1px solid darksalmon;border-radius: 5px;text-align:left;">
						<span style="color:black;font-size:16px;font-weight:bold;">同行人数：{{appointment.totalNumber}}</span><br />
						<span style="color:black;font-size:16px;">同行人关系：{{appointment.relationShip}}</span><br />
						<span style="color:black;font-size:16px;font-style:italic;">有无未成年人同行：{{appointment.minor}}</span> <br /><br />
						<span style="color:black;font-size:16px;font-weight:bold;">参观日期：{{appointment.visitDate}}</span>
						<span style="color:black;font-size:16px;font-weight:bold;">预约日期：{{appointment.appointmentDate}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="javascript:void(0);" >{{viewAppointment}}</a>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import tfHeader from './tfHeader.vue'
	import wyArtMuseumAppointmentAdd from './wyArtMuseumAppointmentAdd.vue'
	import axios from 'axios'
	import $ from 'jquery'

	export default {
		data() {
			return {
				wxCode: '',
				wxOpenId: '',
				mobile: '',
				deleteOrAddMsg: "",
				msg: "",
				addAppointment: "添加预约",
				viewAppointment: "查看",
				currentView: '',
				appointments: [] //todo
				//				appointments: [{
				//						id: 1,
				//						totalNumber: 2,
				//						relationShip: "父母,朋友",
				//						minor: '是',
				//						visitDate: '2018-09-12',
				//						appointmentDate: '2018/01/01'
				//					},
				//					{
				//						id: 2,
				//						totalNumber: 3,
				//						relationShip: "父母,朋友",
				//						minor: '是',
				//						visitDate: '2018-09-12',
				//						appointmentDate: '2018/01/01'
				//					}
				//				]

			}
		},
		methods: {

			login() {
				var message = this.$route.params.msg;
				var wxCode = this.$route.query.code;

				if(message == "deleteFailed") {
					this.deleteOrAddMsg = "取消预约失败！";
				}

				if(message == "deleteSuccess") {
					this.deleteOrAddMsg = "取消预约成功！";
				}

				if(message == "addFailed") {
					this.deleteOrAddMsg = "预约失敗！";
				}
				if(message =="addSuccess") {
					this.deleteOrAddMsg = "預約成功！";
				}
				
				if(message =="registerFailed"){
					this.deleteOrAddMsg = '註冊失敗'
				}
				if(message == "registerSuccess"){
					this.deleteOrAddMsg ="註冊成功"
				}
				if(!!wxCode) {
					var url = "http://localhost:8081/getWxOpenId";
					this.$post(url, {
						code: wxCode,
						type: 0 //艺术馆预约
					}).then((data) => {
						console.log(data);
						var wxOpenId = data.data.wxOpenId;

						window.localStorage.setItem("wxOpenId", wxOpenId);
						if(data.status == "success") {
							if(data.data.isRegistered) {
								if(!!data.data.appointments) {
									data.data.appointments.forEach((value, index) => {
										this.appointments.push(value);
									});
								} else {
									//没有预约记录
									this.msg = "没有预约记录";
								}
							} else {
								//跳转注册
								this.$router.push({
									name: 'register', //todo
									params: {
										wxOpenId: wxOpenId
									}
								})
							}
						} else {
							//请求出错
							this.msg = data.remark;
						}
					})
				} else {
					let wxOpenId = window.localStorage.getItem('wxOpenId');
					//					console.log(wxOpenId);
					if(!!wxOpenId) {
						//获取列表数据
						var url = "http://localhost:8081/loadArtMuseumAppointmentList";
						this.$post(url, {
							wxOpenId: wxOpenId
						}).then((data) => {

							if(data.status == "success") {

								if(!!data.data) {

									data.data.forEach((value, index) => {
										this.appointments.push(value);
									});
								} else {
									this.msg = data.remark;
								}
							} else {
								this.msg = data.remark;
							}
						})
					} else {
						//code openid 均无 重新授权 todo
						window.location.href = "http://localhost:8081/test";
					}
				}
			},
			addArtMuseumAppoinment: function(envent) {
				this.$router.push({
					name: 'wyArtMuseumAppointmentAdd',
				})
			}
			
		},
		created() {
			//todo
			this.login()
		},
		components: {
			tfHeader,
			wyArtMuseumAppointmentAdd
		}

	}
</script>

<style lang="scss">
	@import "../assets/scss/common.scss";
	#tool {
		margin-right: 120px;
	}
	
	.tf-container {
		background-color: $white;
		padding-top: 45px;
		.input-box {
			height: 25px;
			padding: 2px;
		}
		.add-topic-tab {
			padding: $padding;
			display: flex;
			text-align: center;
			font-size: $font-tag;
			min-height: 54px; //此最小高度限制是为了解决 选择tab时，高度坍塌的问题
			border-bottom: 1px solid #dddddd;
			.topic-tab-title {
				font-size: $font-content;
				font-weight: 600;
				height: 22px;
				line-height: 22px;
			}
			.topic-tab {
				flex: 1;
				position: relative;
				border: 1px solid #dddddd;
				margin: 0 $padding;
				box-sizing: content-box;
				height: 20px;
				line-height: 20px;
				&.show-tab {
					.tabs {
						max-height: 1000px;
					}
					.fa {
						transform: rotateZ(90deg);
					}
				}
				.tabs {
					position: absolute;
					top: 25px;
					width: 100%;
					text-align: center;
					border-radius: 0 0 10px 10px;
					max-height: 0;
					overflow: hidden;
					transition: all 0.5s ease;
					.tab-item {
						padding: 5px 0;
						background-color: #cccccc;
						&:not(:last-of-type) {
							border-bottom: 1px solid $white;
						}
					}
				}
				.tab-text {
					width: 100%;
					display: block;
					height: 20px;
					line-height: 20px;
				}
				.fa {
					position: absolute;
					right: 0;
					top: 0;
					transition: all 0.5s ease;
					&::before {
						display: block;
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
					}
				}
			}
			.add-btn {
				width: 90px;
				color: white;
				text-align: center;
				background-color: $color42b;
				border-radius: $radius;
				height: 25px;
				line-height: 25px;
			}
		}
		.add-title {
			padding: $padding;
			border-bottom: 1px solid #dddddd;
			input {
				width: 100%;
				border-radius: $radius;
				line-height: 20px;
				padding: 5px;
			}
		}
		.add-content {
			padding: $padding;
			height: calc(100vh - 165px);
			textarea {
				width: 100%;
				height: 100%;
				border-radius: $radius;
				padding: 5px;
			}
		}
		.error-border {
			border: 1px solid red;
		}
	}
</style>