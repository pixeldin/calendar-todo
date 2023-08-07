<template>
	<view>
		<view class="top-loc"></view>
		<view class="date-box">
			<view class="top-tools" :style="{ display: isOpen ? 'block' : 'none' }">
				<text
					class="brief-title-day">{{ typeof day !== 'number' || isNaN(day) ? day : (day < 10 ? '0' + day : day) }}
				</text>
				<view :style="{ 'width': '70px' }">
					<text class="brief-title">{{year}} {{ month < 10 ? '0' + month : month }} 星期{{TWeek}}</text>
				</view>
				<view class="down-tip"></view>
				<view class="select-all" @click="selectAll"></view>
			</view>
			<view class="box-list" :style="{'margin-bottom' : tasklist.length > 0 ? '20rpx' : '0'}">
				<!-- 收缩隐藏 -->
				<view class="date-top" :style="{ display: isOpen ? 'none' : 'block' }">
					<view class="conter-text">
						<view class="left-icon" @click="LastMonth">
							<view class=""></view>
						</view>
						<text class="day-title">{{year}}年{{month}}月{{day}}日</text>
						<view class="right-icon" @click="NextMonth">
							<view class=""></view>
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
					<view class="day-item" v-for="(item, index) in dayList" :key="index" :data-index="index"
						@click="toActive(item, index)">
						<text class="day-text" v-if="item.day"
							:class="{ 'cTodayActive': item.day === day && item.today, 'actives': item.day === day, 'cToday': item.today }">
							{{ item.today ? '今' : (item.day < 10 ? '0' + item.day : item.day) }}
						</text>
						<text class="day-dot" v-if="item.data.dot && item.data.active"></text>
						<text class="day-dot dot-gray" v-if="item.data.dot && !item.data.active"></text>
					</view>
				</view>
				<view style="width: 100%;" v-if="isShrink">
					<view class="toggle" v-if="isOpen" @click="toStretch">
						<image src="https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/down.png" class="icon-down"></image>
					</view>
					<view class="toggle" v-else @click="toShrink">
						<image src="https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/up.png" class="icon-up"></image>
					</view>
				</view>
			</view>

		</view>
		<view class="tab-container">
			<!-- 全选与取消 -->
			<view class="select-buttons">
				<button class="btn-unselect" @click="unselectAll()">全不选</button>
				<button class="btn-cancel" @click="clickCancelSelect()">取消</button>
			</view>

			<view class="tab-buttons">
				<button :class="{'tab-button': true, 'active': activeTab === 1}" @click="switchTab(1)">已完成</button>
				<button :class="{'tab-button': true, 'active': activeTab === 2}" @click="switchTab(2)">未完成</button>
			</view>

			<view class="tab-content">
				<view v-show="activeTab === 1" class="job-list" v-for="(item, index) in localjobList" :key="item"
					:class="{ 'selected': selectedJobIndexes.includes(index) }" @click="checkJob(item, index)">
					<view class="color-tip" :style="{ 'background-color': item.color }"></view>
					<view class="job-date">
						<view class="job-day">{{item.day < 10 ? '0' + item.day : item.day}}</view>
						<view class="job-ym">{{item.year}} {{item.month < 10 ? '0' + item.month : item.month}}</view>
						<view class="job-week">{{item.weekday}}</view>
					</view>
					<view class="job-time">
						<image class="tag-icon" src='https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/tag.png'></image>
						{{ item.sTimeHour < 10 ? '0' + item.sTimeHour : item.sTimeHour }}:{{ item.sTimeMin < 10 ? '0' + item.sTimeMin : item.sTimeMin }}
						-
						{{ item.eTimeHour < 10 ? '0' + item.eTimeHour : item.eTimeHour }}:{{ item.eTimeMin < 10 ? '0' + item.eTimeMin : item.eTimeMin }}
					</view>
					<view class="job-mark">{{ item.mark }}</view>
					<!-- <view class="check-icon" @click="checkJob(item, index)"></view> -->
					<view class="check-icon"></view>
				</view>
				<view v-show="activeTab === 2" class="job-list" v-for="(item, index) in localjobList" :key="item"
					:class="{ 'selected': selectedJobIndexes.includes(index) }" @click="checkJob(item, index)">
					<!-- <view class="job-row"> -->
					<view class="color-tip" :style="{ 'background-color': item.color }"></view>
					<view class="job-date">
						<view class="job-day">{{item.day < 10 ? '0' + item.day : item.day}}</view>
						<view class="job-ym">{{item.year}} {{item.month < 10 ? '0' + item.month : item.month}}
						</view>
						<view class="job-week">{{item.weekday}}</view>
						<!-- {{ selectKey }} -->
					</view>
					<view class="job-time">
						<image class="tag-icon" src='https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/tag.png'></image>
						{{ item.sTimeHour < 10 ? '0' + item.sTimeHour : item.sTimeHour }}:{{ item.sTimeMin < 10 ? '0' + item.sTimeMin : item.sTimeMin }}
						-
						{{ item.eTimeHour < 10 ? '0' + item.eTimeHour : item.eTimeHour }}:{{ item.eTimeMin < 10 ? '0' + item.eTimeMin : item.eTimeMin }}
					</view>
					<view class="job-mark">{{ item.mark }}</view>
					<!-- <view class="uncheck-icon" v-show="!item.checked" @click="checkJob(item, index)"></view> -->
					<view class="uncheck-icon"></view>

					<!-- </view> -->
					<!-- <view class="job-status">{{ item.finished ? '已完成' : '未完成' }}</view> -->
				</view>
			</view>
			<button class="btn-create" @click="createItem()"></button>
			<button class="btn-debug" @click="debug()"></button>
		</view>
		<!-- 任务删除-完成 -->
		<view class="job-tools">
			<view class="del" @click="forSure()">
				<image class="del-icon"></image>
				<text>删除</text>
			</view>
			<view class="finish" @click="finishJob()">
				<image class="finish-icon"></image>
				<text>完成</text>
			</view>
		</view>
		<view>
			<!-- <button @click="showModal">点击弹出模态框</button> -->

			<view v-if="showDialog" class="modal-background">
				<view class="modal-content">
					<text class="asking">确定要删除此标签吗？</text>
					<view class="for-sure-button">
						<view class="delete-button" @click="deleteJob">删除</view>
						<view class="cancel-button" @click="hideModal">取消</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>	
	import saveJob from '@/pages/zui-calendar/savejob.js';
	export default {
		name: 'pxpDate',
		props: {
			tasklist: {
				type: Array,
				default: () => {
					return []
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
						date: '2023-8-1',
						value: '签到',
						status: true,
						dot: true,
						active: true
					}, {
						date: '2023-8-5',
						value: '未签到',
						status: false,
						dot: true,
						active: true
					}, {
						date: '2023-8-6',
						value: '未打卡',
						status: false,
						dot: true,
						active: true
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
				// selectAll: false,
				selectedJobIndexes: [],
				selectedJobUUid: [],
				todoList: {},
				showDialog: false,
				// 接受来自子页面
				receivedData: null,
				dayList: [],
				year: 2023,
				month: 8,
				day: 1,
				// absDay 绝对时间, 启动时刻的日期
				Ayear: 2023,
				Amonth: 8,
				Aday: 1,
				AWeek: 1,
				// selectday
				Tyear: 2023,
				Tmonth: 8,
				Tday: 1,
				TWeek: "日",
				isOpen: false,
				// tabSwitch
				activeTab: 1,
				localjobList: {},
				selectKey: ''
			}
		},
		components: {},
		onLoad: function(option) {
			console.log('Pxp --------- onLoad from js---------', saveJob.jobList)

			if (!option.newDay) {
				console.log('--------- onLoad ---------')
				return
			}
			// 接收来自上一页参数
			const newDay = option.newDay;

			// 检查是否已存在该日期的记录，若不存在则创建一个新的数组
			this.todoList = saveJob.jobList
			console.log('新事项: ', newDay, '--------list, saveJob.jobList========', saveJob.jobList)
			if (!this.todoList.hasOwnProperty(newDay)) {
				console.log('------- todoList创建一个新的数组 ########')
				this.todoList[newDay] = [];
			}

			// 创建新的todo对象
			const todo = {
				sTimeHour: option.shour || '00',
				eTimeHour: option.ehour || '00',
				sTimeMin: option.smin || '00',
				eTimeMin: option.emin || '00',
				mark: option.remark || '',
				color: option.color || '2B89B8',
				finished: false,
				uuid: Math.floor(Date.now() / 1000) // 时间戳作为唯一标识
			};

			this.updateTodoWithDate(todo, newDay);

			// 将todo对象添加到对应日期的数组中
			this.todoList[newDay].push(todo);
			saveJob.updateJobList(this.todoList)
			/*
				toActive(item, index) {
					this.day = item.day
					console.log('toActive item/index, this.day', item, index, this.day)
					this.clickActive(this.year, this.month, item.day, this.year + '-' + this.month + '-' + this.day, index)
				}
			*/
			const dateStr = newDay;
			const date = new Date(dateStr);
			const sday = date.getDate();
			// 光标聚焦
			console.log('光标聚焦 debug======== this.day / sday', this.day, sday)
			this.clickActive(this.year, this.month, sday, this.year + '-' + this.month + '-' + sday, sday)
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
			showModal() {
				this.showDialog = true;
			},
			hideModal() {
				this.showDialog = false;
			},
			updateTodoWithDate(todo, newDay) {
				const date = new Date(newDay);

				todo.year = date.getFullYear();
				todo.month = date.getMonth() + 1;
				todo.day = date.getDate();
				todo.weekday = date.toLocaleDateString('zh-CN', {
					weekday: 'long'
				});
			},
			forSure() {
				this.showDialog = true;
			},
			deleteJob() {
				console.log('执行删除标签的操作');
				this.hideModal(); // 删除完成后隐藏模态框

				if (!Array.isArray(this.selectedJobIndexes) || this.selectedJobIndexes.length === 0) {
					console.log('nothing select')
					return;
				}

				if (!Array.isArray(this.selectedJobUUid) || this.selectedJobUUid.length === 0) {
					console.log('nothing select')
					return;
				}

				console.log('点击了deleteJob, 当前选中: ', this.selectedJobIndexes);
				console.log('点击了deleteJob, 当前选中uuid: ', this.selectedJobUUid);
				// 删除job并且更新
				// var temp = saveJob.jobList[this.selectKey]
				console.log('遍历删除前 --------- localjobList:', saveJob.jobList)
				this.selectedJobUUid.forEach(uuid => {
					console.log('遍历删除------', uuid)
					saveJob.removeJobElementByKeyAndUuid(this.selectKey, uuid)
				});

				console.log('遍历删除后 --------- localjobList:', saveJob.jobList)
				this.selectedJobUUid = [];
				// 更新事项
				this.localjobList = saveJob.jobList[this.selectKey].filter(job => job.finished === false);
				this.switchTab(2)
				// 隐藏job-tool框
				this.changeHideStatus('job-tools', 'none')
				this.changeHideStatus('select-buttons', 'none')
			},
			finishJob() {
				if (!Array.isArray(this.selectedJobIndexes) || this.selectedJobIndexes.length === 0) {
					console.log('nothing select')
					return;
				}

				if (!Array.isArray(this.selectedJobUUid) || this.selectedJobUUid.length === 0) {
					console.log('nothing select')
					return;
				}
				console.log('点击了finishJob, 当前选中: ', this.selectedJobIndexes);
				console.log('点击了finishJob, 当前选中uuid: ', this.selectedJobUUid);

				this.selectedJobUUid.forEach(uuid => {
					console.log('遍历更新------', uuid)
					saveJob.updateStatusJobElementByKeyAndUuid(this.selectKey, uuid, true)
				});
				this.selectedJobUUid = [];
				this.selectedJobIndexes = [];
				console.log('遍历更新后 --------- localjobList:', saveJob.jobList)
				// 更新事项
				this.localjobList = saveJob.jobList[this.selectKey].filter(job => job.finished === true);

				this.switchTab(1)
				// 隐藏job-tool框
				this.changeHideStatus('job-tools', 'none')
				this.changeHideStatus('select-buttons', 'none')
			},
			debug() {
				this.switchTab(2)
			},
			checkJob(item, index) {
				console.log('checkJob ------- item: ', item)

				// 展示选择栏目工具
				this.changeHideStatus('job-tools', 'flex')
				this.changeHideStatus('select-buttons', 'flex')
				// 
				item.checked = true;
				console.log('点击了checkJob-----------', index);

				const uidSelected = this.selectedJobUUid.includes(item.uuid);
				if (uidSelected) {
					const uidIndex = this.selectedJobUUid.indexOf(item.uuid);
					this.selectedJobUUid.splice(uidIndex, 1);
				} else {
					this.selectedJobUUid.push(item.uuid);
				}

				const isSelected = this.selectedJobIndexes.includes(index);
				if (isSelected) {
					const selectedIndex = this.selectedJobIndexes.indexOf(index);
					this.selectedJobIndexes.splice(selectedIndex, 1);
				} else {
					this.selectedJobIndexes.push(index);
				}
			},
			updateJob(y, m, d, status) {
				// this.$refs.tabSwitchRef.getDayJob(y, m, d, status);
				// this.$refs.tabSwitchRef.switchTab(2)
			},
			printTodoList() {
				console.log(this.todoList)
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

				var wk = this.getDayOfWeek(this.Tyear, this.Tmonth, this.Tday)
				this.Tyear = year
				this.Tmonth = month
				this.Tday = day
				this.TWeek = wk

				// 绝对时间赋值
				this.Ayear = year
				this.Amonth = month
				this.Aday = day
				this.AWeek = wk
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
				if (year === this.Ayear && month === this.Amonth) {
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
					if (tflag && i === this.Aday) {
						// console.log("Pxp reset Today!")
						// console.log("Pxp 当前 Tyear/Tmonth/Tday", this.Ayear, this.Amonth, this.Aday)
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

			// 点击日数方法, 更新job并且切换tab 默认看已完成'true'
			clickActive(year, month, day, index) {
				const dayOfWeek = this.getDayOfWeek(year, month, day);
				// console.log(dayOfWeek); // 输出：星期五
				console.log('clickActive ====== 点击的 year/month/date/周', year, month, day, dayOfWeek)
				// 更新相应属性, 准备传递给创建页面
				this.Tyear = year
				this.Tmonth = month
				this.Tday = day
				this.TWeek = dayOfWeek
				this.switchTab(1)
				// console.log('clickActive 今日时间为：' + this.Tyear + '-' + this.Tmonth + '-' +this.Tday )
				// TODO 默认看已完成'true'
				// this.updateJob(this.Tyear, this.Tmonth, this.Tday, false);
			},

			// 全选
			selectAll(event) {
				console.log('点击了全选');
				// 展示选择栏目工具
				this.changeHideStatus('job-tools', 'flex')
				this.changeHideStatus('select-buttons', 'flex')
				// 显示选择操作栏
				var selectButtons = document.querySelector('.select-buttons');
				selectButtons.style.display = 'flex';
				// 全选，将 localjobList 中所有项的索引和对应的 uuid 添加到 selectedJobIndexes 和 selectedJobUUid
				this.selectedJobIndexes = this.localjobList.map((item, index) => index);
				this.selectedJobUUid = this.localjobList.map(item => item.uuid);
			},

			// tab-switch method
			getDayJob(y, m, d, status) {
				// 转换样式
				if (status) {
					// console.log('activeTab = 1')
					this.activeTab = 1;
				} else {
					// console.log('activeTab = 2')
					this.activeTab = 2
				}
				this.selectKey = y + '/' + m + '/' + d;
				if (saveJob.jobList.hasOwnProperty(this.selectKey)) {
					console.log('pxp================查找key', this.selectKey, ',status ', status)
					console.log('pxp============当前所有状态:', saveJob.jobList)
					// this.localjobList = saveJob.jobList[selectKey]
					this.localjobList = saveJob.jobList[this.selectKey].filter(job => job.finished === status);
					console.log('getDayJob, found: ', this.selectKey, 'with value: ', this.localjobList,
						'finished status: ',
						status)
				} else {
					console.log('getDayJob, not found: ', this.selectKey)
					this.localjobList = []
				}
			},
			switchTab(tabIndex) {
				// :jobList="todoList" :ddList="ddList" :Tyear="Tyear" :Tmonth="Tmonth" :Tday="Tday" :TWeek="TWeek"
				// this.selectKey = this.Tyear + '/' + this.Tmonth + '/' + this.Tday;
				this.activeTab = tabIndex;
				if (tabIndex === 1) {
					this.getDayJob(this.Tyear, this.Tmonth, this.Tday, true);
				} else {
					this.getDayJob(this.Tyear, this.Tmonth, this.Tday, false);
				}
				console.log('switchTab, index: ', tabIndex)
			},
			changeHideStatus(className, displayValue) {
				var elements = document.querySelectorAll('.' + className);
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.display = displayValue;
				}
			},
			unselectAll() {
				console.log('click unselect')
				this.selectedJobIndexes = [];
				this.selectedJobUUid = [];
				this.changeHideStatus('job-tools', 'none')
				this.changeHideStatus('select-buttons', 'none')
				for (let item of this.localjobList) {
					item.checked = false;
				}
			},
			clickCancelSelect() {
				console.log('click unselect')
				this.selectedJobIndexes = [];
				this.selectedJobUUid = [];
				this.changeHideStatus('job-tools', 'none')
				this.changeHideStatus('select-buttons', 'none')
				for (let item of this.localjobList) {
					item.checked = false;
				}
			},
			createItem() {
				console.log('Todo pass newItem, 目标天:', this.Tyear, this.Tmonth, this.Tday, '周', this.TWeek)
				const Tyear = this.Tyear;
				uni.navigateTo({
					url: '/pages/zui-calendar/components/zui-calendar/newItem/newItem' +
						'?Tyear=' + this.Tyear +
						'&Tmonth=' + this.Tmonth +
						'&Tday=' + this.Tday +
						'&Tweek=' + this.TWeek
				});
			},

			// 点击任务方法
			clickTask(row, index) {
				console.log('clickTask ======= row/index', row, index)

				console.log('--------- clickTask job from js---------', saveJob.job)
				this.printTodoList()
			},

			toActive(item, index) {
				this.day = item.day
				// console.log('toActive item/index, this.day', item, index, this.day)
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
	@import url("./cal.css");

	/* 取消顶部导航 */
	.uni-nav {
		display: none;
	}

	.top-loc {
		width: 100%;
		height: 52rpx;
		// background-color: #00ff7f;
		background-color: #FCEDFA;
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
			// background-color: #1467cc;
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
			background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/down-tip.png');
			background-size: contain;
			background-repeat: no-repeat;
			width: 10px;
			height: 10px;
			position: absolute;
			top: 48.4%;
			left: 31%;
		}

		.select-all {
			background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/check-all-dark.png');
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

				padding-left: 210rpx;
				padding-right: 200rpx;
				padding-top: 38rpx;
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
				
				.left-icon {
					width: 13px;
					height: 13px;
					background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/left.png');
					background-size: contain;
					background-repeat: no-repeat;
				}
				.right-icon {
					width: 13px;
					height: 13px;
					background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/right.png');
					background-size: contain;
					background-repeat: no-repeat;
				}
				
				.up-icon {
					width: 13px;
					height: 13px;
					background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/right.png');
					background-size: contain;
					background-repeat: no-repeat;
				}
				
				.down-icon {
					width: 13px;
					height: 13px;
					background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/right.png');
					background-size: contain;
					background-repeat: no-repeat;
				}
			}

			.week-container {
				display: flex;
				// position: relative;
				// align-items: center;
				justify-content: space-between;
				top: 172rpx;
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
				border-radius: 6px;
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
				padding-top: 32rpx;
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
				.iconfont {
				  display: flex;
				  align-items: center;
				  justify-content: center;
				}
				.icon-down {
					width: 16px;
					height: 16px;
				}
				.icon-up {
					width: 16px;
					height: 16px;
				}
			}
		}

	}

	// tab-switch start
	.select-buttons {
		display: none;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1%;
		/* border-radius: 10px; */
		// background-color: #c8ff46;
		margin-bottom: 10px;
	}

	.btn-unselect {
		font-size: 24rpx;
		position: relative;
		right: 120rpx;
		border: none;
		/* 取消边框 */
		color: #be7b95;
	}

	.btn-cancel {
		font-size: 24rpx;
		position: relative;
		border: none;
		/* 取消边框 */
		left: 120rpx;
	}

	.btn-create {
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/create.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 55px;
		height: 55px;
		position: fixed;
		border: none;
		border-radius: 50%;
		top: 80%;
		left: 80%;
	}

	.btn-debug {
		display: none;
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/delete.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 55px;
		height: 55px;
		position: fixed;
		border: none;
		border-radius: 50%;
		top: 80%;
		right: 80%;
	}

	.job-tools {
		display: none;
		background-color: #ffffff;
		border: 1px solid #b8b8b8;
		border-radius: 6px;
		position: fixed;
		top: 87%;
		left: 1.4%;
		width: 95%;
		height: 40px;
	}

	.del {
		display: flex;
		align-items: center;
		// background-color: #913bf3;
		width: 20%;
		height: 25px;
		position: relative;
		margin: auto;
	}

	.del-icon {
		padding-left: 5px;
		width: 25px;
		height: 25px;
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/delete.png');
		background-size: contain;
		background-repeat: no-repeat;
	}

	.finish {
		display: flex;
		align-items: center;
		width: 20%;
		height: 25px;
		// background-color: #ccf392;
		position: relative;
		margin: auto;
	}

	.finish-icon {
		padding-left: 5px;
		width: 25px;
		height: 25px;
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/finished.png');
		background-size: contain;
		background-repeat: no-repeat;
	}

	.tab-container {
		position: relative;
		top: 20rpx;
		width: 100%;
		height: 100%;
		// background-color: #55ff17;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* margin-top: 10px; */
	}

	.tab-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 96%;
		height: 1.3%;
		border-radius: 10px;
		background-color: #f4c8d0;
		margin-bottom: 10px;
	}

	.tab-button {
		color: #8d4057;
		font-size: 24rpx;
		/* font-weight: bolder; */
		flex: 1;
		border-radius: 10px;
		/* padding: 10px 20px; */
		border: none;
		outline: none;
		background-color: transparent;
		/* cursor: pointer; */
	}

	.tab-button.active {
		background-color: #FCEDFA;
		color: #8d4057;
		border: none;
		outline: none;
		border-radius: 10px;
	}

	.tab-content {
		width: 100%;
		/* background-color: #0d1fb9; */
		/* display: flex; */
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}

	.job-list {
		background-color: #f2f2f3;
		/* border: 2px solid #cf6011; */
		display: flex;
		border-radius: 6%;
		border-radius: 10px / 20px;
		margin-top: 5px;
		margin-bottom: 5px;
		position: relative;
		width: 95%;
		height: 100px;
		// text-align: center;
		font-size: 30px;
		/* 星期几标识 */
		/* color: #18b557; */
	}

	.selected {
		border: 2px solid #b5441f;
		/* 自定义边框样式 */
	}

	.uncheck-icon {
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/uncheck-1.png');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		right: 30px;
		top: 40px;
		width: 24px;
		height: 25px;
	}

	.check-icon {
		background-image: url('https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/uncheck.png');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		right: 30px;
		top: 40px;
		width: 24px;
		height: 25px;
	}

	.color-tip {
		background-color: #6487FF;
		width: 163rpx;
		height: 100%;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		position: relative;
		top: 0rpx;
		left: 0rpx;
	}

	.job-mark {
		// background-color: #ca5cf5;
		color: #1a1a1a;
		font-family: 'Courier New', Courier, monospace;
		font-size: 15px;
		position: relative;
		width: 290px;
		height: 40px;
		top: 98rpx;
		right: 113px;
	}

	.job-date {
		/* background-color: #b99926; */
		width: 180px;
		height: 30px;
		display: flex;
		position: relative;
		top: 17px;
		left: 20px;
	}

	/* 
			<view class="job-day"></view>
			<view class="job-ym"></view>
			<view class="job-week"></view>
		 */
	.job-day {
		/* background-color: #b94167; */
		width: 70rpx;
		height: 70rpx;
		font-size: 30px;
		position: relative;
		top: 10rpx;
		left: 12rpx;
	}

	.job-ym {
		/* background-color: #fae543; */
		width: 140rpx;
		height: 60rpx;
		position: relative;
		font-size: 14px;
		top: 10rpx;
		left: 17rpx;
	}

	.job-week {
		/* background-color: #b94b2f; */
		width: 90rpx;
		height: 60rpx;
		font-size: 14px;
		position: relative;
		top: 54rpx;
		right: 110rpx;
	}

	.job-time {
		display: flex;
		// background-color: #50f563;
		position: relative;
		color: #1a1a1a;
		width: 540px;
		height: 50px;
		top: 19px;
		padding-left: 0px;
		font-size: 16px;
	}

	.tag-icon {
		position: relative;
		top: 3px;
		right: 9px;
		width: 15px;
		height: 15px;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modal-content {
		position: absolute;
		display: flex;
		/* 将 .modal-content 设置为弹性容器 */
		flex-direction: column;
		/* 确保子元素垂直排列 */
		align-items: center;
		/* 子元素在主轴上居中 */
		top: 55%;
		width: 260px;
		height: 160px;
		padding: 20px;
		background-color: #fff;
		border-radius: 20px;
	}

	.asking {
		position: relative;
		font-weight: bold;
		top: 20px;
	}

	.for-sure-button {
		display: block;
		justify-content: center;
		margin-top: 50px;
	}

	.delete-button {
		// background-color: red;
		color: #d0a5b1;
		padding: 10px 20px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.cancel-button {
		// background-color: #ddd;
		color: #d0a5b1;
		padding: 10px 20px;
		border-radius: 5px;
	}

	// tab-switch end
</style>