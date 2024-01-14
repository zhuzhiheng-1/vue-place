<template>
  <div class="animation">
    <div class="table-wrapper">
      <table class="stack">
        <tr v-for="(row, rowIndex) in frames[currentFrame].stack" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </table>
      <caption>栈区</caption>
    </div>
    <div class="table-wrapper">
      <table class="heap">
        <tr v-for="(row, rowIndex) in frames[currentFrame].heap" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </table>
      <caption>堆区</caption>
    </div>
    <div class="table-wrapper">
      <table class="object">
        <tr v-for="(row, rowIndex) in frames[currentFrame].object" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </table>
      <caption>对象区</caption>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentFrame: 0
    }
  },
  computed: {
    ...mapGetters([
      'frames'
    ])
  },
  methods: {
    prevFrame() {
      if (this.currentFrame > 0) {
        this.currentFrame--
      }
    },
    nextFrame() {
      if (this.currentFrame < this.frames.length - 1) {
        this.currentFrame++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 整个动画区
.animation {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
// 每一个栈或堆表格的容器
.table-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: -80px;
}
// 栈的样式
.stack {
  margin-left: 2px;
  background-color: #aaf; /* 栈的背景色 */
}
// 堆的样式
.heap {
  background-color: #afa; /* 堆的背景色 */
}
// 对象的样式
.object {
  margin-right: 2px;
  background-color: #faa; /* 对象的背景色 */
}
// 表格样式
table {
  width: 200px;
  height: 300px;
  border-collapse: collapse;
  border: 1px solid #000;
}
// 表格标题样式
caption {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  background-color: #eee;
  border-collapse: collapse;
  border: 1px solid #000;
}
// 表格的单元格内容样式
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #000;
}
</style>
