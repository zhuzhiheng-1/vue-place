<template>
  <div>
    <!-- 横向导航 -->
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">实验基础</el-menu-item>
      <el-menu-item index="2">实验原理</el-menu-item>
      <el-menu-item index="3">实验步骤</el-menu-item>
      <el-menu-item index="4">思考问题</el-menu-item>
      <el-button index="5" type="primary" style="margin-top: 10px;" @click="choiceHandle">
        进入实验
      </el-button>
      <!-- 其他导航项 -->
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
