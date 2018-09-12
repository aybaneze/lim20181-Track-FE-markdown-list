const mdLinks = require('../index');
const option = {
  validate: false,
  stats: false
}

test('mdLinks(prueba.md, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  return mdLinks('prueba.md', options)
    .then(response => {
      expect(response).toEqual([{
        text: 'Markdown',
        link: 'https://es.wikipedia.org/wiki/Markdown',
        path: 'C:\\Users\\AybañezE\\Documents\\lim20181-Track-FE-markdown-list\\prueba.md'
      }])
    })
})

test('mdLinks(prueba.md, options)', () => {
  const options = {
    validate: true,
    stats: false
  }
  return mdLinks('prueba.md', options)
    .then(response => {
      expect(response).toEqual([ { text: 'Markdown',
      link: 'https://es.wikipedia.org/wiki/Markdown',
      path: 'C:\\Users\\AybañezE\\Documents\\lim20181-Track-FE-markdown-list\\prueba.md',
      status: 200,
      statusText: 'OK' } ])
    })
})

test('mdLinks(prueba.md, options)', () => {
  const options = {
    validate: false,
    stats: true
  }
  return mdLinks('prueba.md', options)
    .then(response => {
      expect(response).toEqual({ total: 1, unique: 1 })
    })
})

test('mdLinks(prueba.md, options)', () => {
  const options = {
    validate: true,
    stats: true
  }
  return mdLinks('prueba.md', options)
    .then(response => {
      expect(response).toEqual({ total: 1,
        unique: 1,
        broken: 0,
      })
    })
})

test('mdLinks(textos, options)', () => {
  const options = {
    validate: true,
    stats: true
  }
  return mdLinks("textos", options)
    .then(response => {
      expect(response).toEqual({ total: 67, unique: 32, broken: 1 })
    })
})

test('mdLinks(prueba.md, options)', () => {
  const options = {
    validate: true,
    stats: true
  }
  return mdLinks('prueba.md', options)
    .then(response => {
      expect(response).toEqual({ total: 1,
        unique: 1,
        broken: 0,
      })
    })
})

