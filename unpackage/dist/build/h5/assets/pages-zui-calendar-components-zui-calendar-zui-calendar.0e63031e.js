import{n as e,o as t,c as s,w as o,i,a,b as l,d as n,t as c,e as d,r as h,F as r,f as y,g as u,h as m,j as b,k as f,l as g,v as T}from"./index-3a470f0b.js";import{_ as k}from"./_plugin-vue_export-helper.1b428a4d.js";const p=Date.now||function(){return(new Date).getTime()},L=Array.isArray||function(e){return e instanceof Array};var w={"2023/8/1":[{color:"#FF9903",day:1,eTimeHour:"22",eTimeMin:"20",finished:!1,mark:"骑行海岛",month:8,sTimeHour:"20",sTimeMin:"20",uuid:1691295687,weekday:"星期二",year:2023},{color:"#6488FF",day:1,eTimeHour:"20",eTimeMin:"10",finished:!0,mark:"睡觉",month:8,sTimeHour:"6",sTimeMin:"10",uuid:1691246127,weekday:"星期二",year:2023}],"2023/8/5":[{color:"#79BB31",day:5,eTimeHour:"13",eTimeMin:"30",finished:!0,mark:"洗车",month:8,sTimeHour:"12",sTimeMin:"0",uuid:1693348687,weekday:"星期六",year:2023}],"2023/8/6":[{color:"#38B576",day:6,eTimeHour:"23",eTimeMin:"59",finished:!1,mark:"写代码!",month:8,sTimeHour:"0",sTimeMin:"5",uuid:1691244487,weekday:"星期日",year:2023},{color:"#6488FF",day:6,eTimeHour:"10",eTimeMin:"29",finished:!0,mark:"看电影",month:8,sTimeHour:"12",sTimeMin:"45",uuid:1693444587,weekday:"星期日",year:2023}],"2023/8/8":[{color:"#79BB31",day:8,eTimeHour:"23",eTimeMin:"59",finished:!1,mark:"写代码!",month:8,sTimeHour:"0",sTimeMin:"5",uuid:8961294487,weekday:"星期二",year:2023},{color:"#DD5C5C",day:8,eTimeHour:"11",eTimeMin:"29",finished:!0,mark:"烤鸡翅",month:8,sTimeHour:"10",sTimeMin:"15",uuid:2261294487,weekday:"星期二",year:2023},{color:"#5FBFFF",day:8,eTimeHour:"13",eTimeMin:"20",finished:!1,mark:"跑步",month:8,sTimeHour:"12",sTimeMin:"5",uuid:1662394487,weekday:"星期二",year:2023}]};const D={jobList:w,updateJobList:function(e){w=e},removeJobElementByKeyAndUuid:function(e,t){if(w.hasOwnProperty(e)){console.log("removeJobElementByKeyAndUuid 找到了 selectKey",e);const s=w[e];for(let e=s.length-1;e>=0;e--)s[e].uuid===t&&(console.log("removeJobElementByKeyAndUuid 找到了 uuid",t),s.splice(e,1))}},updateStatusJobElementByKeyAndUuid:function(e,t,s){if(w.hasOwnProperty(e)){console.log("updateStatusJobElementByKeyAndUuid 找到了 selectKey",e);const o=w[e];for(let e=o.length-1;e>=0;e--)o[e].uuid===t&&(console.log("updateStatusJobElementByKeyAndUuid 找到了 uuid, 状态更新",t,s,o[e]),o[e].finished=s)}},now:p,isArray:L};const J=k({name:"pxpDate",props:{tasklist:{type:Array,default:()=>[]},weekList:{type:Array,default:()=>["MON","TUE","WED","THU","FRI","SAT","SUN"]},date:{type:Object,default:()=>({year:(new Date).getFullYear(),month:parseInt((new Date).getMonth()+1),day:parseInt((new Date).getDate())})},extraData:{type:Array,default:()=>[{date:"2023-8-1",status:!0,dot:!0,color:"FF9903",active:!0},{date:"2023-8-5",status:!1,dot:!0,color:"6488FF",active:!0},{date:"2023-8-6",status:!1,dot:!0,color:"38B576",active:!0},{date:"2023-8-8",status:!1,dot:!0,color:"79BB31",active:!0}]},show:{type:Boolean,default:!1},title:{type:String,default:""},isShrink:{type:Boolean,default:!0},isUnfold:{type:Boolean,default:!1}},data:()=>({selectedJobIndexes:[],selectedJobUUid:[],todoList:{},showDialog:!1,receivedData:null,dayList:[],year:2023,month:8,day:1,Ayear:2023,Amonth:8,Aday:1,AWeek:1,Tyear:2023,Tmonth:8,Tday:1,TWeek:"日",isOpen:!1,activeTab:1,localjobList:{},selectKey:""}),components:{},onLoad:function(e){console.log("Pxp --------- onLoad from js---------",D.jobList);const t=e.newDay;this.todoList=D.jobList,console.log("新事项: ",t,"--------list, saveJob.jobList========",D.jobList),this.todoList.hasOwnProperty(t)||(console.log("------- todoList创建一个新的数组 ########"),this.todoList[t]=[]);const s={sTimeHour:e.shour||"00",eTimeHour:e.ehour||"00",sTimeMin:e.smin||"00",eTimeMin:e.emin||"00",mark:e.remark||"",color:e.color||"2B89B8",seDay:e.newDay,finished:!1,uuid:Math.floor(Date.now()/1e3)};if(this.updateTodoWithDate(s,t),s.seDay){console.log("Pxp============ option.selectDay 不为空: ",s.seDay);const e=s.seDay.split("/"),i=parseInt(e[0]),a=parseInt(e[1]),l=parseInt(e[2]);this.todoList[t].push(s),D.updateJobList(this.todoList);var o=i+"-"+a+"-"+l;this.updateDot(o,s.color),this.day=l,console.log("光标聚焦 debug========",this.extraData,a,l,o,l),this.clickActive(i,a,l,o,l),this.switchTab(2)}else console.log("Pxp============ option.selectDay 为空"),this.clickActive(this.Ayear,this.Amonth,this.Aday,this.Ayear+"-"+this.Amonth+"-"+this.Aday,this.Aday),this.switchTab(1)},created(){this.isOpen=this.isUnfold;const{year:e,month:t,day:s}=this.date;this.year=e,this.month=t,this.day=s,this.initTime(),this.initApi(this.year,this.month)},methods:{updateDot(e,t){console.log("updateDot ============",e,t);const s=this.extraData.find((t=>t.date===e));if(s)s.status=!0,s.color=t;else{const s={date:e,dot:!0,color:t,status:!0,active:!1};this.extraData.push(s)}this.dayList=this.getTime(this.Tyear,this.Tmonth),console.log("extraData ---------------- dayList",this.extraData,this.dayList)},showModal(){this.showDialog=!0},hideModal(){this.showDialog=!1},updateTodoWithDate(e,t){const s=new Date(t);e.year=s.getFullYear(),e.month=s.getMonth()+1,e.day=s.getDate(),e.weekday=s.toLocaleDateString("zh-CN",{weekday:"long"})},forSure(){this.showDialog=!0},deleteJob(){console.log("执行删除标签的操作"),this.hideModal(),Array.isArray(this.selectedJobIndexes)&&0!==this.selectedJobIndexes.length&&Array.isArray(this.selectedJobUUid)&&0!==this.selectedJobUUid.length?(console.log("点击了deleteJob, 当前选中: ",this.selectedJobIndexes),console.log("点击了deleteJob, 当前选中uuid: ",this.selectedJobUUid),console.log("遍历删除前 --------- localjobList:",D.jobList),this.selectedJobUUid.forEach((e=>{console.log("遍历删除------",e),D.removeJobElementByKeyAndUuid(this.selectKey,e)})),console.log("遍历删除后 --------- localjobList:",D.jobList),this.selectedJobUUid=[],this.localjobList=D.jobList[this.selectKey].filter((e=>!1===e.finished)),this.switchTab(2),this.changeHideStatus("job-tools","none"),this.changeHideStatus("select-buttons","none")):console.log("nothing select")},finishJob(){Array.isArray(this.selectedJobIndexes)&&0!==this.selectedJobIndexes.length&&Array.isArray(this.selectedJobUUid)&&0!==this.selectedJobUUid.length?(console.log("点击了finishJob, 当前选中: ",this.selectedJobIndexes),console.log("点击了finishJob, 当前选中uuid: ",this.selectedJobUUid),this.selectedJobUUid.forEach((e=>{console.log("遍历更新------",e),D.updateStatusJobElementByKeyAndUuid(this.selectKey,e,!0)})),this.selectedJobUUid=[],this.selectedJobIndexes=[],console.log("遍历更新后 --------- localjobList:",D.jobList),this.localjobList=D.jobList[this.selectKey].filter((e=>!0===e.finished)),this.switchTab(1),this.changeHideStatus("job-tools","none"),this.changeHideStatus("select-buttons","none")):console.log("nothing select")},debug(){this.switchTab(2)},checkJob(e,t){console.log("checkJob ------- item: ",e),this.changeHideStatus("job-tools","flex"),this.changeHideStatus("select-buttons","flex"),e.checked=!0,console.log("点击了checkJob-----------",t);if(this.selectedJobUUid.includes(e.uuid)){const t=this.selectedJobUUid.indexOf(e.uuid);this.selectedJobUUid.splice(t,1)}else this.selectedJobUUid.push(e.uuid);if(this.selectedJobIndexes.includes(t)){const e=this.selectedJobIndexes.indexOf(t);this.selectedJobIndexes.splice(e,1)}else this.selectedJobIndexes.push(t)},updateJob(e,t,s,o){},printTodoList(){console.log(this.todoList);for(const e in this.todoList)if(this.todoList.hasOwnProperty(e)){console.log(`日期：${e}`),console.log("=============");const t=this.todoList[e];0===t.length?console.log("暂无记录"):t.forEach((e=>{console.log(`开始时间：${e.sTimeHour}:${e.sTimeMin}`),console.log(`结束时间：${e.eTimeHour}:${e.eTimeMin}`),console.log(`备注：${e.mark}`),console.log("状态："+(e.finished?"已完成":"未完成")),console.log(`标识：${e.uuid}`),console.log("---------------")})),console.log("")}},deleteTodoItem(e,t){const s=this.todoList[e].findIndex((e=>e.uuid===t));-1!==s&&this.todoList[e].splice(s,1)},updateTodoStatus(e,t,s){const o=this.todoList[e].findIndex((e=>e.uuid===t));-1!==o&&(this.todoList[e][o].finished=s)},initTime(){const{year:e,month:t,day:s}=this.getTimeNowDate();this.year=e,this.month=t,this.day=s;var o=this.getDayOfWeek(this.Tyear,this.Tmonth,this.Tday);this.Tyear=e,this.Tmonth=t,this.Tday=s,this.TWeek=o,this.Ayear=e,this.Amonth=t,this.Aday=s,this.AWeek=o,console.log("### initTime 今日时间为："+this.Tyear+"-"+this.Tmonth+"-"+this.Tday,"周",this.TWeek)},toShrink(){let e=null;const t=this.getTime(this.year,this.month);t.map(((t,s)=>{if(this.day==t.day)return console.log("toShrink 聚焦天=======index/day",s,t.day),this.TWeek=this.getDayOfWeek(this.year,this.month,t.day),e=Math.floor(s/7),Math.floor(s/7)})),console.log("toShrink======== flag:",e),this.dayList=t.slice(7*e,7*(e+1)),this.isOpen=!0,this.changeDayItemColor("#ac7984","normal")},changeDayItemColor(e,t){console.log("changeDayItemColor ---------");const s=document.querySelectorAll(".day-content .day-item");for(let o=0;o<s.length;o++)s[o].style.color=e,s[o].style.fontWeight=t},toStretch(){console.log("收缩Stretch"),this.dayList=this.getTime(this.year,this.month),this.isOpen=!1,this.changeDayItemColor("#110c0d","bold")},getTimeNowDate(){var e=new Date,t=e.getFullYear(),s=parseInt(e.getMonth()+1),o=e.getDate();s<10&&(s="0"+s),o<10&&(o="0"+o);return{year:t,month:parseInt(s),day:parseInt(o)}},initApi(e,t){this.isShrink&&this.isOpen?this.toShrink():this.dayList=this.getTime(e,t)},getTime(e,t){return this.createDayList(e,t)},createDayList(e,t){console.log("Pxp createDayList###################, year/month",e,t);let s=!1;e===this.Ayear&&t===this.Amonth&&(s=!0);const o=this.getDayNum(e,t),i=new Date(e+"/"+t+"/1").getDay();console.log("createDayList: week======",i);let a=[];for(let l=1;l<=o;l++){let e={};for(let s of this.extraData){let t=s.date,o=-1!==t.indexOf("-")?t.split("-"):-1!==t.indexOf("/")?t.split("/"):[];3===o.length&&Number(o[0])===Number(this.year)&&Number(o[1])===Number(this.month)&&Number(o[2])===Number(l)&&(e=s)}let t={day:l,today:!1,data:e};if(t.data&&t.data.date){let s=e.date.replace(/-/g,"/"),o=D.jobList[s].map((e=>e.color)).reduce(((e,t)=>e>t?e:t));t.data.color=o}s&&l===this.Aday&&(t.today=!0),console.log("createDayList ===============",t),a.push(t)}for(let l=0;l<i-1;l++)a.unshift({day:null,data:{}});return console.log("createDayList: ======",a),a},getDayNum(e,t){let s=[31,29,31,30,31,30,31,31,30,31,30,31];return(e%4!=0&&e%100==0||e%400!=0)&&(s[1]=28),s[t-1]},getDayOfWeek:(e,t,s)=>["日","一","二","三","四","五","六"][new Date(e,t-1,s).getDay()],clickActive(e,t,s,o){const i=this.getDayOfWeek(e,t,s);console.log("clickActive ====== 点击的 year/month/date/周",e,t,s,i),this.Tyear=e,this.Tmonth=t,this.Tday=s,this.TWeek=i,this.switchTab(1)},selectAll(e){console.log("点击了全选"),this.changeHideStatus("job-tools","flex"),this.changeHideStatus("select-buttons","flex"),document.querySelector(".select-buttons").style.display="flex",this.selectedJobIndexes=this.localjobList.map(((e,t)=>t)),this.selectedJobUUid=this.localjobList.map((e=>e.uuid))},getDayJob(e,t,s,o){this.activeTab=o?1:2,this.selectKey=e+"/"+t+"/"+s,D.jobList.hasOwnProperty(this.selectKey)?(console.log("pxp================查找key",this.selectKey,",status ",o),console.log("pxp============当前所有状态:",D.jobList),this.localjobList=D.jobList[this.selectKey].filter((e=>e.finished===o)),console.log("getDayJob, found: ",this.selectKey,"with value: ",this.localjobList,"finished status: ",o)):(console.log("getDayJob, not found: ",this.selectKey),this.localjobList=[])},switchTab(e){this.activeTab=e,1===e?this.getDayJob(this.Tyear,this.Tmonth,this.Tday,!0):this.getDayJob(this.Tyear,this.Tmonth,this.Tday,!1),console.log("switchTab, index: ",e)},changeHideStatus(e,t){for(var s=document.querySelectorAll("."+e),o=0;o<s.length;o++)s[o].style.display=t},unselectAll(){console.log("click unselect"),this.selectedJobIndexes=[],this.selectedJobUUid=[],this.changeHideStatus("job-tools","none"),this.changeHideStatus("select-buttons","none");for(let e of this.localjobList)e.checked=!1},clickCancelSelect(){console.log("click unselect"),this.selectedJobIndexes=[],this.selectedJobUUid=[],this.changeHideStatus("job-tools","none"),this.changeHideStatus("select-buttons","none");for(let e of this.localjobList)e.checked=!1},createItem(){console.log("Todo pass newItem, 目标天:",this.Tyear,this.Tmonth,this.Tday,"周",this.TWeek),this.Tyear,e({url:"/pages/zui-calendar/components/zui-calendar/newItem/newItem?Tyear="+this.Tyear+"&Tmonth="+this.Tmonth+"&Tday="+this.Tday+"&Tweek="+this.TWeek})},clickTask(e,t){console.log("clickTask ======= row/index",e,t),console.log("--------- clickTask job from js---------",D.job),this.printTodoList()},toActive(e,t){this.clickCancelSelect(),this.day=e.day,this.clickActive(this.year,this.month,e.day,this.year+"-"+this.month+"-"+this.day,t)},toTask(e,t){console.log("toTask"),this.clickTask(e,t)},LastMonth(){this.month>1?(this.month=this.month-1,this.initApi(this.year,this.month)):(this.LastYear(!1),this.month=12,this.initApi(this.year,this.month)),this.$emit("last-month",{year:this.year,month:this.month})},NextMonth(){this.month<12?this.month=this.month+1:(this.NextYear(!1),this.month=1),this.initApi(this.year,this.month),this.$emit("next-month",{year:this.year,month:this.month})},LastYear(e=!0){this.year>2e3&&(this.year=this.year-1,e&&this.initApi(this.year,this.month),this.$emit("last-year",{year:this.year,month:this.month,day:this.day}))},NextYear(e=!0){this.year=this.year+1,this.initApi(this.year,this.month),this.$emit("next-year",{year:this.year,month:this.month,day:this.day})},confirm(){this.$emit("confirm")},cancel(){this.$emit("cancel")},close(){this.$emit("close")}}},[["render",function(e,k,p,L,w,D){const J=i,x=m,A=b,_=f;return t(),s(J,null,{default:o((()=>[a(J,{class:"top-loc"}),a(J,{class:"date-box"},{default:o((()=>[a(J,{class:"top-tools",style:l({display:w.isOpen?"block":"none"})},{default:o((()=>[a(x,{class:"brief-title-day"},{default:o((()=>[n(c("number"!=typeof w.day||isNaN(w.day)?w.day:w.day<10?"0"+w.day:w.day),1)])),_:1}),a(J,{style:{width:"70px"}},{default:o((()=>[a(x,{class:"brief-title"},{default:o((()=>[n(c(w.year)+" "+c(w.month<10?"0"+w.month:w.month)+" 星期"+c(w.TWeek),1)])),_:1})])),_:1}),a(J,{class:"down-tip"}),a(J,{class:"select-all",onClick:D.selectAll},null,8,["onClick"])])),_:1},8,["style"]),a(J,{class:"box-list",style:l({"margin-bottom":p.tasklist.length>0?"20rpx":"0"})},{default:o((()=>[a(J,{class:"date-top",style:l({display:w.isOpen?"none":"block"})},{default:o((()=>[a(J,{class:"conter-text"},{default:o((()=>[a(J,{class:"left-icon",onClick:D.LastMonth},{default:o((()=>[a(J,{class:""})])),_:1},8,["onClick"]),a(x,{class:"day-title"},{default:o((()=>[n(c(w.year)+"年"+c(w.month)+"月"+c(w.day)+"日",1)])),_:1}),a(J,{class:"right-icon",onClick:D.NextMonth},{default:o((()=>[a(J,{class:""})])),_:1},8,["onClick"])])),_:1})])),_:1},8,["style"]),a(J,{style:l({display:w.isOpen?"block":"none"})},{default:o((()=>[a(J,{class:"week-container"},{default:o((()=>[(t(!0),d(r,null,h(p.weekList,(e=>(t(),s(J,{key:e,class:"week-item-h"})))),128))])),_:1})])),_:1},8,["style"]),a(J,{class:"date-week"},{default:o((()=>[(t(!0),d(r,null,h(p.weekList,(e=>(t(),s(J,{class:"week-item",key:e},{default:o((()=>[a(x,null,{default:o((()=>[n(c(e),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),w.dayList.length>0?(t(),s(J,{key:0,class:"day-content",style:l({height:w.isOpen?"80rpx":"auto"})},{default:o((()=>[(t(!0),d(r,null,h(w.dayList,((e,i)=>(t(),s(J,{class:"day-item",key:i,"data-index":i,onClick:t=>D.toActive(e,i)},{default:o((()=>[e.day?(t(),s(x,{key:0,class:u(["day-text",{cTodayActive:e.day===w.day&&e.today,actives:e.day===w.day,cToday:e.today}])},{default:o((()=>[n(c(e.today?"今":e.day<10?"0"+e.day:e.day),1)])),_:2},1032,["class"])):y("",!0),e.data.dot?(t(),s(x,{key:1,class:"day-dot",style:l({backgroundColor:e.data.color})},null,8,["style"])):y("",!0)])),_:2},1032,["data-index","onClick"])))),128))])),_:1},8,["style"])):y("",!0),p.isShrink?(t(),s(J,{key:1,style:{width:"100%"}},{default:o((()=>[w.isOpen?(t(),s(J,{key:0,class:"toggle",onClick:D.toStretch},{default:o((()=>[a(A,{src:"https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/down.png",class:"icon-down"})])),_:1},8,["onClick"])):(t(),s(J,{key:1,class:"toggle",onClick:D.toShrink},{default:o((()=>[a(A,{src:"https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/up.png",class:"icon-up"})])),_:1},8,["onClick"]))])),_:1})):y("",!0)])),_:1},8,["style"])])),_:1}),a(J,{class:"tab-container"},{default:o((()=>[a(J,{class:"select-buttons"},{default:o((()=>[a(_,{class:"btn-unselect",onClick:k[0]||(k[0]=e=>D.unselectAll())},{default:o((()=>[n("全不选")])),_:1}),a(_,{class:"btn-cancel",onClick:k[1]||(k[1]=e=>D.clickCancelSelect())},{default:o((()=>[n("取消")])),_:1})])),_:1}),a(J,{class:"tab-buttons"},{default:o((()=>[a(_,{class:u({"tab-button":!0,active:1===w.activeTab}),onClick:k[2]||(k[2]=e=>D.switchTab(1))},{default:o((()=>[n("已完成")])),_:1},8,["class"]),a(_,{class:u({"tab-button":!0,active:2===w.activeTab}),onClick:k[3]||(k[3]=e=>D.switchTab(2))},{default:o((()=>[n("未完成")])),_:1},8,["class"])])),_:1}),a(J,{class:"tab-content"},{default:o((()=>[(t(!0),d(r,null,h(w.localjobList,((e,i)=>g((t(),s(J,{class:u(["job-list",{selected:w.selectedJobIndexes.includes(i)}]),key:e,onClick:t=>D.checkJob(e,i)},{default:o((()=>[a(J,{class:"color-tip",style:l({"background-color":e.color})},null,8,["style"]),a(J,{class:"job-date"},{default:o((()=>[a(J,{class:"job-day"},{default:o((()=>[n(c(e.day<10?"0"+e.day:e.day),1)])),_:2},1024),a(J,{class:"job-ym"},{default:o((()=>[n(c(e.year)+" "+c(e.month<10?"0"+e.month:e.month),1)])),_:2},1024),a(J,{class:"job-week"},{default:o((()=>[n(c(e.weekday),1)])),_:2},1024)])),_:2},1024),a(J,{class:"job-time"},{default:o((()=>[a(A,{class:"tag-icon",src:"https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/tag.png"}),n(" "+c(e.sTimeHour<10?"0"+e.sTimeHour:e.sTimeHour)+":"+c(e.sTimeMin<10?"0"+e.sTimeMin:e.sTimeMin)+" - "+c(e.eTimeHour<10?"0"+e.eTimeHour:e.eTimeHour)+":"+c(e.eTimeMin<10?"0"+e.eTimeMin:e.eTimeMin),1)])),_:2},1024),a(J,{class:"job-mark"},{default:o((()=>[n(c(e.mark),1)])),_:2},1024),a(J,{class:"check-icon"})])),_:2},1032,["class","onClick"])),[[T,1===w.activeTab]]))),128)),(t(!0),d(r,null,h(w.localjobList,((e,i)=>g((t(),s(J,{class:u(["job-list",{selected:w.selectedJobIndexes.includes(i)}]),key:e,onClick:t=>D.checkJob(e,i)},{default:o((()=>[a(J,{class:"color-tip",style:l({"background-color":e.color})},null,8,["style"]),a(J,{class:"job-date"},{default:o((()=>[a(J,{class:"job-day"},{default:o((()=>[n(c(e.day<10?"0"+e.day:e.day),1)])),_:2},1024),a(J,{class:"job-ym"},{default:o((()=>[n(c(e.year)+" "+c(e.month<10?"0"+e.month:e.month),1)])),_:2},1024),a(J,{class:"job-week"},{default:o((()=>[n(c(e.weekday),1)])),_:2},1024)])),_:2},1024),a(J,{class:"job-time"},{default:o((()=>[a(A,{class:"tag-icon",src:"https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/todo-img/tag.png"}),n(" "+c(e.sTimeHour<10?"0"+e.sTimeHour:e.sTimeHour)+":"+c(e.sTimeMin<10?"0"+e.sTimeMin:e.sTimeMin)+" - "+c(e.eTimeHour<10?"0"+e.eTimeHour:e.eTimeHour)+":"+c(e.eTimeMin<10?"0"+e.eTimeMin:e.eTimeMin),1)])),_:2},1024),a(J,{class:"job-mark"},{default:o((()=>[n(c(e.mark),1)])),_:2},1024),a(J,{class:"uncheck-icon"})])),_:2},1032,["class","onClick"])),[[T,2===w.activeTab]]))),128))])),_:1}),a(_,{class:"btn-create",onClick:k[4]||(k[4]=e=>D.createItem())}),a(_,{class:"btn-debug",onClick:k[5]||(k[5]=e=>D.debug())})])),_:1}),a(J,{class:"job-tools"},{default:o((()=>[a(J,{class:"del",onClick:k[6]||(k[6]=e=>D.forSure())},{default:o((()=>[a(A,{class:"del-icon"}),a(x,null,{default:o((()=>[n("删除")])),_:1})])),_:1}),a(J,{class:"finish",onClick:k[7]||(k[7]=e=>D.finishJob())},{default:o((()=>[a(A,{class:"finish-icon"}),a(x,null,{default:o((()=>[n("完成")])),_:1})])),_:1})])),_:1}),a(J,null,{default:o((()=>[w.showDialog?(t(),s(J,{key:0,class:"modal-background"},{default:o((()=>[a(J,{class:"modal-content"},{default:o((()=>[a(x,{class:"asking"},{default:o((()=>[n("确定要删除此标签吗？")])),_:1}),a(J,{class:"for-sure-button"},{default:o((()=>[a(J,{class:"delete-button",onClick:D.deleteJob},{default:o((()=>[n("删除")])),_:1},8,["onClick"]),a(J,{class:"cancel-button",onClick:D.hideModal},{default:o((()=>[n("取消")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})):y("",!0)])),_:1})])),_:1})}],["__scopeId","data-v-593b8833"]]);export{J as default};
