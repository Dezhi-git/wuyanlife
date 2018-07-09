<template lang="html">
	<div class="tf-container" ref='tfContainer'>

		<tfHeader title="首次登陆，请绑定手机号码" :show-goback="true" :show-center="false"></tfHeader>

		<div class="add-topic-tab">
			<span class="topic-tab-title">姓名：</span>
			<input type="text" v-model="verification.name" required="required" /><br />
			<span class="topic-tab-title">性别：</span>
			<!--<input type="radio" v-model="verification.sex" value="男"/>男
			<input type="radio" v-model="verification.sex" value="女"/>女-->
			<input type="text" v-model="verification.sex" />

			<input type="date" v-model="verification.birthday" placeholder="请输入出生日期" />
			<input type="text" v-model="verification.cardNumber" placeholder="请输入身份证号" />
			<input class="input-box" type="text" id="txtMobile" v-bind:readonly="enabletxtmobile" placeholder="请输入手机号码" v-model="verification.mobile" @focus="removeErrorClass"> &nbsp;&nbsp;
			<button class="add-btn" @click="getVerifyCode">{{messsage}}</button>
		</div>
		<div class="add-topic-tab">
			<span class="topic-tab-title">验&nbsp;&nbsp;证&nbsp;&nbsp;码：</span>
			<input class="input-box" type="text" id="txtVerifyCode" placeholder="请输入验证码" v-model="verification.verifyCode" @focus="removeErrorClass">
		</div>

		<div style="text-align:center;padding-top:20px;">
			<button class="add-btn" @click="register">确定</button>
		</div>

	</div>
</template>

<script>
	import tfHeader from './tfHeader.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				enabletxtmobile: false,
				messsage: '获取验证码',
				verification: {
					mobile: '',
					verifyCode: '',
					wxOpenId: '',
					name: '',
					sex: '',
					birthday: '',
					cardNumber: ''
				}
			}
		},
		methods: {
			getVerifyCode: function() {
				var url = "http://localhost:8081/getVerifyCode"
				if(this._check1()) {
					this.$post(url, {
						mobile: this.verification.mobile
					}).then((data) => {
						if(data.status == "success") {
							console.log(data)
							this.messsage = '已發送，請等待'
						} else {
							this.messsage = "獲取驗證碼失敗"
						}
					})
				} else {
					this.messsage = "手機號不正確"
				}
			},
			register: function() {
				console.log(this.verification)
				var url = "http://localhost:8081/register";
				if(this._check2()) {
					this.$post(url, {
						name: this.verification.name,
						birthday: this.verification.birthday,
						cardNumber: this.verification.cardNumber,
						telephone: this.verification.mobile,
						verifyCode: this.verification.verifyCode,
						sex: this.verification.sex,
						wxOpenId: this.$route.params.wxOpenId //todo need test
					}).then((data) => {
						var msg = "registerFailed"
						if(data.status == "success") {
							msg = "registerSuccess";
						}
						//todo need test
						this.$router.push({
							name: 'wyArtMuseumAppointmentCenter', //todo
							params: {
								msg: msg
							}
						})

					})
				}
			},
			_check1: function() {
				let container = this.$refs.tfContainer
				let txtmobile = container.querySelector('#txtMobile')
				if(this.verification.mobile === '' || this.verification.mobile.length !== 11) {
					txtmobile.classList.add('error-border')
				} else {
					return true
				}
				return false
			},
			_check2: function() {
				let container = this.$refs.tfContainer
				let txtverifycode = container.querySelector('#txtVerifyCode')
				if(this.verification.verifyCode === '' || this.verification.verifyCode.length !== 6) {
					txtverifycode.classList.add('error-border')
				} else {
					return true
				}
				return false
			},
			removeErrorClass: function(e) {
				e.target.classList.remove('error-border')
			}
		},
		components: {
			tfHeader
		}
	}
</script>

<style lang="scss">
	@import "../assets/scss/common.scss";
	@import "../assets/scss/reset.css";
	.tf-container {
		height: 100%;
		background-color: $white;
		// padding-top: 45px;
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