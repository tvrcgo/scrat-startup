/**
 * performance
 */

'use strict';

var pageOpenTimeStamp = 0,
  firstScreen = 0,
  performance = window.performance;


function onPerformance() {
  var timing = performance && performance.timing,
    navigation = performance && performance.navigation,
  // 重定向次数
    redirectCount = navigation && navigation.redirectCount;

  if (!timing || timing.requestStart === 0 || timing.responseStart === 0) {
    return;
  }

  // 跳转耗时
  var redirect = timing.redirectEnd - timing.redirectStart;

  // APP CACHE 耗时, 或 fetchTime 没什么价值，也没有优化的可能性存在
 var appcache = Math.max(timing.domainLookupStart - timing.fetchStart, 0);

  // DNS 解析耗时
  var dns = timing.domainLookupEnd - timing.domainLookupStart;

  // TCP 链接耗时
  var conn = timing.connectEnd - timing.connectStart;

  // 等待服务器响应耗时，存在 cache 时，UC 浏览器获取的 requestStart / responseStart 为小于 13 位的数
  var request = timing.responseStart - timing.requestStart;
  // 过滤结果大于 8 位数或小于 0 的值
  request = request > 10000000 || request < 0 ? 0 : request;
  // 内容加载耗时，存在 cache 时，UC 浏览器获取的 responseStart 为小于 13 位的数
  var response = timing.responseEnd - timing.responseStart;
  response = response > 10000000 || response < 0 ? 0 : response;
  // 总体网络交互耗时，即开始跳转到服务器资源下载完成
  var network = timing.responseEnd - timing.navigationStart;

  // 渲染处理
  var processing = (timing.domComplete || timing.domLoading) - timing.domLoading;

  // 抛出 load 事件
  var load = timing.loadEventEnd - timing.loadEventStart;

  // 总耗时
  var total = (timing.loadEventEnd || timing.loadEventStart || timing.domComplete || timing.domLoading) - timing.navigationStart;

  // 可交互
  var active = timing.domInteractive - timing.navigationStart;

  // 请求响应耗时，即 T0，存在 cache 时，UC 浏览器获取的 requestStart / responseStart 为小于 13 位的数
  var t0 = timing.responseStart - timing.navigationStart;
  t0 = t0 < 0 ? 0 : t0;
  // 首次出现内容，即 T1
  var t1 = timing.domLoading - timing.navigationStart;

  // 内容加载完毕，即 T3
  var t3 = timing.loadEventEnd - timing.navigationStart;

  var domStart = 0;

  if (pageOpenTimeStamp > 0) {
    domStart = pageOpenTimeStamp - timing.navigationStart;
  }

  return {
    redirect: redirect,
    appcache: appcache,
    dns: dns,
    conn: conn,
    request: request,
    response: response,
    processing: processing,
    network: network,
    load: load,
    total: total,
    active: active,
    redirectCount: redirectCount,
    domStart: domStart,
    firstScreen: firstScreen,
    t0: t0,
    t1: t1,
    t2: firstScreen,
    t3: t3 < 0 ? 0 : t3
  }
}


module.exports = {
  init: function(st){
    if(!performance || !performance.now || typeof performance.now !== 'function'){
      return ;
    }
    var that = this;
    pageOpenTimeStamp = st || 0;
    window.addEventListener('load',function(){
      that.load = true;
    }, false);
  },
  get: function(callback){
    if(!performance || !performance.now || typeof performance.now !== 'function'){
      return ;
    }

    var that = this;

    firstScreen = performance.now()
    
    //延迟等待onload触发，避免获取到的参数为负数
    var timer = setInterval(function(){
      if(that.load){
        clearInterval(timer);
        var pfmData = onPerformance();
        callback(pfmData)
      }
    }, 500);
  }
};