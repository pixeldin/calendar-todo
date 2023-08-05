const now = Date.now || function() {
	return new Date().getTime();
};
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};

var jobList = {};

function updateJobList(newJobList) {
	jobList = newJobList;
}

export default {
	jobList,
	updateJobList,
	now,
	isArray
}