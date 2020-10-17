export type File = {
  name: string
  type: string
  accessLink?: string
  size: number
  path?: string
  date: Date
  user: string
  parent?: string
  childs?: string[]
  _id: string
}
