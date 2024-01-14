const state = {
  frames: []
}

// 生成更多的帧
for (let i = 1; i <= 17; i++) {
  const frame = {
    stack: [['A' + i], ['B' + i], ['C' + i], ['D' + i], ['E' + i]],
    heap: [['1' + i], ['2' + i], ['3' + i], ['4' + i], ['5' + i]],
    object: [['V' + i], ['W' + i], ['X' + i], ['Y' + i], ['Z' + i]]
  }

  state.frames.push(frame)
}

export default {
  namespaced: true,
  state
}
