<template>
	<view class="bg-root">
		<view class="pxp-card-top">
			<text @click="clickCancel" class="pxp-top-cancel">取消</text>
			<text class="pxp-top-title">设置闹钟</text>
			<text @click="clickSave" class="pxp-top-save">保存</text>
		</view>

		<view class="pxp-card-week">
			<view class="row">
				<view class="pxp-week-item" @click="toggleCheckbox('周一')">
					<image class="icon" :src="weekItems['周一'].iconUrl"></image>
					<span>{{ weekItems['周一'].name }}</span>
				</view>
				<view class="pxp-week-item" @click="toggleCheckbox('周二')">
					<image class="icon" :src="weekItems['周二'].iconUrl"></image>
					<span>{{ weekItems['周二'].name }}</span>
				</view>
				<view class="pxp-week-item" @click="toggleCheckbox('周三')">
					<image class="icon" :src="weekItems['周三'].iconUrl"></image>
					<span>{{ weekItems['周三'].name }}</span>
				</view>
				<view class="pxp-week-item" @click="toggleCheckbox('周四')">
					<image class="icon" :src="weekItems['周四'].iconUrl"></image>
					<span>{{ weekItems['周四'].name }}</span>
				</view>
			</view>
			<view class="row">
				<view class="pxp-week-item" @click="toggleCheckbox('周五')">
					<image class="icon" :src="weekItems['周五'].iconUrl"></image>
					<span>{{ weekItems['周五'].name }}</span>
				</view>
				<view class="pxp-week-item" @click="toggleCheckbox('周六')">
					<image class="icon" :src="weekItems['周六'].iconUrl"></image>
					<span>{{ weekItems['周六'].name }}</span>
				</view>
				<view class="pxp-week-item" @click="toggleCheckbox('周日')">
					<image class="icon" :src="weekItems['周日'].iconUrl"></image>
					<span>{{ weekItems['周日'].name }}</span>
				</view>
				<view class="pxp-week-item" style="visibility: hidden">
					<image class="icon" src='../../../static/icon/unselect-week.png'></image>
					<span>周八</span>
				</view>
			</view>
		</view>

		<view class="container">
			<view class="pxp-card-shake">
				<!-- 上方文本和输入框 -->
				<view class="top-section">
					<span class="mark-text">备注</span>
					<input type="text" class="input-box" placeholder="请填写备注">
				</view>

				<!-- 水平线的容器 -->
				<view class="line-container">
					<hr class="horizontal-line">
				</view>

				<!-- 下方文本和按钮 -->
				<view class="shake">
					<span class="shake-text">震动</span>
					<!-- <button class="btn-shake" @click="changeBackground"></button> -->
					<view class="btn-shake" @click="toggleIcon('0')">
						<image class="shake-btn-icon" :src="shakebtn['0'].iconUrl"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="pxp-card-time">
			<view>

			</view>
			<!-- Start 时间设置 -->
			<view class="startAt">
				<text @click="clickStart" class="uni-datetime-picker-sign a-sign-left">起始</text>
				<text class="uni-datetime-picker-sign ax-sign-left">{{shour}}</text>
				<text class="uni-datetime-picker-sign a-sign-center">时</text>
				<text class="uni-datetime-picker-sign ax-sign-center">{{smin}}</text>
				<text class="uni-datetime-picker-sign a-sign-right">分</text>
			</view>
			<view class="endAt">
				<text @click="clickEnd" class="uni-datetime-picker-sign e-sign-left">结束</text>
				<text class="uni-datetime-picker-sign ex-sign-left">{{ehour}}</text>
				<text class="uni-datetime-picker-sign e-sign-center">时</text>
				<text class="uni-datetime-picker-sign ex-sign-center">{{emin}}</text>
				<text class="uni-datetime-picker-sign e-sign-right">分</text>
			</view>
			<!-- End 时间设置 -->

			<view class="picker-pop">
				<view class="picker-container">
					<picker-view class="uni-datetime-picker-view" :indicator-style="indicatorStyle" :value="hms"
						@change="bindStartTimeChange">
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
					</picker-view>
					<!-- 兼容 nvue 不支持伪类 -->
					<text @click="clickStart" class="uni-datetime-picker-sign sign-left">起始</text>
					<text class="uni-datetime-picker-sign sign-center">时</text>
					<text class="uni-datetime-picker-sign sign-right">分</text>
					<button class="btn-start" @click="settingStart()"></button>
				</view>
			</view>

			<view class="picker-pop-end">
				<view class="picker-container">
					<picker-view class="uni-datetime-picker-view-end" :indicator-style="indicatorStyle" :value="hms"
						@change="bindEndTimeChange">
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
					</picker-view>
					<!-- 兼容 nvue 不支持伪类 -->
					<text @click="clickEnd" class="uni-datetime-picker-sign sign-left">结束</text>
					<text class="uni-datetime-picker-sign sign-center">时</text>
					<text class="uni-datetime-picker-sign sign-right">分</text>
					<button class="btn-end" @click="settingEnd()"></button>
				</view>
			</view>
		</view>

		<view class="pxp-card-color">
		</view>
	</view>

</template>

<script>
	import {
		fixIosDateFormat
	} from './util'
	export default {
		name: 'PxpDatetimePicker',
		data() {
			return {
				shakebtn: {
					'0': {
						iconUrl: '../../../static/icon/btn-unclick.png',
						selected: false
					}
				},
				weekItems: {
					'周一': {
						name: '周一',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周二': {
						name: '周二',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周三': {
						name: '周三',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周四': {
						name: '周四',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周五': {
						name: '周五',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周六': {
						name: '周六',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					},
					'周日': {
						name: '周日',
						iconUrl: '../../../static/icon/unselect-week.png',
						selected: false
					}
				},
				showIcon: false,
				indicatorStyle: `height: 50px;`,
				visible: false,
				startHour: 0,
				startMinute: 0,
				startSecond: 0,
				endHour: 23,
				endMinute: 59,
				endSecond: 59,
				time: '',
				sType: ['起始', '结束'],
				hour: 0,
				minute: 0,
				second: 0,
				// 起始与结束
				shour: 0,
				smin: 0,
				ehour: 0,
				emin: 0,
				clearText: "清除",
				cancelText: "取消",
				okText: "确定"
			}
		},
		watch: {
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
			btnBackground() {
				return this.showIcon ? 'url(../../../static/icon/btn-clicked.png)' :
					'url(../../../static/icon/btn-unclick.png)';
			},
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
					'分' + this.lessThanTen(this.minute) +
					'秒' + this.lessThanTen(this.second)
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
			bindStartTimeChange(e) {
				const val = e.detail.value
				this.shour = this.hours[val[0]]
				this.smin = this.minutes[val[1]]
			},
			bindEndTimeChange(e) {
				const val = e.detail.value
				this.ehour = this.hours[val[0]]
				this.emin = this.minutes[val[1]]
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
			 * 用户点击“清空”按钮，清空当前值
			 */
			clearTime() {
				this.time = ''
				this.$emit('change', 0)
				this.$emit('input', 0)
				this.$emit('update:modelValue', 0)
			},
			/**
			 * 用户点击“确定”按钮
			 */
			setTime() {
				this.initTime()
			},
			changeHideStatus(className, displayValue) {
				var elements = document.querySelectorAll('.' + className);
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.display = displayValue;
				}
			},
			clickCancel() {
				uni.navigateTo({
					url: '/pages/zui-calendar/components/zui-calendar/zui-calendar'
				});
			},
			clickStart() {
				console.log('clickStart')
				// 出现 开始设置条\设置开始按钮
				this.changeHideStatus('picker-pop', 'block')
				this.changeHideStatus('btn-start', 'block')
				// 隐藏 开始\结束时间
				// 隐藏 结束设置条\设置结束按钮
				this.changeHideStatus('picker-pop-end', 'none')
				this.changeHideStatus('btn-end', 'none')
				// 隐藏开始-结束结果
				this.changeHideStatus('startAt', 'none')
				this.changeHideStatus('endAt', 'none')

				console.log('Start at: ', this.shour, this.smin)
			},
			settingStart() {
				console.log('settingStart')
				// 隐藏设置框, 按钮
				this.changeHideStatus('picker-pop', 'none')
				this.changeHideStatus('btn-start', 'none')
				// 显示开始-结束结果
				this.changeHideStatus('startAt', 'block')
				this.changeHideStatus('endAt', 'block')
			},
			clickEnd() {
				console.log('clickEnd')
				this.changeHideStatus('picker-pop-end', 'block')
				this.changeHideStatus('btn-end', 'block')
				// 隐藏 开始\结束时间
				// 隐藏 结束设置条\设置结束按钮
				this.changeHideStatus('picker-pop', 'none')
				this.changeHideStatus('btn-start', 'none')

				// 隐藏开始-结束结果
				this.changeHideStatus('startAt', 'none')
				this.changeHideStatus('endAt', 'none')

				console.log('End at: ', this.ehour, this.emin)
			},
			settingEnd() {
				console.log('settingEnd')
				// 隐藏设置框, 按钮
				this.changeHideStatus('picker-pop-end', 'none')
				this.changeHideStatus('btn-end', 'none')
				// 显示开始-结束结果
				this.changeHideStatus('startAt', 'block')
				this.changeHideStatus('endAt', 'block')
			},
			toggleCheckbox(weekDay) {
				this.weekItems[weekDay].selected = !this.weekItems[weekDay].selected;
				if (this.weekItems[weekDay].selected) {
					this.weekItems[weekDay].iconUrl = '../../../static/icon/select-week.png';
					console.log(weekDay + '被选中了');
				} else {
					this.weekItems[weekDay].iconUrl = '../../../static/icon/unselect-week.png';
					console.log(weekDay + '被取消选中');
				}
				// 获取当前选中的所有周天
				const selectedDays = Object.keys(this.weekItems).filter(day => this.weekItems[day].selected);
				console.log("当前选中的周天：", selectedDays);
			},
			toggleIcon(id) {
				this.shakebtn[id].selected = !this.shakebtn[id].selected;
				if (this.shakebtn[id].selected) {
					this.shakebtn[id].iconUrl = '../../../static/icon/btn-unclick.png';
				} else {
					this.shakebtn[id].iconUrl = '../../../static/icon/btn-clicked.png';
					console.log('toggleIcon 被取消选中');
				}
				console.log('toggleIcon click');
			},
			clickSave() {
				console.log("clickSave 保存!");
			}
		},
		mounted() {}
	}
</script>

<style lang="scss">
	.bg-root {
		background-color: #f6f6f6;
	}

	.pxp-card-top {
		height: 55px;
		width: 100%;
		background-color: #ffffff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
	}

	.pxp-top-cancel {
		position: relative;
		font-weight: bold;
		padding-top: 17px;
		padding-left: 20px;
	}

	.pxp-top-title {
		font-weight: bold;
		font-size: 20px;
		margin: 0 auto;
		position: relative;
		padding-top: 12px;
	}

	.pxp-top-save {
		font-weight: bold;
		position: relative;
		padding-top: 17px;
		margin-right: 20px;
	}

	.pxp-card-week {
		height: 120px;
		width: 100%;
		background-color: #ffffff;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	.pxp-week-item {
		padding-top: 25px;
		flex: 1;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.icon {
		width: 25px;
		height: 25px;
	}

	.container {
		width: 100%;
		/* 设置卡片宽度 */
		// border: 1px solid #ccc;
		background-color: #FFFFFF;
		/* 添加其他样式 */
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 140px;
		/* 设置容器高度 */
	}

	.pxp-card-shake {
		width: 100%;
		height: 120px;
	}

	.top-section,
	.shake {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
	}

	.line-container {
		display: flex;
		justify-content: center;
		margin: 10px 0;
	}

	.mark-text {
		position: relative;
		font-size: 22px;
		font-weight: bold;
		top: -3%;
		left: -10%;
	}

	.input-box {
		// border: 1px solid #92cc46;
		position: relative;
		right: 13px;
		width: 200px;
		height: 30px;
		padding: 5px;
	}

	.btn-shake {
		position: relative;
		left: 23%;
		top: 80%;
		border: none;
		width: 35px;
		height: 35px;
		// background-image: url(../../../static/icon/btn-unclick.png);
		background-repeat: no-repeat;
		background-size: cover;
		// color: #FFFFFF;
		cursor: pointer;
	}
	
	.shake-text {
		position: relative;
		top: 3px;
		right: 90px;
		font-size: 20px;
		// left: 100px;
	}
	
	.shake-btn-icon {
		width: 55px;
		height: 55px;
		position: relative;
		right: 53%;
		top: -4%;
	}

	.horizontal-line {
		width: 80%;
		border: none;
		border-top: 0.7px solid #dedede;
	}

	.pxp-card-time {
		padding-top: 10px;
		height: 250px;
		// height: auto;
		width: 100%;
		background-color: #58aa24;
		margin-bottom: 10px;
	}

	.pxp-card-color {
		height: 130px;
		width: 100%;
		background-color: #aa265f;
	}

	$uni-primary: #007aff !default;

	.uni-datetime-picker {
		/* #ifndef APP-NVUE */
		/* width: 100%; */
		/* #endif */
	}

	.uni-datetime-picker-view {
		height: 130px;
		// 选择器宽度
		width: 180px;
		// opacity: 0.78;
		/* #ifndef APP-NVUE */
		cursor: pointer;
		/* #endif */
	}

	.uni-datetime-picker-view-end {
		height: 130px;
		// 选择器宽度
		width: 180px;
		// opacity: 0.78;
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

	.picker-pop {
		border-radius: 8px;
		padding: 30px;
		width: 270px;
		background-color: #fff;
		border: 1px solid #26aa6d;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-duration: 0.3s;
		display: none;
	}

	/* pxp diy s*/
	.picker-pop-end {
		border-radius: 8px;
		padding: 30px;
		width: 270px;
		background-color: #fff;
		// opacity: 0.95;
		border: 1px solid #000000;
		position: fixed;
		top: 57%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-duration: 0.3s;
		display: none;
	}

	/* pxp diy e*/

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

	.startAt {
		position: relative;
		top: 20%;
		border: 1px solid #0fa5e5;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		height: 40rpx;
		z-index: 20000;
	}

	.endAt {
		position: relative;
		top: 40%;
		border: 1px solid #e54915;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		height: 40rpx;
		z-index: 20000;
	}

	.sign-left {
		left: 0px;
	}

	.sign-center {
		left: 85px;
	}

	.sign-right {
		right: 86px;
	}

	.btn-start {
		background-image: url('../../../static/icon/time-setting.png');
		background-size: contain;
		background-repeat: no-repeat;
		position: relative;
		border: none;
		width: 25px;
		height: 25px;
		right: 2px;
		border-radius: 50%;
		// top: 80%;
		// left: 40%;
	}

	.btn-end {
		background-image: url('../../../static/icon/time-setting.png');
		background-size: contain;
		background-repeat: no-repeat;
		border: none;
		width: 25px;
		height: 25px;
		position: relative;
		right: 2px;
		border-radius: 50%;
	}

	.a-sign-left {
		position: relative;
		left: 8.5%;
		top: 47.3%;
		z-index: 10000;
		color: #007aff;
	}

	.ax-sign-left {
		position: relative;
		left: 12.2%;
		top: 47.3%;
		z-index: 10000;
		color: #2fff58;
	}

	.a-sign-center {
		position: relative;
		left: 17.2%;
		top: 47.3%;
		z-index: 10000;
		color: #007aff;
	}

	.ax-sign-center {
		position: relative;
		left: 22.2%;
		top: 47.3%;
		z-index: 10000;
		color: #2fff58;
	}

	.a-sign-right {
		position: relative;
		left: 42.2%;
		top: 47.3%;
		z-index: 10000;
		color: #007aff;
	}


	.e-sign-left {
		position: relative;
		left: 8.5%;
		top: 53.7%;
		z-index: 10000;
		color: #007aff;
	}

	.ex-sign-left {
		position: relative;
		left: 12.2%;
		top: 53.7%;
		z-index: 10000;
		color: #a527ff;
	}

	.e-sign-center {
		position: relative;
		left: 17.2%;
		top: 53.7%;
		z-index: 10000;
		color: #007aff;
	}

	.ex-sign-center {
		position: relative;
		left: 22.2%;
		top: 53.7%;
		z-index: 10000;
		color: #a527ff;
	}

	.e-sign-right {
		position: relative;
		left: 42.2%;
		top: 53.7%;
		z-index: 10000;
		color: #007aff;
	}

	.picker-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		// margin-top: 10px;
	}

	.time-hide-second {
		width: 180px;
	}
</style>