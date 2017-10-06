let data = ''

// Program Main Execution Loop

process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  var chunk = process.stdin.read()
  if (chunk !== null) {
    data = data + chunk
  }
})

process.stdin.on('end', () => {
  outputResult(processInput(data))
})

const outputResult = messageObj => {
  for (const message in messageObj) {
    for (const line of sortPackets(messageObj[message])) {
      console.log(line[1])
    }
  }
}

// Pure functions

const processInput = str =>
  splitLines(str)
    .map(parseData)
    .filter(Array.isArray)
    .reduce(splitMessages, {})

const sortByIndex = index => (a, b) => a[index] - b[index]
const sortPackets = arr => [].concat(arr).sort(sortByIndex(0))
const splitLines = str => str.split('\n')
const parseData = line => /(\d+)\s+(\d+)\s+(\d+)\s+(.*)/.exec(line)

const splitMessages = (acc, val) => {
  if (Array.isArray(acc[val[1]])) {
    acc[val[1]].push([val[2], val[0]])
  } else {
    acc[val[1]] = [[val[2], val[0]]]
  }
  return acc
}
