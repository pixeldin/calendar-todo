const now = Date.now || function() {
	return new Date().getTime();
};
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};

var jobList = {
	"2023/8/1": [{
		"color": "#FF9903",
		"day": 1,
		"eTimeHour": "22",
		"eTimeMin": "20",
		"finished": false,
		"mark": "骑行海岛",
		"month": 8,
		"sTimeHour": "20",
		"sTimeMin": "20",
		"uuid": 1691295687,
		"weekday": "星期二",
		"year": 2023
	},
	{
		"color": "#6488FF",
		"day": 1,
		"eTimeHour": "20",
		"eTimeMin": "10",
		"finished": true,
		"mark": "睡觉",
		"month": 8,
		"sTimeHour": "6",
		"sTimeMin": "10",
		"uuid": 1691246127,
		"weekday": "星期二",
		"year": 2023
	}
	],
	"2023/8/5": [{
		"color": "#79BB31",
		"day": 5,
		"eTimeHour": "13",
		"eTimeMin": "30",
		"finished": true,
		"mark": "洗车",
		"month": 8,
		"sTimeHour": "12",
		"sTimeMin": "0",
		"uuid": 1693348687,
		"weekday": "星期六",
		"year": 2023
	}],
	"2023/8/6": [{
		"color": "#38B576",
		"day": 6,
		"eTimeHour": "23",
		"eTimeMin": "59",
		"finished": false,
		"mark": "写代码!",
		"month": 8,
		"sTimeHour": "0",
		"sTimeMin": "5",
		"uuid": 1691244487,
		"weekday": "星期日",
		"year": 2023
	},{
		"color": "#6488FF",
		"day": 6,
		"eTimeHour": "13",
		"eTimeMin": "29",
		"finished": true,
		"mark": "看电影",
		"month": 8,
		"sTimeHour": "11",
		"sTimeMin": "45",
		"uuid": 1693444587,
		"weekday": "星期日",
		"year": 2023
	}],
	"2023/8/8": [{
		"color": "#79BB31",
		"day": 8,
		"eTimeHour": "23",
		"eTimeMin": "59",
		"finished": false,
		"mark": "写代码!",
		"month": 8,
		"sTimeHour": "0",
		"sTimeMin": "5",
		"uuid": 8961294487,
		"weekday": "星期二",
		"year": 2023
	},
	{
		"color": "#DD5C5C",
		"day": 8,
		"eTimeHour": "11",
		"eTimeMin": "29",
		"finished": true,
		"mark": "烤鸡翅",
		"month": 8,
		"sTimeHour": "10",
		"sTimeMin": "15",
		"uuid": 2261294487,
		"weekday": "星期二",
		"year": 2023
	},
	{
		"color": "#5FBFFF",
		"day": 8,
		"eTimeHour": "13",
		"eTimeMin": "20",
		"finished": false,
		"mark": "跑步",
		"month": 8,
		"sTimeHour": "12",
		"sTimeMin": "5",
		"uuid": 1662394487,
		"weekday": "星期二",
		"year": 2023
	}]
};

function updateJobList(newJobList) {
	jobList = newJobList;
}

function removeJobElementByKeyAndUuid(selectKey, uuid) {
	if (jobList.hasOwnProperty(selectKey)) {
		console.log('removeJobElementByKeyAndUuid 找到了 selectKey', selectKey)
		const elements = jobList[selectKey];
		for (let i = elements.length - 1; i >= 0; i--) {
			if (elements[i].uuid === uuid) {
				console.log('removeJobElementByKeyAndUuid 找到了 uuid', uuid)
				elements.splice(i, 1);
			}
		}
	}
}

function updateStatusJobElementByKeyAndUuid(selectKey, uuid, status) {
	if (jobList.hasOwnProperty(selectKey)) {
		console.log('updateStatusJobElementByKeyAndUuid 找到了 selectKey', selectKey)
		const elements = jobList[selectKey];
		for (let i = elements.length - 1; i >= 0; i--) {
			if (elements[i].uuid === uuid) {
				console.log('updateStatusJobElementByKeyAndUuid 找到了 uuid, 状态更新', uuid, status, elements[i])
				elements[i].finished = status; // 将 finished 改为 status，并更新状态
			}
		}
	}
}

export default {
	jobList,
	updateJobList,
	removeJobElementByKeyAndUuid,
	updateStatusJobElementByKeyAndUuid,
	now,
	isArray
}