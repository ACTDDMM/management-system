// 封装接口
import service from "../../service";

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
    method:"GET",
    url:"students",
    params
  })
 }
//  删除当前学生信息
export function studentDel(id) { 
  return service({
    method:"DELETE",
    url:`/students/${id}`
  })
 }

// 学生列表 查询 重置 --- 复用


