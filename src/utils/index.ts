export const toObj = str => {
  return JSON.parse(toJSON(str))
}

export const toJSON = (obj: any) => {
  return JSON.stringify(obj)
}
