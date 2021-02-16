<template>
	<view class="">
		<view class="form">
			<list>
				<cell class="form-input">
					<view class="label">
						收货人
					</view>
					<input class="input" v-model="form.consignee" placeholder="请填写收货人姓名" maxlength="10"/>
				</cell>
				<cell class="form-input">
					<view class="label">
						手机号
					</view>
					<input class="input" v-model="form.phone" placeholder="请填写收货手机号码" maxlength="11"/>
				</cell>
				<cell class="form-input">
					<view class="label">
						所在地区
					</view>
						<lb-picker ref="picker3"
							v-model="area"
							mode="multiSelector"
							:list="list1"
							:level="3"
							:dataset="{ name: 'label3' }"
							@change="handleChange"
							@confirm="handleConfirm"
							@cancel="handleCancel">
							<view class="multi-picker">
								<view class="item-value">
								  <text class="multi-picker__pickered">{{ label3 }}</text>
								  <text v-if="!label3"
									class="multi-picker__picker">点击选择</text>
								</view>
								 <image class="multi-picker__icon" src="/../../static/image/more@3x.png"></image>
							 </view>
						</lb-picker>
				</cell>
				<cell class="form-input">
					<view class="label">
						详细地址
					</view>
					<input class="input" type="text" placeholder="如道路,小区,楼栋号等" v-model="form.detail"/>
				</cell>
				<cell class="form-input">
					<label class="form-input__checkbox">
						<evan-checkbox class="form-input__radio" v-model="form.isDefault" clearable primary-color="#FC9A04" icon-size="14"></evan-checkbox>
					</label>
					<text style="font-size: 28rpx; color: #999999;">设为默认地址</text>
				</cell>
			</list>
		</view>
		<view class="save">
			<view type="button" @click="submit" class="save__text">保存</view>
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox'
	import areaData from './area-data-min'
	export default {
		components: {
		  LbPicker, EvanCheckbox
		},
		data() {
			return {
				aid: undefined,
				form: {
					consignee: '',
					phone: '',
					detail: '',
					isDefault: false,
					province: '',
					city: '',
					district: ''
				},
				area: [],
				label3: '',
				
				list1: areaData,
				list2: [],
				isDefault: false
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let _this = this;
			this.aid = option.aid;
			if(this.aid){
				uni.setNavigationBarTitle({
					title: "编辑收货地址"
				})
				this.$http.get('/address/get', {aid: this.aid}).then(res => {
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					_this.form = res.data.data;
					let data = res.data.data
					_this.label3 = data.province + '-' + data.city + '-' + data.district;
					
				}).catch(err => {
					uni.showToast({
					    title: "网络问题，地址加载失败",
					    duration: 1000,
						icon: 'none'
					});
				});
			}
		},
		// onReady () {
		//   this.$nextTick(() => {
		//     // 此处可以调用getColumnsInfo方法获取默认值的选项信息
		//     const info1 = this.$refs.picker3.getColumnsInfo(this.value4)
		//     const info2 = this.$refs.picker3.getColumnsInfo(this.value5)
		//     console.log('根据value获取的信息：', info1)
		//     console.log('根据value获取的信息：', info2)
		//     this.label4 = info1.item.map(m => m.label).join('-')
		//     this.label5 = info2.item.map(m => m.label).join('-')
		//   })
		// },
		methods: {
			handleTap (picker) {
			    this.$refs[picker].show()
			},
			handleChange (e) {
				console.log('change::', e)
			},
			handleConfirm (e) {
				// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
				console.log('confirm::', e)
				if (e) {
					const name = e.dataset.name
					const label = e.item.map(m => m.label).join('-')
					if (name && label) {
						this[name] = label;
						this.form.province = e.item[0].label;
						this.form.city = e.item[1].label;
						this.form.district = e.item[2].label;
					}
				}
			},
			handleCancel (e) {
				console.log('cancel::', e)
			},
			submit(){
				console.log(this.form);
				if(this.form.consignee === ''){
					uni.showToast({
						duration: 1000,
						title: '请填写收货人姓名',
						icon: 'none'
					});
					return;
				}
				if(this.form.phone === ''){
					uni.showToast({
						duration: 1000,
						title: '请填写收货手机号码',
						icon: 'none'
					});
					return;
				}
				if(this.form.phone.length !== 11){
					uni.showToast({
						duration: 1000,
						title: '手机号码格式错误',
						icon: 'none'
					});
					return;
				}
				if(this.area.length === 0){
					uni.showToast({
						duration: 1000,
						title: '请选择所在地区',
						icon: 'none'
					});
					return;
				}
				if(this.form.detail === ''){
					uni.showToast({
						duration: 1000,
						title: '请填写详细地址',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '地址保存中'
				})
				let url = this.aid ? '/address/add' : '/address/save';
				this.$http.post(url, this.form).then(res => {
					uni.hideLoading();
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					uni.navigateBack();
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
					    title: "保存失败",
					    duration: 1000,
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style lang="less">
@import url('../../common/less/addAddress.less');
</style>
