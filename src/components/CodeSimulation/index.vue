<template>
  <div class="code-editor my-code-editor">

    <div class="code-animation">
      <codemirror ref="myCodeMirror" v-model="code" class="my-code-mirror" :options="editorOptions" />
      <div class="animation-container">
        <div class="animation-step">
          <p>{{ getCurrentStepInfo() }}</p>
        </div>
        <div class="animation-place">
          <!-- code在内存的动画 -->
        </div>
      </div>
    </div>

    <div class="button-container">
      <el-button type="text" :disabled="currentMarkedIndex === 0" class="step-button" @click="markPrevLine">
        上一步
      </el-button>

      <el-steps :active="currentMarkedIndex" finish-status="success" class="custom-steps">
        <el-step
          v-for="(line, index) in markedLines"
          :key="index"
          :title="getTitle(index)"
          class="custom-step"
          :class="{ 'active-step': index === currentMarkedIndex }"
        />
      </el-steps>

      <el-button
        type="text"
        :disabled="currentMarkedIndex === markedLines.length - 1"
        class="step-button"
        @click="markNextLine"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
// 导入 CodeMirror 组件
import { codemirror } from 'vue-codemirror'

// 导入样式、主题、代码风格等配置或样式文件
import '@/utils/cm-setting'

// 导出组件定义
export default {
  // 注册使用的组件
  components: {
    codemirror
  },
  // 数据对象，返回默认数据
  data() {
    return {
      showStepContainer: false,
      // 初始 C++ 代码，使用 ES6 模板字符串
      code: `#include <iostream>
  #include <string>
  
  using namespace std;
  
  class Person {
  private:
  int privateData; // 新增的私有属性
  public:
  string name;
  int age;
  char gender;
  int* dynamicData; // 新增一个动态分配内存的属性
  
  // 构造函数
  Person(const string& personName, int personAge, char personGender, int data) {
      name = personName;
      age = personAge;
      gender = personGender;
  
      // 在堆区动态分配内存，并将 dynamicData 指向这块内存
      dynamicData = new int;
      *dynamicData = data;
  
      // 初始化私有属性
      privateData = privateValue;
  
      cout << "人物已创建" << endl;
  }
  
  // 析构函数
  ~Person() {
      // 释放动态分配的内存
      delete dynamicData;
      cout << "人物已销毁" << endl;
  }
  
  // 拷贝构造函数 - 浅拷贝
  Person(const Person& otherPerson) {
      name = otherPerson.name;
      age = otherPerson.age;
      gender = otherPerson.gender;
  
      // 浅拷贝 dynamicData，两个对象共享相同的内存
      //编译器默认实现的拷贝构造函数是浅拷贝，即下面这行代码。
      dynamicData = otherPerson.dynamicData;
      //调用析构函数时会有错误，因为dynamicData指向的是同一块内存，所以采用深拷贝来解决这一问题：即如果有属性在堆区开辟的，一定要自己提供拷贝构造函数。防止浅拷贝带来的内存泄漏。        cout << "浅拷贝构造函数" << endl;
  
      // 拷贝私有属性
      privateData = otherPerson.privateData;
      cout << "深拷贝构造函数" << endl;
  }
  
  // 拷贝构造函数 - 深拷贝
  Person(const Person& otherPerson) {
      name = otherPerson.name;
      age = otherPerson.age;
      gender = otherPerson.gender;
  
      // 深拷贝 dynamicData，分配新的内存并复制数据
      dynamicData = new int;
      *dynamicData = *(otherPerson.dynamicData);
  
      cout << "深拷贝构造函数" << endl;
  }
  
  // 公有方法，用于获取私有属性
  int getPrivateData() const {
      return privateData;
  }
  };
  
  int main() {
  // 创建对象，传入动态分配内存的数据
  Person personObject("Alice", 25, 'F', 42 , 100);
  
  // 直接访问对象的属性
  cout << "直接访问对象的属性：" << personObject.name << ", " << personObject.age << ", " << personObject.gender << ", " << *(personObject.dynamicData) << ", " << personObject.getPrivateData() << endl;
  // 创建对象指针
  Person* personPointer = new Person("Bob", 30, 'M', 88 , 200);
  
  // 使用对象指针访问对象的属性
  cout << "通过指针访问对象的属性：" << personPointer->name << ", " << personPointer->age << ", " << personPointer->gender << ", " << *(personPointer->dynamicData) << endl;
  
  // 浅拷贝
  Person personCopy(personObject);
  
  // 深拷贝
  Person personDeepCopy = *personPointer;
  
  // 释放动态分配的内存
  delete personPointer;
  
  return 0;
  }
  `,

      // CodeMirror 的配置项
      editorOptions: {
        mode: 'text/x-c++src',
        lineNumbers: true,
        readOnly: true,
        theme: 'monokai',
        lineWrapping: true, // 自动换行配置
        gutters: ['my-gutter'] // gutter 配置
      },
      // 需要标记的行号数组
      markedLines: [
        { stepInfo: '执行main函数', whichLine: 73 },
        { stepInfo: '创建对象，传入动态分配内存的数据', whichLine: 75 },
        { stepInfo: '执行构造函数', whichLine: 16 },
        { stepInfo: '在堆区动态分配内存，并将 dynamicData 指向这块内存', whichLine: 22 },
        { stepInfo: '直接访问对象的属性', whichLine: 78 },
        { stepInfo: '调用公有方法，用于获取私有属性', whichLine: 68 },
        { stepInfo: '创建对象指针', whichLine: 80 },
        { stepInfo: '执行构造函数', whichLine: 16 },
        { stepInfo: '在堆区动态分配内存，并将 dynamicData 指向这块内存', whichLine: 22 },
        { stepInfo: '使用对象指针访问对象的属性', whichLine: 83 },
        { stepInfo: '浅拷贝', whichLine: 86 },
        { stepInfo: '拷贝构造函数 - 浅拷贝', whichLine: 39 },
        { stepInfo: '深拷贝', whichLine: 89 },
        { stepInfo: '拷贝构造函数 - 深拷贝', whichLine: 55 },
        { stepInfo: '深拷贝 dynamicData,分配新的内存并复制数据', whichLine: 61 },
        { stepInfo: '释放动态分配的内存', whichLine: 92 },
        { stepInfo: 'return 0', whichLine: 94 }
      ],

      // 当前标记的行号索引
      currentMarkedIndex: 0
    }
  },
  // 组件挂载后调用
  mounted() {
    this.$nextTick(() => {
      // 在组件挂载后，调用标记行的方法
      this.markLine(this.markedLines[0].whichLine)
      this.scrollToCurrentLine()
    })
  },
  methods: {
    // 标记指定行
    markLine(whichLine) {
      const cm = this.$refs.myCodeMirror.codemirror
      const line = cm.getLineHandle(whichLine - 1)

      if (line) {
        cm.setGutterMarker(line, 'my-gutter', this.createMarkerElement())
      }
    },
    // 创建标记元素
    createMarkerElement() {
      const marker = document.createElement('div')
      marker.className = 'marked-gutter'
      return marker
    },
    // 标记上一行
    markPrevLine() {
      if (this.currentMarkedIndex > 0) {
        this.removeGutterMarker(this.currentMarkedIndex)
        // eslint-disable-next-line no-plusplus
        this.currentMarkedIndex--
        this.updateGutterMarker()
        this.scrollToCurrentLine()
      }
    },
    // 标记下一行
    markNextLine() {
      if (this.currentMarkedIndex < this.markedLines.length - 1) {
        this.removeGutterMarker(this.currentMarkedIndex)
        // eslint-disable-next-line no-plusplus
        this.currentMarkedIndex++
        this.updateGutterMarker()
        this.scrollToCurrentLine()
      }
    },
    // 移除标记
    removeGutterMarker(lineNumber) {
      const cm = this.$refs.myCodeMirror.codemirror
      const line = cm.getLineHandle(this.markedLines[lineNumber].whichLine - 1)

      if (line) {
        cm.setGutterMarker(line, 'my-gutter', null)
      }
    },
    // 更新标记
    updateGutterMarker() {
      const cm = this.$refs.myCodeMirror.codemirror
      const currentMarkedLine = this.markedLines[this.currentMarkedIndex]

      // 根据完成状态切换 showStepContainer
      this.showStepContainer = this.currentMarkedIndex < this.markedLines.length

      if (currentMarkedLine) {
        const line = cm.getLineHandle(currentMarkedLine.whichLine - 1)
        if (line) {
          cm.setGutterMarker(line, 'my-gutter', this.createMarkerElement())
        }
      }
    },
    // 滚动到当前标记的行
    scrollToCurrentLine() {
      const cm = this.$refs.myCodeMirror.codemirror
      const currentMarkedLine = this.markedLines[this.currentMarkedIndex]

      if (currentMarkedLine) {
        const lineNum = currentMarkedLine.whichLine - 1
        cm.scrollIntoView({ line: lineNum, ch: 0 }, 100) // 100 是动画时间，可以根据需要调整
      }
    },
    // 根据当前步骤索引返回标题
    getTitle(index) {
      // 根据当前步骤索引返回标题
      return `第${String(this.markedLines[index].whichLine)}行`
    },
    // 获取当前步骤的描述信息
    getCurrentStepInfo() {
      if (this.currentMarkedIndex < this.markedLines.length) {
        return this.markedLines[this.currentMarkedIndex].stepInfo
      }
      return '' // 或者返回一些默认值
    }
  }

}
</script>

<style lang="scss" scoped>
.my-code-editor {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.code-animation {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.my-code-mirror {
  width: 50%;
}

.code-editor ::v-deep .CodeMirror-wrap {
  margin-top: 10px;
  height: 80vh;
  overflow: hidden;
  border: #a364ff 2px solid;
}

.code-editor ::v-deep .marked-gutter::before {
  margin-top: 2px;
  content: '→';
  display: block;
  width: 15px;
  height: 10px;
  line-height: 10px;
  background-color: rgb(237, 237, 29);
  color: #ea420f;
  /* 箭头的颜色 */
}

.my-code-editor ::v-deep .CodeMirror-gutters {
  background-color: rgb(57, 39, 54);
}

.button-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  height: 12vh;
}

.step-button {
  margin: 0 10px;
  color: #ffffff;
  background-color: #a364ff;
}

.step-button:hover {
  background-color: #cb80ff;
  color: #161515;
}

.custom-steps {
  flex-grow: 1;
}

.custom-steps ::v-deep .active-step .el-step__title.is-process {
  color: #a364ff;
}

/* 动画区 */
.animation-container {
  margin: 10px 10px 10px 10px;
  display: flex;
  flex: 1;
  flex-direction: column;

  .animation-step {
    border-radius: 20px;
    background: linear-gradient(to right, #9e67f1 0%, #cb80ff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10%;

    p {
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }

  .animation-place {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    background-color: #4d425f;
    border-radius: 20px;

    p {
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
<!-- /* 当你在组件的 <style> 标签中使用 scoped 属性时，Vue.js 会为样式添加一个唯一的标识符，确保这些样式只应用在当前组件内，以防止全局样式冲突。
需要在组件内部访问子组件的 DOM 元素或者样式，而 scoped 样式默认不会渗透到子组件中。这时，深度选择器 ::v-deep 或 >>>
需要在组件内部访问子组件的 DOM 元素或者样式，而 scoped 样式默认不会渗透到子组件中。这时，深度选择器 ::v-deep 或 >>> 就变得有用了。
在复杂的应用中，可能存在多个组件嵌套的情况，每个组件都有自己的 scoped 样式。为了避免样式冲突，需要在组件内穿透样式以确保正确的样式应用。
递归地为 ::v-deep 或 >>> 后面的每个选择器添加一个额外的属性，以确保样式规则能够穿透到子组件的 DOM 结构中。
确保了样式规则在局部是唯一的，同时穿透到了子组件的 DOM 结构中 */

/* ::v-deep .CodeMirror-gutter  {
background-color: rgb(0, 0, 0) !important;
} */
/* ::v-deep.CodeMirror-gutter.marked {
color: yellow !important;
}
::v-deep.marked-gutter {
background-color: yellow;
} */ -->
