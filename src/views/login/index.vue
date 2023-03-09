<template>
	<el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login_main">
		<h3>系统登录</h3>
		<el-form-item label="用户名" prop="user" label-width="80px">
			<el-input type="input" v-model.number="form.user" placeholder="请输入账号"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass" label-width="80px">
			<el-input type="password" v-model="form.pass" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
	name: 'Login',
	data() {
		return {
			//输入信息存放
			form: { user: '', pass: '' },
			//输入规则
			rules: {
				user: [{ required: true, message: '请输入用户名', trigger: blur }, {
					min: 3,
					max: 10,
					message: "长度在3到10个字符",
					trigger: 'blur',
				}],
				pass: [{ required: true, message: '请输入密码', trigger: blur }]
			}
		}
	},
	methods: {
		//登录按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios.post('/login', qs.stringify(this.form)).then(value => {
						console.log(value);
						if (value.data.state === 0) {
							this.$store.commit('setsession', value.data.token)
							this.$store.commit('settoken', value.data.token)
							console.log(this.$router.push({ path: 'user', }));
						} else {
							alert(value.data.message)
						}
					})

				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//重置输入信息
		resetForm(formName) {
			//重拾表单
			this.$refs[formName].resetFields();
			console.log(this.$refs);

		}
	}
}
</script>

<style scoped>
.login_main {
	border-radius: 15px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background-color: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}

h3 {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}
</style>