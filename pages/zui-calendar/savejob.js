const now = Date.now || function () {  
    return new Date().getTime();  
};  
const isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};  

var job = 'pxpJob';
var jobList = {};
function updateJobList(title, newJobList) {
  job = title;
  jobList = newJobList;
}

export default {      
	job,
	jobList,
	updateJobList,
    now,  
    isArray  
}