<template>
	<view class="tab-container">
		<view class="tab-buttons">
			<button :class="{'tab-button': true, 'active': activeTab === 1}" @click="switchTab(1)">已完成</button>
			<button :class="{'tab-button': true, 'active': activeTab === 2}" @click="switchTab(2)">未完成</button>
		</view>

		<view class="tab-content">
			<view v-show="activeTab === 1" class="week-item" v-for="item in ddList" :key="item">
				<text>{{item}}</text>
			</view>
			<view v-show="activeTab === 2">选项卡2的内容</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			ddList: {
				type: Array,
				default: () => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
			}
		},
		data() {
			return {
				activeTab: 1
			};
		},
		methods: {
			switchTab(tabIndex) {
				console.log('switchTab, index: ', tabIndex)
				this.activeTab = tabIndex;
			}
		}
	};
</script>

<style scoped>
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
		width: 94%;
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
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.week-item {
		display: flex/* ;
		justify-content: center;
		align-items: */center;
		/* width: calc(100%/7); */
		height: 52rpx;
		text-align: center;
		font-size: 30rpx;
		/* 星期几标识 */
		color: #18b557;
	}
</style>