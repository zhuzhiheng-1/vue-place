<template>
  <div>
    <!-- 横向导航 -->
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">实验基础</el-menu-item>
      <el-menu-item index="2">实验原理</el-menu-item>
      <el-menu-item index="3">实验步骤</el-menu-item>
      <el-menu-item index="4">思考问题</el-menu-item>
      <el-button type="primary" style="margin-top: 10px;" @click="choiceHandle">
        进入实验
      </el-button>
      <!-- 其他导航项 -->
    </el-menu>
    <div class="content-wrapper">
      <!-- 内容承接处 -->
      <experiment-content
        v-if="selectedExperiment"
        :title="selectedExperiment.title"
        :content="selectedExperiment.content"
      />
    </div>
  </div>
</template>

<script>
import ExperimentContent from '@/components/ExperimentContent'
import { mapGetters } from 'vuex'
export default {
  components: {
    ExperimentContent
  },
  data() {
    return {
      activeIndex: '1',
      selectedExperiment: null
    }
  },
  computed: {
    ...mapGetters([
      'experimentsTheoretical',
      'experimentsBasic',
      'experimentsExtension'
    ]),
    currentGetter() {
      // 根据当前路由动态选择使用哪个 getter
      const path = this.$route.path
      if (path.includes('/experiment/theoretical')) {
        return 'experimentsTheoretical'
      } else if (path.includes('/experiment/basic')) {
        return 'experimentsBasic'
      } else if (path.includes('/experiment/extension')) {
        return 'experimentsExtension'
      }
      // 默认返回一个合适的值
      return 'experimentsTheoretical'
    }
  },
  created() {
  // 默认选择第一个实验基础
    this.selectExperimentByIndex('1')
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
      this.selectExperimentByIndex(index)
    },
    choiceHandle() {
      console.log('choiceHandle')
      // 这里可以添加其他逻辑
    },
    selectExperimentByIndex(index) {
      const experiments = this[this.currentGetter]
      this.selectedExperiment = experiments.find(exp => exp.index === index)
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
}
</style>
