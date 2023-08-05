<template>
	<view class="tab-container">
		<!-- 全选与取消 -->
		<view class="select-buttons">
			<button class="btn-unselect" @click="unselect()">全不选</button>
			<button class="btn-cancel" @click="cancel()">取消</button>
		</view>

		<view class="tab-buttons">
			<button :class="{'tab-button': true, 'active': activeTab === 1}" @click="switchTab(1)">已完成</button>
			<button :class="{'tab-button': true, 'active': activeTab === 2}" @click="switchTab(2)">未完成</button>
		</view>

		<view class="tab-content">
			<view v-show="activeTab === 1" class="job-list" v-for="item in localjobList" :key="item">
				<view class="job-date">{{ selectKey }}</view>
				<view class="job-time">{{ item.sTimeHour }}:{{ item.sTimeMin }} -
					{{ item.eTimeHour }}:{{ item.eTimeMin }}
				</view>
				<view class="job-mark">{{ item.mark }}</view>
				<!-- <view class="job-status">{{ item.finished ? '已完成' : '未完成' }}</view> -->
			</view>
			<view v-show="activeTab === 2" class="job-list" v-for="item in localjobList" :key="item">
				<!-- <view class="job-row"> -->
				<view class="color-tip"></view>
				<view class="job-date">
					<view class="job-day">10</view>
					<view class="job-ym">2021 03</view>
					<view class="job-week">星期二</view>
					<!-- {{ selectKey }} -->
				</view>
				<view class="job-time">
					<image class="tag-icon" src='../../../static/icon/tag.png'></image>
					{{ item.sTimeHour }}:{{ item.sTimeMin }} -
					{{ item.eTimeHour }}:{{ item.eTimeMin }}
				</view>
				<view class="job-mark">{{ item.mark }}</view>
				<view class="uncheck-icon"></view>
				<!-- </view> -->
				<!-- <view class="job-status">{{ item.finished ? '已完成' : '未完成' }}</view> -->
			</view>
		</view>
		<button class="btn-create" @click="createItem()"></button>
	</view>
</template>

<script>
	import saveJob from '@/pages/zui-calendar/savejob.js';
	export default {
		onLoad() {
			// 注册自定义事件的监听器
			uni.$on('hideTabButtons', () => {
				// 显示 tab-buttons
				console.log('hideTabButtons ===== 隐藏 tab-buttons/create')

				var selectButtons = document.querySelector('.select-buttons');
				selectButtons.style.display = 'flex';

				var createButton = document.querySelector('.btn-create')
				createButton.style.display = 'none';
			});
		},
		props: {
			Tyear: 2023,
			Tmonth: 8,
			Tday: 1,
			TWeek: "日"
		},
		data() {
			return {
				activeTab: 1,
				localjobList: {},
				selectKey: '',
			};
		},
		methods: {
			getDayJob(y, m, d, status) {
				// 转换样式
				if (status) {
					console.log('activeTab = 1')
					this.activeTab = 1;
				} else {
					console.log('activeTab = 2')
					this.activeTab = 2
				}
				
				
				this.selectKey = y + '/' + m + '/' + d;
				if (saveJob.jobList.hasOwnProperty(this.selectKey)) {
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
					this.getDayJob(this.Tyear,this.Tmonth,this.Tday, true);
				} else {
					this.getDayJob(this.Tyear,this.Tmonth,this.Tday, false);
				}
				console.log('switchTab, index: ', tabIndex)
			},
			resetSelectState() {
				var selectButtons = document.querySelector('.select-buttons')
				selectButtons.style.display = 'none'

				var createButton = document.querySelector('.btn-create')
				createButton.style.display = 'block';
			},
			unselect() {
				console.log('click unselect')
				this.resetSelectState()
			},
			cancel() {
				console.log('click cancel-select')
				this.resetSelectState()
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
			}
		}
	};
</script>

<style scoped>
	.select-buttons {
		display: none;
		/* display: flex; */
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1%;
		/* border-radius: 10px; */
		background-color: #ffffff;
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
		background-image: url('../../../static/icon/create.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 55px;
		height: 55px;
		position: absolute;
		border: none;
		border-radius: 50%;
		top: 80%;
		left: 80%;
	}

	.tab-container {
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
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		position: relative;
		width: 95%;
		height: 200rpx;
		text-align: center;
		font-size: 30rpx;
		/* 星期几标识 */
		/* color: #18b557; */
	}
	.uncheck-icon {
		background-image: url(../../../static/icon/uncheck.png);
		background-repeat: no-repeat;
		background-size: cover;
		width: 90rpx;
		height: 50rpx;
		position: relative;
		top: 74rpx;
		right: 70rpx;
	}
	
	.color-tip {
		background-color: #6487FF;
		width: 68rpx;
		height: 100%;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		position: relative;
		top: 0rpx;
		left: 0rpx;
	}

	.job-date {
		/* background-color: #b99926; */
		width: 300rpx;
		height: 120rpx;
		display: flex;
		position: relative;
		top: 37rpx;
		left: 22rpx;
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
		/* background-color: #50f563; */
		color: #1a1a1a;
		width: 370rpx;
		height: 60rpx;
		font-size: 33px;
		position: relative;
		top: 45rpx;
		left: 30rpx;
		font-size: 16px;
	}

	.tag-icon {
		position: relative;
		top: 7rpx;
		right: 17rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.job-mark {
		/* background-color: #ca5cf5; */
		color: #1a1a1a;
		font-family: 'Courier New', Courier, monospace;
		font-size: 16px;
		position: relative;
		width: 250rpx;
		height: 50rpx;
		top: 98rpx;
		right: 130rpx;
	}	
</style>