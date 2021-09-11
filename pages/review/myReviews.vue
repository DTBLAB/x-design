<template>
	<view class="container">
		<view class="review" v-for="(reviewInfo, index) of reviews" :key="index">
			<view class="topBar">
				<view class="userInfo">
					<view>
						<image :src="avatarUrl" mode="aspectFill" class="userPic"></image>
					</view>
					<view class="userName">
						{{nickname}}
					</view>
				</view>
				<view class="delete" @click="deleteReview(reviewInfo)">
					<image src="../../static/image/delete-2.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
				</view>
			</view>
			<view class="date">
				<view class="number">
					{{reviewInfo.createTime.split(' ')[0]}}
				</view>
				<view class="stars">
					<image class="nostar" :src="noStarUrl" v-if="reviewInfo.grade<1" />
					<image class="star" :src="starUrl" v-if="reviewInfo.grade>0 && reviewInfo.grade<=5" />
					<image class="nostar" :src="noStarUrl" v-if="reviewInfo.grade<2" />
					<image class="star" :src="starUrl" v-if="reviewInfo.grade>1 && reviewInfo.grade<=5" />
					<image class="nostar" :src="noStarUrl" v-if="reviewInfo.grade<3" />
					<image class="star" :src="starUrl" v-if="reviewInfo.grade>2 && reviewInfo.grade<=5" />
					<image class="nostar" :src="noStarUrl" v-if="reviewInfo.grade<4" />
					<image class="star" :src="starUrl" v-if="reviewInfo.grade>3 && reviewInfo.grade<=5" />
					<image class="nostar" :src="noStarUrl" v-if="reviewInfo.grade<5" />
					<image class="star" :src="starUrl" v-if="reviewInfo.grade===5" />
				</view>
			</view>
			<view class="productComment">
				{{reviewInfo.content}}
			</view>
			<view class="reviewPictures">
				<image v-for="(pic, index) of reviewInfo.pics" :key="index" :src="pic" mode="aspectFill" class="reviewPicture"></image>
			</view>
			<view class="productDetail">
				<view class="productImg">
					<image :src="reviewInfo.preview" mode="aspectFit"></image>
				</view>
				<view class="productStat">
					<view class="name">
						<view class="name1">
							{{categoryList[reviewInfo.category].name}}
						</view>
						<view class="">
							{{reviewInfo.model}}
						</view>
					</view>
					<view class="money">
						<view class="money1">
							{{reviewInfo.price}}
						</view>
						<view class="money2" v-if="reviewInfo.grade>2">
							已好评
						</view>
						<view class="money2" v-else>
							已差评
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import category from '../../config/whiteMoldData'
	
	export default {
		data(){
			return{
				noStarUrl: '../../static/image/starGray.png',
				starUrl: '../../static/image/starYellow.png',
				reviews: [],
				categoryList: category
			}
		},
		computed: mapState(['hasLogin', 'nickname' ,'avatarUrl']),
		onShow(){
			let _this = this;
			uni.showLoading({
				mask: true,
				title: "评论加载中"
			})
			this.$http.get('/review/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.reviews = res.data.data;
				console.log(_this.reviews);
				uni.hideLoading();
				
			}).catch(err => {
				uni.hideLoading();
				uni.showToast({
				    title: "网络问题，加载失败",
				    duration: 2000,
					icon: 'none'
				});
			});
		},
		methods:{
			deleteReview(review){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确定删除此评论',
				    success: function (res) {
				        if (res.confirm) {
				            _this.confirmDelete(review);
				        }
				    }
				});
			},
			confirmDelete(review){
				let _this = this;
				uni.showLoading({
					mask: true,
					title: "正在删除"
				})
				this.$http.post('/review/delete', {rid: review.id}, {timeout: 10000}).then(res => {
					if(res.data.code !== 0){
						uni.hideLoading();
						uni.showToast({
							duration: 1000,
							title: res.data.message,
							icon: 'none'
						})
						return;
					}
					uni.hideLoading();
					uni.showToast({
						duration: 1000,
						title: '删除成功'
					})
					_this.loadReviews();
				}).catch(err => {
					uni.hideLoading();
					throw new Error("删除失败!");
				})
			},
			loadReviews(){
				let _this = this;
				uni.showLoading({
					mask: true,
					title: "评论加载中"
				})
				this.$http.get('/review/getList').then(res => {
					if(res.data.code !== 0){
						uni.showToast({
						    title: res.data.message,
						    duration: 1000,
							icon: 'none'
						});
						return;
					}
					_this.reviews = res.data.data;
					console.log(_this.reviews);
					uni.hideLoading();
					
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
					    title: "网络问题，加载失败",
					    duration: 2000,
						icon: 'none'
					});
				});
			},
		}
	}
</script>

<style>
</style>

<style lang="less" scoped>
@import url('../../common/less/myReviews.less');
</style>