<template>
 <div class="Allbox">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      show-header
      border  height="500"
    >

      <el-table-column prop="landlordName" label="姓名"  width="120"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <el-table-column prop="usernumber" label="身份证号" width="160"></el-table-column>
      <el-table-column prop="relationship" label="与业主关系" width="160"></el-table-column>
      <el-table-column prop="rfidnumber" label="RFID编码" width="160"></el-table-column>
      <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column>
      <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column>
      <el-table-column prop="usertype" label="注册状态"  width="160"></el-table-column>
      <el-table-column prop="commonAddress" label="地址"  width="250" :formatter="formatter"></el-table-column>
      <el-table-column prop="Focuson" label="重点关照" width="160"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OtherRecordForm",
  props: {
    msg: String
  },
  data() {
    return {
       tableData: [
        {
          date: "2016-05-02",
          landlordName: "王小虎",
          commonAddress: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是',
          phoneNumber:''
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是'
        },
      ]
    };
  },
  mounted(){
      // 获取后台数据
     
        const that = this
        this.$axios.get(that.api+'hzInfo/selectAllInfo').then(function(res){
        
          that.tableData = res.data.data
          console.log(that.tableData);
        }).catch(function(err){
          console.log(err)
        })
      
  },
  methods: {
    formatter(row, column) {
          return row.address;
        }
  }
};
</script>

<style scoped>
</style>