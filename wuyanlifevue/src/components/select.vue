<template>
	<div style="width:100%;">

		<form>
			<input type="text" value="" v-model="name" placeholder="请输入用户名">
			<input type="text" value="" v-model="age" placeholder="请输入年龄">
			<select v-on:change="firstSelect($event)">
				<option v-for="option1 in areaData" v-bind:value="option1.text">{{option1.text}}</option>
			</select>
			<select v-on:change="secondSelect($event)" v-show="isShow">
				<option v-for="option2 in ChengDuArea" v-bind:value="option2.text">{{option2.text}}</option>
			</select>
			<button @click="submitForm($event)">提交</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				A: '四川省成都区',
				B: '新都区',
				name:"",
				age:'',
				isShow: true,
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

		methods: {
			firstSelect(event) {
				this.A = event.target.value;

				if(this.A == "其他" || this.A == "非成都区") {

					this.isShow = false;
				} else {
					this.isShow = true;
				}
				console.log(this.A);
			},
			secondSelect(event) {
				this.B = event.target.value;
				console.log(this.B);
			},
			submitForm(event) {
				event.preventDefault();
				let formData = new FormData();
				console.log("A+B");
				console.log(this.A + this.B);
				formData.append("name",this.name);
				formData.append("age",this.age);
				formData.append("livingArea", this.A + "," + this.B);
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}
				var url = "http://localhost:8081/addArtMuseumAppointment"
				this.$post(url, formData, config).then((data) => {
					console.log(data)
				})
			}
		},
		//		computed: {
		//			selection: function() {
		//				if(this.A == "四川省成都") {
		//					this.isShow = true;
		//					return this.areaData[0].ChengDuArea;
		//				} else {
		//					this.isShow = false;
		//				}
		//			}
		//
		//		},
		create() {}
	}
</script>

<style>

</style>