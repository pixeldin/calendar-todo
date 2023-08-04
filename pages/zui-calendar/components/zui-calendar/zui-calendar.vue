<template>
	<view>
		<view class="date-box">
			<view class="top-tools" :style="{ display: isOpen ? 'block' : 'none' }">
				<text
					class="brief-title-day">{{ typeof day !== 'number' || isNaN(day) ? day : (day < 10 ? '0' + day : day) }}
				</text>
				<view :style="{ 'width': '70px' }">
					<text class="brief-title">{{year}} {{ month < 10 ? '0' + month : month }} 星期{{TWeek}}</text>
				</view>
				<view class="down-tip"></view>
				<view class="select-all" @tap="selectAll"></view>
			</view>
			<view class="box-list" :style="{'margin-bottom' : tasklist.length > 0 ? '20rpx' : '0'}">
				<!-- 收缩隐藏 -->
				<view class="date-top" :style="{ display: isOpen ? 'none' : 'block' }">
					<view class="conter-text">
						<view class="icon left-icon" @click="LastMonth">
							<view class="iconfont icon-arrow-left"></view>
						</view>
						<text class="day-title">{{year}}年{{month}}月{{day}}日</text>
						<view class="icon rigth-icon" @click="NextMonth">
							<view class="iconfont icon-arrow-right"></view>
						</view>
					</view>
				</view>
				<!-- 收缩高亮当前周目 -->
				<view :style="{ display: isOpen ? 'block' : 'none' }">
					<!-- 高亮框 -->
					<view class="week-container">
						<view v-for="item in weekList" :key="item" class="week-item-h"></view>
					</view>
					<!-- <view v-for="item in weekList" :key="item"> -->
					<!-- <view class="week-item-h"></view> -->
					<!-- </view> -->
				</view>
				<view class="date-week">
					<!-- 周目 -->
					<view class="week-item" v-for="item in weekList" :key="item"><text>{{item}}</text></view>
				</view>
				<view class="day-content" :style="{height: isOpen ? '80rpx' : 'auto'}" v-if="dayList.length > 0">
					<!-- 背景月份 -->
					<!-- <view class="day-item day-month" v-if="!isOpen"><text>{{month < 10 ? `0${month}` : month}}</text></view> -->
					<view class="day-item" v-for="(item, index) in dayList" :key="index" :data-index="index"
						@click="toActive(item, index)">
						<text class="day-text" v-if="item.day"
							:class="{ 'cTodayActive': item.day === day && item.today, 'actives': item.day === day, 'cToday': item.today }">
							{{ item.today ? '今' : (item.day < 10 ? '0' + item.day : item.day) }}
						</text>
						<!-- 签到status true -->
						<text class="value-text" v-if="item.data.status">{{item.data.value}}</text>
						<!-- 未签到status false -->
						<text class="value-text text-red" v-else>{{item.data.value}}</text>
						<text class="day-dot" v-if="item.data.dot && item.data.active"></text>
						<text class="day-dot dot-gray" v-if="item.data.dot && !item.data.active"></text>
					</view>
				</view>
				<view style="width: 100%;" v-if="isShrink">
					<view class="toggle" v-if="isOpen" @click="toStretch">
						<view class="iconfont icon-stretch"></view>
					</view>
					<view class="toggle" v-else @click="toShrink">
						<view class="iconfont icon-merge"></view>
					</view>
				</view>
			</view>
			<view>
				<!-- <div class="divider"></div> -->
				<!-- 胶囊tab切换 -->
				<!-- 
				Tyear: 2023,
				Tmonth: 8,
				Tday: 1,
				TWeek: "日" 
				-->
				<TabSwitch :ddList="ddList" :Tyear="Tyear" :Tmonth="Tmonth" :Tday="Tday" :TWeek="TWeek" />
			</view>
			<slot name="task">
				<view class="task-box" v-if="tasklist.length > 0">
					<view class="task-item" v-for="(item, index) in tasklist" :key="index" @click="toTask(item, index)">
						<view class="avatar-box">
							<view class="avatar">
								<image :src="item.avatar"></image>
							</view>
							<view class="title-box">
								<view class="title"><text>{{item.title}}</text></view>
								<view class="date"><text
										class="branch">时间：{{item.time}}</text><text>{{item.details}}</text></view>
							</view>
						</view>
						<view class="time"><text>{{item.date}}</text></view>
					</view>
				</view>
			</slot>
		</view>
		<view class="modal" v-if="show">
			<view class="mask" @click="close" v-if="closeOnClickOverlay"></view>
			<view class="z-content">
				<view class="modal-content">
					<view class="z-modal" :style="{width: width}">
						<view class="modal-title">
							<slot name="title"><text>{{title}}</text></slot>
						</view>
						<view class="z-modal-content">
							<slot name="content"><text>{{content}}</text></slot>
						</view>
						<view class="line"></view>
						<view class="modal-foot">
							<slot name="footer">
								<view class="cancel" @click="cancel" v-if="showCancelButton">
									<text :style="{color: cancelColor}">{{cancelText}}</text>
								</view>
								<view class="foot-line" v-if="showCancelButton && showConfirmButton"></view>
								<view class="confirm" @click="confirm" v-if="showConfirmButton">
									<text :style="{color: confirmColor}">{{confirmText}}</text>
								</view>
							</slot>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabSwitch from '@/pages/zui-calendar/components/zui-calendar/TabSwitch/TabSwitch.vue';
	export default {
		name: 'pxpDate',
		props: {
			tasklist: {
				type: Array,
				default: () => {
					return [{
							avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
							title: '英语词汇',
							time: '38分钟',
							details: '点击填写心得',
							date: '10:30'
						},
						{
							avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
							title: '英语词汇',
							time: '37分钟',
							details: '点击填写心得',
							date: '10:30'
						},
						{
							avatar: '',
							title: 'WPS签到',
							// time: '45分钟',
							details: '点击填写心得',
							date: '10:30'
						},
						// {
						// 	avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
						// 	title: '淘宝农场',
						// 	// time: '45分钟',
						// 	details:'点击填写心得',
						// 	date: '10:30'
						// },
						// {
						// 	avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
						// 	title: '英语语法',
						// 	// time: '45分钟',
						// 	details:'点击填写心得',
						// 	date: '10:30'
						// },
						// {
						// 	avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
						// 	title: 'QQ农场',
						// 	// time: '45分钟',
						// 	details:'点击填写心得',
						// 	date: '11:30'
						// },
						// {
						// 	avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
						// 	title: '京东抢购',
						// 	// time: '45分钟',
						// 	details:'点击填写心得',
						// 	date: '12:30'
						// },
						{
							avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
							title: '火车票',
							// time: '45分钟',
							details: '点击填写心得',
							date: '11:37'
						}
					]
				}
			},
			weekList: {
				type: Array,
				// default:() => ['日', '一', '二', '三', '四', '五', '六']
				default: () => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
			},
			date: {
				type: Object,
				default: () => {
					return {
						year: new Date().getFullYear(),
						month: parseInt(new Date().getMonth() + 1),
						day: parseInt(new Date().getDate())
					}
				}
			},
			extraData: {
				type: Array,
				default: () => {
					return [{
						date: '2023-8-2',
						value: '签到',
						status: true,
						dot: true,
						active: true
					}, {
						date: '2023-8-3',
						value: '未签到',
						status: false,
						dot: true,
						active: true
					}, {
						date: '2023-8-4',
						value: '未打卡',
						status: false,
						dot: true,
						active: false
					}] // {date: '2020-6-3', value: '签到', dot: true, active: true}
				}
			},

			show: {
				type: Boolean,
				default: false
			},

			title: {
				type: String,
				default: ''
			},

			content: {
				type: String,
				default: '--'
			},

			confirmText: {
				type: String,
				default: '确认'
			},

			cancelText: {
				type: String,
				default: '取消'
			},

			showConfirmButton: {
				type: Boolean,
				default: true
			},

			showCancelButton: {
				type: Boolean,
				default: false
			},

			confirmColor: {
				type: String,
				default: '#2979ff'
			},

			cancelColor: {
				type: String,
				default: '#606266'
			},

			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},

			width: {
				type: [Number, String],
				default: '650rpx'
			},
			isShrink: {
				type: Boolean,
				default: true
			},
			isUnfold: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				todoList: {},
				// 接受来自子页面
				receivedData: null,
				dayList: [],
				year: 2023,
				month: 8,
				day: 1,
				// today
				Tyear: 2023,
				Tmonth: 8,
				Tday: 1,
				TWeek: "日",
				isOpen: false,
				ddList: ['一', '2', '3', 'THU', 'FRI', 'SAT', '日'],
			}
		},
		components: {
			TabSwitch
		},
		onLoad: function(option) {
			if (!option.newDay) {
				console.log('--------- onLoad ---------')
				return
			}
			// 接收来自上一页参数
			console.log('onLoad=========', option.newDay)
			console.log('onLoad=========', option.remark)
			console.log('onLoad=========', option.color)
			console.log('onLoad=========', option.shour)
			console.log('onLoad=========', option.ehour)
			console.log('onLoad=========', option.smin)
			console.log('onLoad=========', option.emin)

			// 接收来自上一页参数
			const newDay = option.newDay;

			// 检查是否已存在该日期的记录，若不存在则创建一个新的数组
			if (!this.todoList.hasOwnProperty(newDay)) {
				console.log('############# todoList创建一个新的数组 ########')
				this.todoList[newDay] = [];
			}

			// 创建新的todo对象
			const todo = {
				sTimeHour: option.shour || '00',
				eTimeHour: option.ehour || '00',
				sTimeMin: option.smin || '00',
				eTimeMin: option.emin || '00',
				mark: option.remark || '',
				finished: false,
				uuid: Date.now() // 时间戳作为唯一标识
			};

			// 将todo对象添加到对应日期的数组中
			this.todoList[newDay].push(todo);
		},
		created() {
			this.isOpen = this.isUnfold
			const {
				year,
				month,
				day
			} = this.date
			this.year = year
			this.month = month
			this.day = day
			this.initTime()
			this.initApi(this.year, this.month)
		},
		methods: {
			printTodoList() {
				console.log(todoList)
				for (const key in this.todoList) {
					if (this.todoList.hasOwnProperty(key)) {
						console.log(`日期：${key}`);
						console.log("=============");

						const todos = this.todoList[key];

						if (todos.length === 0) {
							console.log("暂无记录");
						} else {
							todos.forEach(todo => {
								console.log(`开始时间：${todo.sTimeHour}:${todo.sTimeMin}`);
								console.log(`结束时间：${todo.eTimeHour}:${todo.eTimeMin}`);
								console.log(`备注：${todo.mark}`);
								console.log(`状态：${todo.finished ? "已完成" : "未完成"}`);
								console.log(`标识：${todo.uuid}`);
								console.log("---------------");
							});
						}

						console.log(""); // 输出空行分隔每个日期的内容
					}
				}
			},
			// 删除todo
			deleteTodoItem(key, uuid) {
				// 根据日期和uuid查找对应的todo对象所在的索引
				const index = this.todoList[key].findIndex(item => item.uuid === uuid);

				// 如果找到了对应的todo对象，则从数组中删除
				if (index !== -1) {
					this.todoList[key].splice(index, 1);
				}
			},

			// 更新todo的finished状态
			updateTodoStatus(key, uuid, status) {
				// 根据日期和uuid查找对应的todo对象所在的索引
				const index = this.todoList[key].findIndex(item => item.uuid === uuid);

				// 如果找到了对应的todo对象，则更新其finished状态
				if (index !== -1) {
					this.todoList[key][index].finished = status;
				}
			},
			initTime() {
				const {
					year,
					month,
					day
				} = this.getTimeNowDate()
				this.year = year
				this.month = month
				this.day = day
				this.Tyear = year
				this.Tmonth = month
				this.Tday = day
				this.TWeek = this.getDayOfWeek(this.Tyear, this.Tmonth, this.Tday)
				console.log('### initTime 今日时间为：' + this.Tyear + '-' + this.Tmonth + '-' + this.Tday, '周', this.TWeek)
				// TODO... 更新相应属性, 准备传递给创建页面
			},
			toShrink() {
				let falg = null
				// console.log(this.year)
				// console.log(this.month)
				// console.log(this.day)
				const dateArr = this.getTime(this.year, this.month);
				// console.log(dateArr)
				const line = dateArr.map((item, index) => {

					// console.log(item.day)
					if (this.day == item.day) {
						console.log('toShrink 聚焦天=======index/day', index, item.day)
						this.TWeek = this.getDayOfWeek(this.year, this.month, item.day)
						falg = Math.floor(index / 7)
						return Math.floor(index / 7)
					}
				})
				// console.log(line)
				console.log('toShrink======== flag:', falg)
				this.dayList = dateArr.slice(falg * 7, (falg + 1) * 7)
				this.isOpen = true
				// 修改粉色
				this.changeDayItemColor('#ac7984', 'normal')
			},
			// 改变日历天颜色
			changeDayItemColor(color, fontW) {
				console.log('changeDayItemColor ---------')
				const dayItems = document.querySelectorAll('.day-content .day-item')
				for (let i = 0; i < dayItems.length; i++) {
					dayItems[i].style.color = color
					dayItems[i].style.fontWeight = fontW
				}
			},
			toStretch() {
				console.log('收缩Stretch')
				this.dayList = this.getTime(this.year, this.month)
				this.isOpen = false
				// 修改黑色
				this.changeDayItemColor('#110c0d', 'bold')
			},
			getTimeNowDate() {
				var date = new Date()
				var year = date.getFullYear()
				var month = parseInt(date.getMonth() + 1)
				var day = date.getDate()
				if (month < 10) {
					month = '0' + month
				}

				if (day < 10) {
					day = '0' + day
				}

				const resultDate = {
					year: year,
					month: parseInt(month),
					day: parseInt(day)
				}

				return resultDate
			},

			initApi(year, month) {
				if (this.isShrink && this.isOpen) {
					this.toShrink()
				} else {
					this.dayList = this.getTime(year, month)
				}
			},
			getTime(year, month) {
				return this.createDayList(year, month)
			},
			createDayList(year, month) {
				console.log("Pxp createDayList###################, year/month", year, month)
				let tflag = false
				if (year === this.Tyear && month === this.Tmonth) {
					tflag = true
				}
				const count = this.getDayNum(year, month)
				const week = new Date(year + '/' + month + '/1').getDay()
				console.log('createDayList: week======', week)
				let list = []
				for (let i = 1; i <= count; i++) {
					let data = {};
					for (let item of this.extraData) {
						let dateString = item.date;
						let dateArr = dateString.indexOf('-') !== -1 ? dateString.split('-') : dateString.indexOf('/') !==
							-1 ? dateString.split('/') : [];
						if (dateArr.length === 3 && Number(dateArr[0]) === Number(this.year) && Number(dateArr[1]) ===
							Number(this.month) && Number(dateArr[2]) === Number(i)) {
							data = item
						}
					}
					let obj = {
						day: i,
						today: false,
						data
					}
					if (tflag && i === this.Tday) {
						// console.log("Pxp reset Today!")
						obj.today = true;
					}
					list.push(obj)
				}
				// for(let i = 0; i < week; i++){
				// 周一开始
				for (let i = 0; i < week - 1; i++) {
					// list.unshift(this.getDayNum(year, month - 1) -i)
					list.unshift({
						day: null,
						data: {}
					})
				}
				console.log('createDayList: ======', list)
				return list
			},

			getDayNum(year, month) {
				let dayNum = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
				if ((year % 4 !== 0) && (year % 100 === 0) || (year % 400 !== 0)) {
					dayNum[1] = 28
				}
				return dayNum[month - 1]
			},

			// 根据日期获取周几
			getDayOfWeek(year, month, day) {
				const date = new Date(year, month - 1, day);
				const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
				const dayOfWeek = daysOfWeek[date.getDay()];
				return dayOfWeek;
			},

			// 点击日数方法
			clickActive(year, month, day, index) {
				const dayOfWeek = this.getDayOfWeek(year, month, day);
				// console.log(dayOfWeek); // 输出：星期五
				console.log('clickActive ====== 点击的 year/month/date/周', year, month, day, dayOfWeek)
				// 更新相应属性, 准备传递给创建页面
				this.Tyear = year
				this.Tmonth = month
				this.Tday = day
				this.TWeek = dayOfWeek
				this.ddList.splice(1, 1, '周二');
				this.ddList.splice(3, 1, '周四');
				// console.log('clickActive 今日时间为：' + this.Tyear + '-' + this.Tmonth + '-' +this.Tday )

			},

			// 全选
			selectAll(event) {
				// 在这里编写点击事件的处理逻辑
				console.log('点击了全选');
				// 触发自定义事件，通知子页面隐藏 tab-buttons
				uni.$emit('hideTabButtons');
			},

			// 点击任务方法
			clickTask(row, index) {
				console.log('clickTask ======= row/index', row, index)
				this.ddList.splice(1, 1, 'Two')
				this.ddList.splice(3, 1, 'Thursday')

				this.printTodoList()
			},

			toActive(item, index) {
				this.day = item.day
				this.clickActive(this.year, this.month, item.day, this.year + '-' + this.month + '-' + this.day, index)
			},

			toTask(item, index) {
				console.log('toTask')
				this.clickTask(item, index)
			},

			LastMonth() {
				if (this.month > 1) {
					this.month = this.month - 1
					this.initApi(this.year, this.month)
				} else {
					this.LastYear(false)
					this.month = 12
					this.initApi(this.year, this.month)
				}
				this.$emit('last-month', {
					year: this.year,
					month: this.month
				})
			},

			NextMonth() {
				if (this.month < 12) {
					this.month = this.month + 1
				} else {
					this.NextYear(false)
					this.month = 1
				}
				this.initApi(this.year, this.month)
				this.$emit('next-month', {
					year: this.year,
					month: this.month
				})
			},

			LastYear(flag = true) {
				if (this.year > 2000) {
					this.year = this.year - 1
					if (flag) {
						this.initApi(this.year, this.month)
					}
					this.$emit('last-year', {
						year: this.year,
						month: this.month,
						day: this.day
					})
				}
			},

			NextYear(flag = true) {
				this.year = this.year + 1
				this.initApi(this.year, this.month)
				this.$emit('next-year', {
					year: this.year,
					month: this.month,
					day: this.day
				})
			},

			confirm() {
				this.$emit('confirm')
			},

			cancel() {
				this.$emit('cancel')
			},

			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	@import "iconfont.css";
	@import url("./cal.css");

	/* 取消顶部导航 */
	.uni-nav {
		display: none;
	}

	.date-box {
		display: flex;
		flex-direction: column;
		flex: 1;
		/* padding: 20rpx; */

		.top-tools {
			width: 100%;
			height: 80rpx;
			color: #b46274;
			/* background-color: #1467cc; */
			background-color: #FCEDFA;
			padding: 10rpx 20rpx;
			position: relative;
		}

		/* 顶部概要日期-天 */
		.brief-title-day {
			font-weight: bold;
			font-size: 52rpx;
			color: #b4416f;
			position: relative;
			padding: 0 3rpx;
		}

		/* 顶部概要日期-年份/月/星期 */
		.brief-title {
			/* // font-weight: bold; */
			width: 14%;
			font-size: 26rpx;
			/* // background-color: #8bcc40; */
			background-color: #FCEDFA;
			word-wrap: break-word;
			/* 顶部日期标题 */
			color: #b46274;
			position: absolute;
			top: 19%;
			left: 14%;
			/* // padding: 0 0rpx; */
		}

		.down-tip {
			background-image: url('../../static/icon/down-tip.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 10px;
			height: 10px;
			position: absolute;
			top: 48.4%;
			left: 31%;
		}

		.select-all {
			background-image: url('../../static/icon/check-all-dark.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 24px;
			height: 24px;
			position: absolute;
			top: 26.4%;
			left: 85.4%;
			/* // color: #a3b432; */
			/* // background-color: #18b566; */
		}

		.box-list {
			background-color: #FCEDFA;

			/* border-radius: 20rpx; */
			.date-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				// padding: 20rpx 180rpx;

				padding-left: 210rpx;
				padding-right: 200rpx;
				padding-top: 18rpx;
				padding-bottom: 20rpx;

				/* margin-left: auto;
				margin-right: auto; */
				.icon {
					width: 50rpx;
					height: 50rpx;
					line-height: 50rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.conter-text {
					font-size: 32rpx;
					/* font-weight: bold; */
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.day-title {
						font-weight: bold;
						/* 顶部日期标题 */
						color: #b46274;
						padding: 0 0rpx;
					}
				}
			}

			.week-container {
				display: flex;
				// position: relative;
				// align-items: center;
				justify-content: space-between;
				top: 112rpx;
				// left: 1%;
				width: 95%;
				height: 165rpx;
				left: 21rpx;
				// padding-left: 1rpx;
				position: absolute;
			}

			.week-item-h {
				display: flex;
				// justify-content: center;
				// align-items: center;				
				// top: 1%;
				width: calc(89%/7);
				padding: 0rpx 0rpx;
				// height: 68%;
				// margin-left: 5rpx;				
				// margin-left: 3rpx;
				text-align: center;
				font-size: 28rpx;
				border-radius: 14rpx;
				// border: 1px solid #000000; 
				background-color: #F5C8D0;
			}


			.date-week {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex: 1;
				// padding-top: 10rpx;
				padding-bottom: 3rpx;
				padding-top: 28rpx;
				padding-right: 15rpx;
				padding-left: 15rpx;
				border-bottom: 1rpx solid #f3f4f6;

				.week-item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: calc(100%/7);
					height: 52rpx;
					text-align: center;
					font-size: 28rpx;
					/* 星期几标识 */
					color: #b55370;
					z-index: 0;
				}
			}

			.day-content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				padding: 3rpx 20rpx;
				position: relative;

				.day-item {
					display: flex;
					flex-direction: column;
					/* justify-content: center; */
					align-items: center;
					width: calc(100%/7);
					height: 70rpx;
					text-align: center;
					font-size: 30rpx;
					z-index: 2;
					font-weight: bold;
					color: #2a1d20;
					position: relative;

					.day-text {
						width: 65rpx;
						height: 65rpx;
						line-height: 65rpx;

						/* margin-bottom: 5rpx; */
						&.actives {
							color: #fff;
							box-sizing: border-box;
							background-color: #C37F8F;
							border-radius: 6rpx;
							border-radius: 50%;
						}

						&.cToday {
							background-color: #ffffff;
							box-sizing: border-box;
							border-radius: 6rpx;
							border-radius: 50%;
							font-weight: bold;
							color: #ac7984
						}

						/* 今天活动 */
						&.cTodayActive {
							background-color: #C37F8F;
							color: #ffffff;
							box-sizing: border-box;
							border-radius: 6rpx;
							border-radius: 50%;
						}
					}

					.value-text {
						font-size: 24rpx;
						color: #18b566;

						/* 未完成样式 */
						&.text-red {
							color: #dd6161;
						}
					}

					.day-dot {
						margin-top: 5rpx;
						background: #5ebeff;
						border-radius: 50%;
						padding: 3.3rpx;
						position: absolute;
						bottom: 10rpx;

						&.dot-gray {
							background: #aaaaff;
						}
					}
				}

				.day-month {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					/* color: rgba(231,232,234,.83); */
					font-size: 200px;
					font-weight: 700;
					color: #999;
					opacity: .1;
					text-align: center;
					line-height: 1;
					z-index: 1;
				}
			}

			.toggle {
				position: relative;
				// padding: 10rpx 0;
				padding-top: 28rpx;
				padding-bottom: 13rpx;
				margin: 3rpx 5rpx 0;
				display: flex;
				justify-content: center;

				&:before {
					width: calc(50% - 30rpx);
					border-top: solid 1px #EAEAEA;
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}

				&:after {
					width: calc(50% - 30rpx);
					border-top: solid 1px #EAEAEA;
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}
		}

		.task-box {
			display: flex;
			flex-direction: column;

			.task-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				margin-bottom: 20rpx;

				.avatar-box {
					display: flex;

					.avatar {
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
						border-radius: 50%;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}
					}

					.title-box {
						display: flex;
						flex-direction: column;
						align-content: space-between;

						.title {
							font-size: 30rpx;
							color: #8f9298;
							margin-bottom: 15rpx;
						}

						.date {
							font-size: 26rpx;
							color: #909193;

							.branch {
								margin-right: 15rpx;
							}
						}
					}
				}
			}
		}
	}

	.modal {
		display: flex;
		flex-direction: column;
		flex: 1;

		.mask {
			transition-duration: 450ms;
			transition-timing-function: ease-out;
			position: fixed;
			inset: 0px;
			z-index: 10070;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.z-content {
			z-index: 10075;
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: center;
			inset: 0px;

			.modal-content {
				border-radius: 6px;
				overflow: hidden;
				margin-top: 0px;
				/* height: 200px; */
				background-color: #fff;
				position: relative;

				.z-modal {
					width: 289px;
					border-radius: 6px;
					overflow: hidden;

					.modal-title {
						font-size: 16px;
						font-weight: 700;
						color: #606266;
						text-align: center;
						padding-top: 25px;
					}

					.z-modal-content {
						padding: 12px 25px 25px 25px;
						display: flex;
						flex-direction: row;
						justify-content: center;
						font-size: 15px;
						color: #606266;
					}

					.line {
						margin: 0px;
						border-bottom: 1px solid rgb(214, 215, 217);
						width: 100%;
						transform: scaleY(0.5);
						border-top-color: rgb(214, 215, 217);
						border-right-color: rgb(214, 215, 217);
						border-left-color: rgb(214, 215, 217);
						vertical-align: middle;
					}

					.modal-foot {
						display: flex;
						flex-direction: row;
						font-size: 16px;
						text-align: center;
						color: rgb(96, 98, 102);

						.cancel {
							flex: 1;
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
							height: 48px;
						}

						.foot-line {
							margin: 0px;
							border-left: 1px solid rgb(214, 215, 217);
							height: 48px;
							transform: scaleX(0.5);
							border-top-color: rgb(214, 215, 217);
							border-right-color: rgb(214, 215, 217);
							border-bottom-color: rgb(214, 215, 217);
						}

						.confirm {
							flex: 1;
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
							height: 48px;

							text {
								color: rgb(41, 121, 255);
							}
						}
					}
				}

			}
		}
	}
</style>