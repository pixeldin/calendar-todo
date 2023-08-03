<template>
	<view class="uni-date">
		<view @click="initTimePicker">
			<slot>
				<view class="uni-datetime-picker-timebox-pointer"
					:class="{'uni-datetime-picker-disabled': disabled, 'uni-datetime-picker-timebox': border}">
					<text class="uni-datetime-picker-text">{{time}}</text>
					<view v-if="!time" class="uni-datetime-picker-time">
						<text class="uni-datetime-picker-text">{{selectTimeText}}</text>
					</view>
				</view>
			</slot>
		</view>
		<view v-if="visible" id="mask" class="uni-datetime-picker-mask" @click="tiggerTimePicker"></view>
		<view v-if="visible" class="uni-datetime-picker-popup" :style="fixNvueBug">
			<view class="uni-title">
				<text class="uni-datetime-picker-text">{{selectTimeText}}</text>
			</view>
			<view class="uni-datetime-picker__container-box">
				<picker-view class="uni-datetime-picker-view" :indicator-style="indicatorStyle" :value="hms"
					@change="bindTimeChange">
					<picker-view-column>
						<view class="uni-datetime-picker-item" v-for="(item,index) in hours" :key="index">
							<text class="uni-datetime-picker-item">{{lessThanTen(item)}}</text>
						</view>
					</picker-view-column>
					<picker-view-column>
						<view class="uni-datetime-picker-item" v-for="(item,index) in minutes" :key="index">
							<text class="uni-datetime-picker-item">{{lessThanTen(item)}}</text>
						</view>
					</picker-view-column>
					<picker-view-column>
						<view class="uni-datetime-picker-item" v-for="(item,index) in seconds" :key="index">
							<text class="uni-datetime-picker-item">{{lessThanTen(item)}}</text>
						</view>
					</picker-view-column>
				</picker-view>
				<!-- 兼容 nvue 不支持伪类 -->
				<text class="uni-datetime-picker-sign sign-left">:</text>
				<text class="uni-datetime-picker-sign sign-right">:</text>
			</view>
			<view class="uni-datetime-picker-btn">
				<view @click="clearTime">
					<text class="uni-datetime-picker-btn-text">{{clearText}}</text>
				</view>
				<view class="uni-datetime-picker-btn-group">
					<view class="uni-datetime-picker-cancel" @click="tiggerTimePicker">
						<text class="uni-datetime-picker-btn-text">{{cancelText}}</text>
					</view>
					<view @click="setTime">
						<text class="uni-datetime-picker-btn-text">{{okText}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fixIosDateFormat
	} from './util'
	export default {
		name: 'JimDatetimePicker',
		data() {
			return {
				indicatorStyle: `height: 50px;`,
				visible: false,
				fixNvueBug: {},
				startHour: 0,
				startMinute: 0,
				startSecond: 0,
				endHour: 23,
				endMinute: 59,
				endSecond: 59,
				time: '',
				hour: 0,
				minute: 0,
				second: 0,
				clearText: "清除",
				cancelText: "取消",
				okText: "确定"
			}
		},
		watch: {
			// #ifndef VUE3
			value: {
				handler(newVal) {
					if (newVal) {
						this.parseValue(newVal)
						this.initTime(false)
					} else {
						this.time = ''
						this.parseValue(0)
					}
				},
				immediate: true
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				handler(newVal) {
					if (newVal) {
						this.parseValue(newVal)
						this.initTime(false)
					} else {
						this.time = ''
						this.parseValue(0)
					}
				},
				immediate: true
			},
			// #endif
			hours(newVal) {
				this.checkValue('hour', this.hour, newVal)
			},
			minutes(newVal) {
				this.checkValue('minute', this.minute, newVal)
			},
			seconds(newVal) {
				this.checkValue('second', this.second, newVal)
			}
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			modelValue: {
				type: Number,
				default: 0
			},
			selectTimeText: {
				type: String,
				default: '选择时长'
			},
			disabled: {
				type: [Boolean, String],
				default: false
			},
			border: {
				type: [Boolean, String],
				default: true
			}
		},
		computed: {
			hours() {
				return this.getCurrentRange('hour')
			},

			minutes() {
				return this.getCurrentRange('minute')
			},

			seconds() {
				return this.getCurrentRange('second')
			},
			hms() {
				return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond]
			},

			minHour() {
				return this.startHour
			},
			maxHour() {
				return this.endHour
			},
			minMinute() {
				if (this.hour === this.startHour) {
					return this.startMinute
				} else {
					return 0
				}
			},
			maxMinute() {
				if (this.hour === this.endHour) {
					return this.endMinute
				} else {
					return 59
				}
			},
			minSecond() {
				if (this.hour === this.startHour && this.minute === this.startMinute) {
					return this.startSecond
				} else {
					return 0
				}
			},
			maxSecond() {
				if (this.hour === this.endHour && this.minute === this.endMinute) {
					return this.endSecond
				} else {
					return 59
				}
			}
		},
		methods: {
			/**
			 * @param {Object} item
			 * 小于 10 在前面加个 0
			 */
			lessThanTen(item) {
				return item < 10 ? '0' + item : item
			},
			parseValue(value) {
				if (!value) {
					return
				}
				this.hour = parseInt(value / 3600);
				this.minute = parseInt(value / 60 % 60);
				this.second = Math.ceil(value % 60);
			},
			/**
			 * 解析时分秒字符串，例如：00:00:00
			 * @param {String} timeString
			 */
			parseTimeType(timeString) {
				if (timeString) {
					let timeArr = timeString.split(':')
					if (timeArr[0]) {
						this.hour = Number(timeArr[0])
					}
					if (timeArr[1]) {
						this.minute = Number(timeArr[1])
					}
					if (timeArr[2]) {
						this.second = Number(timeArr[2])
					}
				}
			},

			// 获取时、分、秒 当前可选范围
			getCurrentRange(value) {
				const range = []
				for (let i = this['min' + this.capitalize(value)]; i <= this['max' + this.capitalize(value)]; i++) {
					range.push(i)
				}
				return range
			},
			// 字符串首字母大写
			capitalize(str) {
				return str.charAt(0).toUpperCase() + str.slice(1)
			},
			// 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
			checkValue(name, value, values) {
				if (values.indexOf(value) === -1) {
					this[name] = values[0]
				}
			},
			/**
			 * 生成时间的字符串
			 */
			createDomSting() {
				let hhmmss = this.lessThanTen(this.hour) +
					':' + this.lessThanTen(this.minute) +
					':' + this.lessThanTen(this.second)
				return hhmmss
			},
			/**
			 * 初始化返回值，并抛出 change 事件
			 */
			initTime(emit = true) {
				this.time = this.createDomSting()
				if (!emit) return
				let time_second = this.hour * 3600 + this.minute * 60 + this.second
				this.$emit('change', time_second)
				this.$emit('input', time_second)
				this.$emit('update:modelValue', time_second)
			},
			bindTimeChange(e) {
				const val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minute = this.minutes[val[1]]
				this.second = this.seconds[val[2]]
			},
			/**
			 * 初始化弹出层
			 */
			initTimePicker() {
				if (this.disabled) return
				this.parseTimeType(this.tiem)
				this.visible = !this.visible
			},
			/**
			 * 触发或关闭弹框
			 */
			tiggerTimePicker(e) {
				this.visible = !this.visible
			},
			/**
			 * 用户点击“清空”按钮，清空当前值
			 */
			clearTime() {
				this.time = ''
				this.$emit('change', 0)
				this.$emit('input', 0)
				this.$emit('update:modelValue', 0)
				this.tiggerTimePicker()
			},
			/**
			 * 用户点击“确定”按钮
			 */
			setTime() {
				this.initTime()
				this.tiggerTimePicker()
			}
		},
		mounted() {
			// #ifdef APP-NVUE
			const res = uni.getSystemInfoSync();
			this.fixNvueBug = {
				top: res.windowHeight / 2,
				left: res.windowWidth / 2
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	$uni-primary: #007aff !default;

	.uni-datetime-picker {
		/* #ifndef APP-NVUE */
		/* width: 100%; */
		/* #endif */
	}

	.uni-datetime-picker-view {
		height: 130px;
		width: 270px;
		/* #ifndef APP-NVUE */
		cursor: pointer;
		/* #endif */
	}

	.uni-datetime-picker-item {
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
	}

	.uni-datetime-picker-btn {
		margin-top: 60px;
		/* #ifndef APP-NVUE */
		display: flex;
		cursor: pointer;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-datetime-picker-btn-text {
		font-size: 14px;
		color: $uni-primary;
	}

	.uni-datetime-picker-btn-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-datetime-picker-cancel {
		margin-right: 30px;
	}

	.uni-datetime-picker-mask {
		position: fixed;
		bottom: 0px;
		top: 0px;
		left: 0px;
		right: 0px;
		background-color: rgba(0, 0, 0, 0.4);
		transition-duration: 0.3s;
		z-index: 998;
	}

	.uni-datetime-picker-popup {
		border-radius: 8px;
		padding: 30px;
		width: 270px;
		/* #ifdef APP-NVUE */
		height: 500px;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 330px;
		/* #endif */
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-duration: 0.3s;
		z-index: 999;
	}

	.fix-nvue-height {
		/* #ifdef APP-NVUE */
		height: 330px;
		/* #endif */
	}

	.uni-datetime-picker-time {
		color: grey;
	}

	.uni-datetime-picker-column {
		height: 50px;
	}

	.uni-datetime-picker-timebox {

		border: 1px solid #E5E5E5;
		border-radius: 5px;
		padding: 7px 10px;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		cursor: pointer;
		/* #endif */
	}

	.uni-datetime-picker-timebox-pointer {
		/* #ifndef APP-NVUE */
		cursor: pointer;
		/* #endif */
	}


	.uni-datetime-picker-disabled {
		opacity: 0.4;
		/* #ifdef H5 */
		cursor: not-allowed !important;
		/* #endif */
	}

	.uni-datetime-picker-text {
		font-size: 14px;
		line-height: 24px
	}

	.uni-datetime-picker-sign {
		position: absolute;
		top: 53px;
		/* 减掉 10px 的元素高度，兼容nvue */
		color: #999;
		/* #ifdef APP-NVUE */
		font-size: 16px;
		/* #endif */
	}

	.sign-left {
		left: 86px;
	}

	.sign-right {
		right: 86px;
	}

	.sign-center {
		left: 135px;
	}

	.uni-datetime-picker__container-box {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40px;
	}

	.time-hide-second {
		width: 180px;
	}
</style>