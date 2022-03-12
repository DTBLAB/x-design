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
				<!-- <cell class="form-input">
					<label class="form-input__checkbox">
						<evan-checkbox class="form-input__radio" v-model="form.isDefault" clearable primary-color="#FC9A04" icon-size="14"></evan-checkbox>
					</label>
					<text style="font-size: 28rpx; color: #999999;">设为默认地址</text>
				</cell> -->
			</list>
		</view>
		<view class="save">
			<view type="button" @click="submit" class="save__text">保存</view>
		</view>
	</view>
</template>

<script>
	import io from '@hyoga/uni-socket.io';
	import LbPicker from '@/components/lb-picker'
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox'
	import areaData from './area-data-min2'
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
				isDefault: false,
				socket: null,
				uploadBaseUrl: "https://www.designist.cn/",
				scene: null
			}
		},
		onLoad(query) {
			console.log(query);
			this.scene = query.scene;
			// console.log(option);
			if(this.scene){
				// console.log("bc");
				// this.socket = uni.getStorageSync('socket');
				this.getDefaultAddress();
				this.connectSocket();
			}
		},
		onReady () {
		  this.$nextTick(() => {
		    // 此处可以调用getColumnsInfo方法获取默认值的选项信息
		    const info1 = this.$refs.picker3.getColumnsInfo(this.value4)
		    const info2 = this.$refs.picker3.getColumnsInfo(this.value5)
		    console.log('根据value获取的信息：', info1)
		    console.log('根据value获取的信息：', info2)
		    this.label4 = info1.item.map(m => m.label).join('-')
		    this.label5 = info2.item.map(m => m.label).join('-')
		  })
		},
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
				if(this.form.province === '' || this.form.city === '' || this.form.district === ''){
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
				this.upload();
			},
			connectSocket(){
				let _this = this;
				const socket = io(_this.uploadBaseUrl, {
				  query: {},
				  // transports: [ 'websocket', 'polling' ],
				  transports: [ 'websocket'],
				  timeout: 5000,
				  path: '/upload/socket.io'
				});
				
				socket.on('connect', () => {
				  // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
				  console.log('ws 已连接');
				  // socket.io 唯一连接id，可以监控这个id实现点对点通讯
				  const { id } = socket;
				  socket.on(id, (message) => {
				    // 收到服务器推送的消息，可以跟进自身业务进行操作
				    console.log('ws 收到服务器消息：', message);
				  });
				 //  socket.on("uploadSucceed", (message) => {
				 //    // 收到服务器推送的消息，可以跟进自身业务进行操作
					// console.log("here");
				    
				 //  });
				  // 主动向服务器发送数据
				  socket.emit('connectSucceed', {
				    scene: _this.scene
				  }, function (data) {
				  	socket.disconnect();
				  });
				});
				
				socket.on('error', (msg) => {
				  console.log('ws error', msg);
				});
				
				socket.on("disconnect", () => {
				  console.log("ws disconnected"); // false
				});
			},
			upload(){
				let _this = this;
				uni.showLoading({
					mask: true,
					title: "传输中"
				})
				
				const socket = io(_this.uploadBaseUrl, {
				  query: {},
				  // transports: [ 'websocket', 'polling' ],
				  transports: [ 'websocket'],
				  timeout: 5000,
				  path: '/upload/socket.io'
				});
				
				socket.on('connect', () => {
				  console.log('ws 已连接');
				  const { id } = socket;
				  console.log(id);
				
				  socket.emit("uploadAddress", {
				  	scene: _this.scene,
				  	token: uni.getStorageSync('userInfo').token,
				  	address: _this.form
				  }, function (data) {
				  	console.log(data); // data will be 'woot'
				  	uni.hideLoading();
					socket.disconnect();
				  	uni.showToast({
				  		duration: 2000,
				  		title: "传输成功",
				  		icon: "success"
				  	})
				  	// window.location.href = "https://mp.weixin.qq.com/s/LLNTRriDcdtDI77u6fviaQ"
				  	uni.reLaunch({
				  		url: '/pages/index/index'
				  	})
				  })
				});
				
				socket.on('error', (msg) => {
				  console.log('ws error', msg);
				});
				
				socket.on("disconnect", () => {
				  console.log("ws disconnected"); // false
				});
				
			},
			getDefaultAddress(){
				let _this = this;
				this.$http.get('/address/getDefault').then(res => {
					// console.log(res);
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					if(res.data.data && !!res.data.data){
						_this.form = res.data.data;
						// console.log(_this.form);
						_this.label3 = res.data.data.province + "-" + res.data.data.city + "-" + res.data.data.district;
					}
					
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="less">
@import url('../../common/less/addAddress.less');
</style>
