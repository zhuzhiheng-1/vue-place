<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="学号" width="120">
        <template slot-scope="scope">
          {{ scope.row.id }} <!-- 显示学号 -->
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.username }} <!-- 显示姓名 -->
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.gender }} <!-- 显示性别 -->
        </template>
      </el-table-column>
      <el-table-column label="专业" width="150px">
        <template slot-scope="scope">
          {{ scope.row.major }} <!-- 显示专业 -->
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          {{ scope.row.class }} <!-- 显示班级 -->
        </template>
      </el-table-column>
      <el-table-column label="理论实验成绩">
        <template slot-scope="scope">
          {{ scope.row.theoryScore }} <!-- 显示理论实验成绩 -->
        </template>
      </el-table-column>
      <el-table-column label="基础实验成绩">
        <template slot-scope="scope">
          {{ scope.row.basicScore }} <!-- 显示基础实验成绩 -->
        </template>
      </el-table-column>
      <el-table-column label="拓展实验成绩">
        <template slot-scope="scope">
          {{ scope.row.extensionScore }} <!-- 显示拓展实验成绩 -->
        </template>
      </el-table-column>
      <el-table-column label="总分">
        <template slot-scope="scope">
          {{ scope.row.totalScore }} <!-- 显示总分 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGradesList } from '@/api/grades.js'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGradesList().then(response => {
        this.list = response.data.GradesList
        this.listLoading = false
      })
    }
  }
}
</script>
