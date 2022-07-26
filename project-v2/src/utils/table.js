export function getData(root, url, params) {
  root.service
    .get(url, { params: params || {} })
    .then((res) => {
      if (res.data.status === 200) {
        root.tableData = res.data.data;
        root.total = res.data.total;
      }
    })
    .catch((err) => {
      throw err;
    });
}

// 新增和修改的封装
import qs from "qs";
export function changeInfo(root, method, url, from, callback) {
  let data = qs.stringify(from);
  root.service[method](url, data)
    .then((result) => {
      if (result.data.status === 200) {
        callback(root, url);
        root.dialogFormVisible = false;
        root.$refs["form"].resetFields();
        root.$message({
          type: "success",
          message: result.data.message,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
}

// 删除方法封装
export function delData(root, url, id, callback) {
  root.$alert("确认删除？", "提示", {
    confirmButtonText: "确定",
    callback: (val) => {
      if (val != "cancel") {
        root.service
          .delete(`${url}/${id}`)
          .then((result) => {
            if (result.data.status === 200) {
              callback(root, url);
              root.$message({ message: result.data.message, type: "success" });
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    },
  });
}

// 作业列表 获取数据方法封装
export function getTableData(root, url, params, arr) {
  root.service
    .get(url, { params: params || {} })
    .then((result) => {
      if (result.data.status === 200) {
        root.tableData = result.data.data;
        root.total = result.data.total;
        root.tableData.map((item) => {
          arr.map((aItem) => {
            item[aItem]
              ? (item[aItem + "_text"] = "是")
              : (item[aItem + "_text"] = "否");
          });
        });
        root.loading = false;
      }
    })
    .catch((err) => {
      throw err;
    });
}
