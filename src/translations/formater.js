exports.compile = function (msgs) {
  let results = {}
  const arr = Object.keys(msgs)
  arr.map((item) => {
    results = {
      ...results,
      [item]: msgs[item].defaultMessage
    }
  })
  return results
}

