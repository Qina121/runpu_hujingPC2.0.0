<template>
  <div class="Allbox">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      show-header
      border  height="500"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="120"></el-table-column>
      <el-table-column prop="phonenumber" label="手机号" width="160"></el-table-column>
      <el-table-column prop="usernumber" label="身份证号" width="160"></el-table-column>
      <el-table-column prop="guanxi" label="与业主关系" width="160"></el-table-column>
      <el-table-column prop="rfidnumber" label="RFID编码" width="160"></el-table-column>
      <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column>
      <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column>
      <el-table-column prop="usertype" label="注册状态" sortable width="160"></el-table-column>
      <el-table-column prop="address" label="地址"  width="250" :formatter="formatter"></el-table-column>
      <el-table-column prop="Focuson" label="重点关照" width="160"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "AboutUser",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
<style scoped>
.Allbox {
  width: 100%;
  height: 1005;
  padding: 10px;
  box-sizing: border-box;
}
</style>