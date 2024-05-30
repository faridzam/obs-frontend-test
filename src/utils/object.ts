import store from '@/libs/redux/store'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const iterateObject = (obj: any) => {
  Object.keys(obj).forEach(key => {
    console.log(`key: ${key}, value: ${obj[key]}`)

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      iterateObject(obj[key])
    }
  })
}

const validator = ['', null, undefined, []]
// let conditions: boolean[] = [];

export const checkEmptyForm = (obj: any, result: boolean[]): boolean[] => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'object') {
      result.push(validator.includes(obj[key]))
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      checkEmptyForm(obj[key], result)
    }
  })

  return result
}

export const getNewId = (): number => {
  let highestId = 0
  store.getState().user.users.map(user => {
    if (highestId < user.id!) {
      highestId = user.id!
    }
  })
  return highestId + 1
}
