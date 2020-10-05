<template>
	<view class="">
		<view class="form">
			<list>
				<cell class="form-input">
					<view class="label">
						收货人
					</view>
					<input class="input" v-model="form.name" placeholder="请填写收货人姓名"/>
				</cell>
				<cell class="form-input">
					<view class="label">
						手机号
					</view>
					<input class="input" v-model="form.mobile" placeholder="请填写收货手机号码"/>
				</cell>
				<cell class="form-input">
					<view class="label">
						所在地区
					</view>
						<lb-picker ref="picker3"
							v-model="value3"
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
					<input class="input__detail" type="text" placeholder="如道路,门牌号,校区,楼栋号等" v-model="form.street"/>
				</cell>
				<cell class="form-input">
					<label class="form-input__checkbox">
						<checkbox class="form-input__button" :value="checked" /><text style="font-size: 28rpx; color: #999999;">设为默认地址</text>
					</label>
				</cell>
			</list>
		</view>
		<view class="save">
			<navigator type="button" @click="submit" class="save__text">保存</navigator>
		</view>
	</view>
</template>

<script>
	  import LbPicker from '@/components/lb-picker'
	  import areaData from '../area-data-min'
	export default {
		components: {
		  LbPicker
		},
		data() {
			return {
				form: {
					name: '',
					mobile: '',
					street: ''
				},
				value3: [],
				label3: '',
				
				list1: areaData,
				list2: []
			}
		},
		onReady () {
		  this.$nextTick(() => {
		    // 此处可以调用getColumnsInfo方法获取默认值的选项信息
		    const info1 = this.$refs.picker4.getColumnsInfo(this.value4)
		    const info2 = this.$refs.picker4.getColumnsInfo(this.value5)
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
			        this[name] = label
			      }
			    }
			  },
			  handleCancel (e) {
			    console.log('cancel::', e)
			  }
			}
		}
</script>

<style lang="less">
@import url('../../common/less/add.less');
</style>
