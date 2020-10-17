<template>
	<view class="">
		<view v-for="(p,i) in myProducts" :key="i" class="cart-content">
			<view class="cart-items">
				<evan-checkbox class="cart-items__checkbox" v-model="statusList[i]" primary-color="#FC9A04" icon-size="16" @change="select(i)"></evan-checkbox>
				<view class="cart-items__item">
					<image :src="p.preview" mode="aspectFit" class="cart-items__item__image"></image>
				</view>
				<view class="">
					<view class="cart-title">
						{{categoryList[p.category].name}}
					</view>
					<view class="cart-numbers">
						<view class="cart-numbers__font">
							<b>{{p.price}}</b>
						</view>
						<view class="">
							<wm-numberBox :min="0" :max="9" model="1" :value="numList[i]" @change="inputChange" :ID="i"></wm-numberBox>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="select-all">
				<view class="checkbox">
					<evan-checkbox v-model="checked" primary-color="#FC9A04" icon-size="16" @change="changeAll"></evan-checkbox>
				</view>
				<view class="select-text">
					全选
				</view>
			</view>

			<view class="settle-all">
				<view class="total">
					合计<text style="font-size: 36rpx; font-weight: bold; margin-left: 14rpx;">¥ {{total}}</text>
					<!-- {{sum}} -->
				</view>
				<view class="settle">
					<view class="settle-accounts" @click="placeOrder">结算<text v-if="numSum !== 0">({{numSum}})</text></view>
				</view>
			</view>
		</view>
		<view class="background">
			
		</view>
	</view>
</template>

<script>
	import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	import category from '../../config/category'
	import EvanCheckbox from '@/components/evan-checkbox/evan-checkbox'
	export default {
		data() {
			return {
				checked:false,
				// selected: true,
				// unselected: false,
				myProducts:[],
				categoryList: category,
				statusList: [],
				numList: [],
				total: 0,
				numSum: 0
			}
		},
		onLoad() {
			this.getdata();
		},
		components:{
			wmNumberBox, EvanCheckbox
		},
		methods: {
			changeAll(e) {
				// console.log(this.checked);
				for(let i=0; i<this.statusList.length; i++){
					this.statusList[i] = this.checked;
				}
				this.calculateTotal();
			},
			select(i){
				this.checkAll(i);
				this.calculateTotal();
			},
			checkAll(i){
				// console.log(i, this.statusList[i]);
				for(let i=0; i<this.statusList.length; i++){
					if(!this.statusList[i]){
						this.checked = false;
						return;
					}
				}
				this.checked = true;
			},
			inputChange(e){
				let {value, id} = e;
				let i = Number(id);
				this.numList[i] = value;
				this.calculateTotal();
			},
			calculateTotal(){
				let sum = 0, num = 0;
				for(let i=0; i<this.myProducts.length; i++){
					if(this.statusList[i]){
						sum += this.myProducts[i].price*this.numList[i];
						num += this.numList[i];
					}
				}
				this.total = sum;
				this.numSum = num;
			},
			getdata() {
				this.$http.get('/product/getList').then(res => {
					if(res.data.code !== 0){
						uni.showToast({
							title: res.data.message,
							duration: 1000,
							icon: 'none'
						});
						return;
					}
					this.statusList = [];
					this.numList = [];
					for(let i = 0; i<res.data.data.length; i++){
						this.statusList.push(false);
						this.numList.push(1);
					}
					this.myProducts = res.data.data;
				}).catch(err => {
					uni.showToast({
						title: "网络问题，图片加载失败",
						duration: 1000,
						icon: 'none'
					});
				});
			},
			placeOrder(){
				let items = [];
				let products = JSON.parse(JSON.stringify(this.myProducts));
				for(let i=0; i<this.myProducts.length; i++){
					if(this.statusList[i]){
						products[i].num = this.numList[i];
						items.push(products[i]);
					}
				}
				console.log(items);
				uni.navigateTo({
					url: "/pages/address/address"
				});
			}
		}
	}
	
</script>

<style lang="less">
@import url('../../common/less/cart.less');
</style>

