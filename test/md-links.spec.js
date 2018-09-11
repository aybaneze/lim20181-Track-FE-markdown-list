const mdLinks = require('../index');
const option = {
    validate: false,
    stats: false
  }

//   test(' mdLinks(prueba.md, options)', () => {
//     const option = {
//       validate: false,
//       stats: true
//     }

//  expect(mdLinks("../prueba.md",option)).toBe({total: 1,unique: 1,path: 'C:\\Users\\AybañezE\\Documents\\lim20181-Track-FE-markdown-list\\prueba.md' })})
 test('mdLinks(prueba.md, options)', () => {
    const options = {
      validate: false,
      stats: false
    }
 expect(mdLinks('prueba.md',options)).toBe('C:\\Users\\AybañezE\\Documents\\lim20181-Track-FE-markdown-list\\prueba.md' )})
    
