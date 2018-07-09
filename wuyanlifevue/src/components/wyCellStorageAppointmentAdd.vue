<template lang="html">
	<div class="membercard-container" ref='membercardContainer'>
		<!--<tfHeader title="艺术馆参观预约" :show-goback="true" :show-center="false"></tfHeader>-->
		<div>{{appointmentNumberMsg}}</div>
		<div id="mycard" style="height:800px;overflow-y:auto;">
			<form id="form">
				<div class="div-ui">
					<label for="personalIndustry">个人行业:</label>
					<input id="personalIndustry" v-model="personalIndustry" type="text" required />
				</div>

				<div class="div-ui">
					<label for="livingArea">居住区域:</label>
					<select v-on:change="firstSelect($event)">
						<option v-for="option1 in areaData" v-bind:value="option1.text">{{option1.text}}</option>
					</select>
					<select v-on:change="secondSelect($event)" v-show="isShow">
						<option v-for="option2 in ChengDuArea" v-bind:value="option2.text">{{option2.text}}</option>
					</select>
				</div>
				<div class="div-ui">
					<label for="intention">希望了解知识：</label>
					<div>
						<label for="kn1">细胞储存</label>
						<input v-model="intention" id='kn1' value='细胞储存' type="checkbox" required>
						<label for="kn2">基因解密</label>
						<input v-model="intention" id='kn2' value='基因解密' type="checkbox" required>
						<label for="kn3">生命健康</label>
						<input v-model="intention" id='kn3' value='生命健康' type="checkbox" required>
						<label for="kn4">慢病管理</label>
						<input v-model="intention" id='kn4' value='慢病管理' type="checkbox" required>
						<label for="kn5">再生医学</label>
						<input v-model="intention" id='kn5' value='再生医学' type="checkbox" required>
						<label for='kn6'>其他</label>
						<input v-model="intention" id='kn6' value='其他' type="checkbox" required>
					</div>
				</div>
				<div>
					<label for="cellStorageProject">存儲項目：</label>
					<label for="cs1">免疫细胞</label>
					<input v-model="cellStorageProject" id='cs1' value='免疫细胞' type="checkbox" required>
					<label for="cs2">胎盘干细胞</label>
					<input v-model="cellStorageProject" id='cs2' value='胎盘干细胞' type="checkbox" required>
					<label for="cs3"> 脐带干细胞</label>
					<input v-model="cellStorageProject" id='cs3' value=' 脐带干细胞' type="checkbox" required>
					<label for="cs4">牙髓干细胞</label>
					<input v-model="cellStorageProject" id='cs4' value='牙髓干细胞' type="checkbox" required>
					<label for="cs5">脂肪干细胞</label>
					<input v-model="cellStorageProject" id='cs5' value='脂肪干细胞' type="checkbox" required>
					<label for='cs6'>子宫内膜干细胞</label>
					<input v-model="cellStorageProject" id='cs6' value='子宫内膜干细胞' type="checkbox" required>
				</div>
				<div class="div-ui">
					<div>
						<label for="totalNumber">同行人数:</label>
						<input id="totalNumber" v-model="totalNumber" type="radio" value="1" required />1
						<input id="totalNumber" v-model="totalNumber" type="radio" value="2" required />2
						<input id="totalNumber" v-model="totalNumber" type="radio" value="3" required />3
					</div>

					<div>
						<label for="relationShip">同行人关系：</label>
						<input v-model="relationShip" type="checkbox" value="伴侣" required />伴侣
						<input v-model="relationShip" type="checkbox" value="朋友" required />朋友
						<input v-model="relationShip" type="checkbox" value="父母" required />父母
						<input v-model="relationShip" type="checkbox" value="子女" required />子女
					</div>

					<div>
						<label for="minor">未成年人：</label>
						<input v-model="minor" type="radio" value="有" required />有
						<input v-model="minor" type="radio" value="无" required />无
					</div>
					<label for="visitDate">参观日期</label>
					<input id='visitDate' type="date" v-model="visitDate" required />
				</div>
				<button @click="submitForm($event)">提交</button>
			</form>
		</div>
	</div>

</template>

<script>
	//	import tfHeader from './tfHeader.vue'
	import axios from 'axios'

	export default {
		data() {
			return {
				appointmentNumberMsg: '',
				A: '四川省成都区',
				B: '新都区',
				isShow: true,
				personalIndustry: '',
				totalNumber: '',
				minor: '',
				visitDate: '',
				relationShip: [],
				cellStorageProject:[],
				intention: [],
				areaData: [{
					"text": "四川省成都区",

				}, {
					"text": "非成都区"
				}, {
					"text": "其他"
				}],
				ChengDuArea: [{
					"text": "新都区"
				}, {
					"text": "青羊区 "
				}, {
					"text": "双流区"
				}, {
					"text": "金牛区"
				}, {
					"text": "青白江区"
				}, {
					"text": "武侯区"
				}, {
					"text": "成华区 "
				}, {
					"text": "锦江区"
				}, {
					"text": "温江区"
				}, {
					"text": "都江堰"
				}, {
					"text": "彭州"
				}, {
					"text": "崇州"
				}, {
					"text": "邛崃"
				}]

			}
		},
		created() {},

		methods: {
			firstSelect(event) {
				this.A = event.target.value;

				if(this.A == "其他" || this.A == "非成都区") {

					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			secondSelect(event) {
				this.B = event.target.value;
			},
			submitForm(event) {
				event.preventDefault();
//				let wxOpenId = window.localStorage.getItem('wxOpenId'); //todo
								let wxOpenId = '1';
				let formData = new FormData();

				formData.append("personalIndustry", this.personalIndustry);
				formData.append("intention", this.intention);
				formData.append("livingArea", this.A + "," + this.B);
				formData.append("totalNumber", this.totalNumber);
				formData.append("relationShip", this.relationShip);
				formData.append("cellStorageProject",this.cellStorageProject);
				formData.append("minor", this.minor);
				formData.append('visitDate', this.visitDate);
				formData.append('wxOpenId', wxOpenId);

				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}
				var url = "http://localhost:8081/addCellStorageAppointment"
				this.$post(url, formData, config).then((data) => {
					console.log(data)
					var msg = "addFailed";

					if(data.status == "success") {
						msg = "addSuccess";
					}
					this.$router.push({
						name: 'wyCellStorageAppointmentCenter',
						params: {
							msg: msg
						}
					})
				})
			}
		}
	}

	components: {
		//		tfHeader
	}
</script>

<style lang="scss">
	@import "../assets/scss/common.scss";
	body {
		height: 780px;
		width: %100;
		background-color: #CCCCCC;
	}
	
	body,
	input,
	textarea {
		font-family: "helvetica", arial, helvetica;
	}
	
	#out {
		background-color: #EEEEEE;
		width: 100%;
		height: 1000px;
		padding: 8px;
	}
	
	.div-ui {
		width: 400px;
		margin: 0, auto;
		padding: 10px;
	}
	
	label {
		display: block;
		float: left;
		clear: left;
		text-align: right;
		width: 200px;
		margin-right: 10px;
	}
	
	fieldset {
		border: 1px solid;
		margin-bottom: 20px;
		margin: 0 auto;
	}
	
	.select-div {
		display: inline-block;
		float: left;
		width: 100px;
	}
</style>