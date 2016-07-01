export default (obj, query, caseInsensitive = true) => {
  let queryItems = query.trim().split(' ')

  let subject = obj

  if (typeof obj !== 'string') {
    subject = JSON.stringify(obj)
  }

  if (caseInsensitive) {
    queryItems = queryItems.map((item) => item.toLowerCase())
    subject = subject.toLowerCase()
  }

  return queryItems.every((item) => subject.indexOf(item) > 0)
}
