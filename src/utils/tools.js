/**
 * 工具函数
 */
export function isEmail (str) {
    let stand = /^[\w\-.]+@[a-z0-9]+(-[a-z0-9]+)?(\.[a-z0-9]+(-[a-z0-9]+)?)*\.[a-z]{2,4}$/i
    return stand.test(str)
}

// 重排列表
export function reorder (list, startIdx, endIdx) {
    const result = Array.from(list)
    const [removed] = result.splice(startIdx, 1)
    result.splice(endIdx, 0, removed)

    return result
}