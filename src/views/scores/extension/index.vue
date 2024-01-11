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
          {{ scope.row.id }} <!-- 显示第几次做题的ID -->
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }} <!-- 显示用户名 -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="submit_time" label="提交时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.submit_time }}</span> <!-- 显示提交时间 -->
        </template>
      </el-table-column>
      <el-table-column label="理论实验得分" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.score }} <!-- 显示得分情况 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getExtensionScore } from '@/api/score'

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
      getExtensionScore().then(response => {
        this.list = response.data.ExtensionScore
        this.listLoading = false
      })
    }
  }
}
</script>
