<template lang="html">
	<div class="membercard-container" ref='membercardContainer'>

		<tfHeader title="细胞存储预约详细信息" :show-goback="true" :show-center="false"></tfHeader>
		<div>{{msg}}</div>
		<div id="mycard" style="height:800px;overflow-y:auto;">
			<table>
				<tr>
					<td class="tittle-td">姓名：</td>
					<td>{{name}}</td>
				</tr>
				<tr>
					<td class="tittle-td">出生年月：</td>
					<td>{{birthday}}</td>
				</tr>
				<tr>
					<td class="tittle-td">性别：</td>
					<td>{{sex}}</td>
				</tr>
				<tr>
					<td class="tittle-td">身份证号码：</td>
					<td>{{cardNumber}}</td>
				</tr>

				<tr>
					<td class="tittle-td">联系电话：</td>
					<td>{{telephone}}</td>
				</tr>
				<tr>
					<td class="tittle-td">个人行业：</td>
					<td>{{personalIndustry}}</td>
				</tr>
				<tr>
					<td class="tittle-td">希望了解知识：</td>
					<td>{{intention}}</td>
				</tr>
				<tr>
					<td class="tittle-td">居住区域：</td>
					<td>{{livingArea}}</td>
				</tr>
				<tr>
					<td class="tittle-td">存储项目：</td>
					<td>{{cellStorageProject}}</td>
				</tr>
				<tr>
					<td class="tittle-td">同行人数：</td>
					<td>{{totalNumber}}</td>
				</tr>
				<tr>
					<td class="tittle-td">同行人关系：</td>
					<td>{{relationShip}}</td>
				</tr>
				<tr>
					<td class="tittle-td">有无未成年人同行：</td>
					<td>{{minor}}</td>
				</tr>
				<tr>
					<td class="tittle-td">参观日期：</td>
					<td>{{visitDate}}</td>
				</tr>
				<tr>
					<td class="tittle-td">预约日期：</td>
					<td>{{appointmentDate}}</td>
				</tr>

			</table>

			<nav>
				<a href="javascript:void(0);" v-on:click="deleteAppointment">{{cancelAppointment}}</a>
				<a href="javascript:void(0);" v-on:click="closeAppointment">{{close}}</a>
			</nav>

		</div>
	</div>

</template>

<script>
	import tfHeader from './tfHeader.vue'
	import axios from 'axios'

	export default {
		data() {
			return {
				name: '',
				birthday: '',
				sex: '',
				cardNumber: '',
				telephone: '',
				personalIndustry: '',
				intention: '',
				livingArea: '',
				totalNumber: '',
				relationShip: "",
				minor: '',
				visitDate: '',
				appointmentDate: '',
				cellStorageProject:'',
				cancelAppointment: '取消预约',
				msg: '',
				close: '关闭'
			}
		},
		created() {
			this.getCellStorageAppointmentDetail()
		},

		methods: {
			getCellStorageAppointmentDetail() {
				console.log(this.$route.params.id);
				var url = "http://localhost:8081/getAppointment";
				this.$post(url, {
					'id': this.$route.params.id,
					//					'id': '6b3e5b90657e4c4aa93638a2c24c073f'
				}).then((data) => {
					console.log(data.data);
					if(data.status == "success") {
						this.name = data.data.name;
						this.birthday = data.data.birthday;
						this.sex = data.data.sex;
						this.cardNumber = data.data.cardNumber;
						this.telepnone = data.data.telephone;
						this.personalIndustry = data.data.personalIndustry;
						this.intention = data.data.intention;
						this.livingArea = data.data.livingArea;
						this.totalNumber = data.data.totalNumber;
						this.relationShip = data.data.relationShip;
						this.minor = data.data.minor;
						this.visitDate = data.data.visitDate;
						this.appointmentDate = data.data.appointmentDate;
						this.cellStorageProject = data.data.cellStorageProject;
					} else {
						this.msg = "查看预约失败！"
					}

				})
			},

			deleteAppointment: function(envent) {
				var url = "http://localhost:8081/deleteAppointment";
				this.$post(url, {
					id: this.$route.params.id
					//					id: '1'
				}).then((data) => {
					console.log(data);
					var msg = "deleteFailed";

					if(data.status == "success") {
						msg = "deleteSuccess";
					}
					this.$router.push({
						name: 'wyCellStorageAppointmentCenter',
						params: {
							msg: msg
						}
					})
				})
			},

			closeAppointment: function(envent) {
				console.log("cell close")
				this.$router.push({
					name: 'wyCellStorageAppointmentCenter'
				})
			}
		},

		components: {
			tfHeader
		}
	}
</script>

<style lang="scss">
	@import "../assets/scss/common.scss";
	.membercard-container {
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
		.tittle-td {
			float: left;
		}
	}
</style>