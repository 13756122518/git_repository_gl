<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录订单宝</view>
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label-width="150" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" :label-position="labelPosition" label="登录名" prop="name">
					<u-input :border="border" placeholder="请输入登录名" v-model="model.name" type="text" ></u-input>
				</u-form-item>
				
				<u-form-item label-width="150" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="lock" :label-position="labelPosition" label="密码" prop="password">
					<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码" ></u-input>
				</u-form-item>
				<u-button @click="submit" type="success">确定</u-button>
			</u-form>
		</view>
		<view class="buttom">
			
			<view class="hint">
				登录代表同意
				<text class="link">订单宝用户协议、隐私政策，</text>
				并授权使用您的订单宝账号信息（如昵称、头像）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			model: {
				name: '',
				password: ''
			},
			rules: {
				name: [
					{ 
						required: true, 
						message: '请输入登录名', 
						trigger: 'blur' ,
					}, 
					{ 
						min: 3, 
						max: 20, 
						message: '登录名长度在3到20个字符', 
						trigger: ['change','blur'],
					},
					{
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.enOrNum(value);
						},
						message: '登录名必须为字母或者数字',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
					// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
					// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
					// 			if(res.error) {
					// 				callback(new Error('登录名重复'));
					// 			} else {
					// 				// 如果没有错误，也要执行callback()回调
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				],
				password: [
					{
						required: true, 
						message: '请输入密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
			},
			border: true,
			labelPosition: 'left',
			errorType: ['message'],
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		console.log("name:",this.vuex_user.name);
	},
	computed: {
		
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// if(!this.model.agreement) return this.$u.toast('请勾选协议');
					this.login()
				}
			});
		},
		async login() {
			let res = await this.$dbcloud.findByConditions("tx_user",{"loginName":this.model.name,"password":this.model.password});
			if(res && res.length > 0) {
				this.$u.vuex('user', res[0])			
				this.$u.route({
					url: '/pages/home/home',
					type: 'switchTab'
				})
				
			} else {
				uni.showToast({
					icon: 'none',
					title: '用户名或密码错误'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	
.wrap {
	padding: 30rpx;
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: center;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 50rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
	}
	.buttom {		
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
