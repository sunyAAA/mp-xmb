var Fly = require("flyio/dist/npm/wx")
var qs = require('qs');           // 针对java后台进行序列化
var fly = new Fly(); 
import config from '../config'
// import {msg} from '../utils'
fly.config.baseURL=config.host
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
      //打印出请求体
    //   console.log(request)
      let t = wx.getStorageSync('_token');
      if(t){request.body =request.body ? request.body+"&_token="+t :"_token="+t};
      //终止请求    
      //var err=new Error("xxx")
      //err.request=request
      //return Promise.reject(new Error(""))
    return request;
})
export function loginByCode(userInfo) {     
    return fly.post('/api/userTarget/getWeChatToken',qs.stringify(userInfo))
}

export function getHetarget(pageSize,pageNum,status){
    status = !status?2:status
    return fly.get('/api/userTarget/getHeTarget',qs.stringify({status,pageNum,pageSize}))
}

export function getMytarget(pageSize,pageNum,status){
    status = !status?2:status
    return fly.get('/api/userTarget/getMyTarget',qs.stringify({status,pageNum,pageSize}))
}

export  function sendNewTarget(params){
     return fly.post('/api/userTarget/addTarget',qs.stringify(params))
}

export function getTargetDetail(tid){
    return fly.get('/api/userTarget/getTargetById?targetId='+tid)
}

export function getDaelyByTid(tid,pageSize,pageNum){
    return fly.get('/api/userTargetLog/getMyTargetLog',qs.stringify({targetId:tid,pageNum,pageSize}))
}

export function addNewDaely(params){
    return fly.post('/api/userTargetLog/addTargetLog',qs.stringify(params))
}

export function removeLogById(id){
    return fly.post('/api/userTargetLog/delTargetLog?logId='+id)
}

export function joinTarget(tid){
    return fly.post('/api/userTarget/inTarget?targetId='+tid)
}

export function overTarget(tid){
    return fly.post('/api/userTarget/completeTarget?targetId='+tid)
}

export function saveTargetStatus(params){
    return fly.post('/api/userTarget/completeTarget',qs.stringify(params))
}

export function voteTarget(params){
    return fly.post('/api/userTarget/voteTarget',qs.stringify(params))
}

export function getMyWatch(status,pageSize,pageNum){
    return fly.get('/api/userTarget/getHeTarget',qs.stringify({status,pageSize,pageNum}))
}