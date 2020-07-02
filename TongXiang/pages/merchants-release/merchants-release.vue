<template>
	<view>
		<view class="merchants-main">
			<u-form  :model="form" ref="uForm">
				<u-form-item :required="required"   label-width="150" label="工作名称" prop="name">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="工作内容" prop="content">
					<u-input v-model="form.content" />
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="工作地点" prop="address">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="需要人数" >
					<u-number-box :min="1" v-model="form.num" @change="valChange"></u-number-box>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="活动日期" prop="time">
					<u-input v-model="form.time" type="select"  @click="timeShow = true" />
					<u-picker v-model="timeShow" mode="time" :params="params" @confirm='confirmCallBack'></u-picker>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="工作类型" prop="work_type_name">
					<u-radio-group v-model="form.work_type_name">
						<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled" :active-color="'#62d8a4'">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="结算方式" prop="pay_type_name">
					<u-radio-group v-model="form.pay_type_name">
						<u-radio class="radio-style" shape="circle" v-for="(item, index) in payList" :key="index" :name="item.name" :disabled="item.disabled" :active-color="'#62d8a4'">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="时间类型" prop="work_time_name">
					<u-radio-group v-model="form.work_time_name">
						<u-radio class="radio-style" shape="circle" v-for="(item, index) in timeList" :key="index" :name="item.name" :disabled="item.disabled" :active-color="'#62d8a4'">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="工期时间" >
					<u-number-box :min="1" v-model="form.workTime" @change="valChangeTime"></u-number-box>
				</u-form-item>
				<u-form-item :required="required" label-width="150" label="所需费用" prop="cost">
					<u-input v-model="form.cost" />
					<view slot="right" type="success" size="mini" >元</view>
				</u-form-item>
				<u-form-item label-width="150" label="备注" prop="remark">
					<u-input :border='textareaBorder' type="textarea" v-model="form.remark" />
				</u-form-item>
			</u-form>
			<u-button :ripple="true" ripple-bg-color="#35f776" style="margin-top: 20rpx;" type="success" @click="submit">确认提交</u-button>
			<!-- 通过rippleBgColor设置水波纹的背景颜色 -->
		</view>
		<tabBar :pagePath="'/pages/merchants-release/merchants-release'"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textareaBorder:true,//文本框边框显示
				required:true,//星号状态
				timeShow:false,//日期选择显示状态
				params:{
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				//工作类型
				radioList:[
					{
						name: '兼职',
						disabled: false
					},
					{
						name: '短期工',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
				//结算方式
				payList:[
					{
						name: '日结',
						disabled: false
					},
					{
						name: '周结',
						disabled: false
					},
					{
						name: '月结',
						disabled: false
					},
					{
						name: '完工结',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
				//时间类型
				timeList:[
					{
						name: '元/小时',
						disabled: false
					},
					{
						name: '元/日',
						disabled: false
					},
					{
						name: '元/周',
						disabled: false
					},
					{
						name: '元/月',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
				form: {
					name: '',//工作名称
					content: '',//工作内容
					address:'',//工作地点
					num:1,//需要人数
					time:'',//活动日期
					work_type_name:'',//工作类型
					pay_type_name:'',//结算方式
					work_time_name:'',//工作时间类型
					workTime:1,//工期
					cost:'',//所需费用
					remark:''//备注
				},
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入工作名称', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					content: [
						{
							required: true, 
							message: '请输入工作内容', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					address: [
						{
							required: true, 
							message: '请输入工作地点', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					time:[
						{
							required: true, 
							message: '请选择活动日期', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change'],
						}
					],
					work_type_name:[
						{
							required: true, 
							message: '请选择一种工作类型',
							trigger: 'change',
						}
					],
					pay_type_name:[
						{
							required: true, 
							message: '请选择一种结算方式',
							trigger: 'change',
						}
					],
					work_time_name:[
						{
							required: true, 
							message: '请选择一种时间类型',
							trigger: 'change',
						}
					],
					cost:[
						{
							required: true, 
							message: '请输入所需费用(必须是数字)', 
							type:'number',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		methods: {
			//校验
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						console.log(this.form)
						this.addMain()
					} else {
						console.log('验证失败');
						console.log(this.form)
					}
				});
			},
			//表单重置方法
			resetForm(){
				this.form.num=1
				this.form.workTime=1
				this.$refs.uForm.resetFields()
			},
			//时间pick确认回调
			confirmCallBack(res){
				console.log(res)
				this.form.time=res.year+'-'+res.month+'-'+res.day+'  '+res.hour+':'+res.minute+':'+res.second
			},
			//人数步进器
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			//工期步进器
			valChangeTime(e) {
				console.log('当前值为: ' + e.value)
			},
			//添加信息调用方法
			async addMain() {
				let res = await this.$dbcloud.add("tx_order_info",this.form);
				console.log(res)
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.merchants-main{
		box-sizing: border-box;
		padding: 20rpx 35rpx 120rpx;
	}
	.radio-style{
		line-height: 60rpx;
	}
</style>
