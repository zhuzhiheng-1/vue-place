<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }} <!-- 显示ID -->
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.username }} <!-- 显示姓名 -->
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          {{ scope.row.class }} <!-- 显示班级 -->
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          {{ scope.row.role }} <!-- 显示权限 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTeacherList } from '@/api/person.js'

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
      getTeacherList().then(response => {
        this.list = response.data.TeacherList
        this.listLoading = false
      })
    }
  }
}
</script>
