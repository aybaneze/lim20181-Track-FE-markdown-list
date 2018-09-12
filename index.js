//Guardamos en variable el modulo de fileSystem
const util = require ('util');
const fs = require('fs');
const readdirAsync = util.promisify(fs.readdir);
const path = require('path')
const fetch = require('node-fetch');
//capturar el comando del usuario con la ruta

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    getFiles(path).then(arrFiles => {
      Promise.all(arrFiles.map(fl => {
        return ReadFiles(fl)
      })).then(rs => {
        const arrLinks = rs.reduce((a, f) => a.concat(f), [])
        if (option.validate || option.stats) {
          validateLinks(arrLinks).then(response => {
            resolve(selectOption(response, option))
          })
        } else {
          resolve(arrLinks)
        }        
      })
    })
  })
}

const selectOption = (path, option) => {
  if (option.validate && option.stats) {
    const objResults = {
      total: path.length,
      unique: new Set(path.map(links => links.link)).size,
      broken: path.filter(link => link.statusText === 'FAIL').length,
    }
    return objResults;
  } else if (option.validate) {
    const arrayValidate=[]
    path.forEach(element=>{
      for (let value in element){
      arrayValidate.push(value+ " : " +element[value])
    }})
    return arrayValidate
  } else if (option.stats) {
    const objStats = {
      total: path.length,
      unique: new Set(path.map(links => links.link)).size,
    }
    return objStats;
  } 
  // else{
  //   return path
  // }
}

const validateLinks = (arrResultadosLinks) => {
  const promesas = arrResultadosLinks
    .map(link => new Promise((resolve, reject) => {
      fetch(link.link)
        .then(response => {
          link.status = response.status;
          link.statusText = response.statusText;
          resolve(link)
        })
        .catch(err => {
          err.code = 404;
          err.message = 'FAIL';
          link.status = err.code;
          link.statusText = err.message;
          resolve(link)
        })
    }))
  return Promise.all(promesas)
    .then(respuestas => {
      const resultadoFinal = []
      respuestas.forEach(response => {
        resultadoFinal.push(response)
      })
      return resultadoFinal;
    })
}

const ReadData = (path, file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
  let result = file.match(/\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi);
  const countLink = [];
  result.forEach(elementData => {
    const ObjLink = {
      text: elementData.substring(1, parseInt(elementData.indexOf(']'))),
      link: elementData.substring(parseInt(elementData.indexOf('(')) + 1, parseInt(elementData.indexOf(')'))),
      path: path,
    }
    countLink.push(ObjLink);
  })
  return countLink;
};

const ReadFiles = (fileMd) => {
  //accede a un fichero para su lectura y que nos entregue en cadena
  if (path.extname(fileMd) === '.md') {
    const sinc = fs.readFileSync(fileMd, 'utf-8')
    return ReadData(fileMd, sinc)
  } else {
    return []
  }
}

const getFiles =(dir) => {
  return new Promise((resolve, reject) => {
    if (fs.lstatSync(dir).isFile()) {
      resolve([path.resolve(dir)])
    } else {
      readdirAsync(dir).then(subdirs => {
        Promise.all(subdirs.map((subdir) => {
          const res = path.resolve(dir, subdir);
          if (fs.lstatSync(res).isDirectory()) {
            return getFiles(res)
          } else {
            return res
          }
        })).then(files => {
          // ordeno los arrays
          const r = files.reduce((a, f) => a.concat(f), [])
          resolve(r.filter(el => {
            if (el) return el
          }))
        }).catch(err=>console.log('error'))
      })
    }    
  })
 }

module.exports = mdLinks;