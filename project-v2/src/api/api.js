// 封装接口
import service from "../../service";
import qs from "qs";

// 登录
export function login(data) {
  return service({
    method: "POST",
    url: "/login",
    data,
  });
}
// 学生列表查询接口
export function students(params) {
  return service({
    method: "GET",
    url: "students",
    params,
  });
}
//  删除当前学生信息
export function studentDel(id) {
  return service({
    method: "DELETE",
    url: `/students/${id}`,
  });
}

// 学生列表 查询 重置 --- 复用

// 信息列表新增 和 修改 接口

// export function info(data) {
//   data = qs.stringify(data);
//   return service({
//     method: "POST",
//     url: "/info",
//     data,
//   });
// }
// 修该信息接口
export function info(type,data) {
  data = qs.stringify(data);
  let obj ={method:type,url:"/info",data}
  return service(obj);
}

//  信息列表查询接口
export function getInfo() {
  return service({
    method: "GET",
    url: "/info",
  });
}
// 信息列表删除接口
export function infoDel(id) { 
  return service({
    method:"DELETE",
    url:`/info/${id}`
  })
 }

//  数据概览的接口
export function dataview() {
  return service({
    method:"GET",
    url:"/dataview"
  })
  }