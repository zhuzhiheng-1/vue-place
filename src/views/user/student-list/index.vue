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
      <el-table-column label="班级">
        <template slot-scope="scope">
          {{ scope.row.class }} <!-- 显示班级 -->
        </template>
      </el-table-column>
      <el-table-column label="专业">
        <template slot-scope="scope">
          {{ scope.row.major }} <!-- 显示专业 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentList } from '@/api/person.js'

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
      getStudentList().then(response => {
        this.list = response.data.StudentList
        this.listLoading = false
      })
    }
  }
}
</script>
