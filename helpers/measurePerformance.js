module.exports.measurePerformance = async (page, callbackToMeasure) => {
  const before = await page.metrics()

  await callbackToMeasure()

  const after = await page.metrics()

  const task = after.TaskDuration - before.TaskDuration
  const script = after.ScriptDuration - before.ScriptDuration
  const recalcStyle = after.RecalcStyleDuration - before.RecalcStyleDuration

  return {
    total: task,
    script,
    recalcStyle
  }
}