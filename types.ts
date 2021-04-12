import { ReactNode } from 'react'

export interface ObjectWithUrl {
  url: string
}

export type Collection = {
  name: string
  nameEn: string
  slug: string
  coverImage: ObjectWithUrl
  colStart?: number
  colSpan?: number
}

export type Category = {
  name: string
  pluralName?: string
  slug: string
}

export type InfoBlock = {
  slug: string
  title: string
}

export type CommonData = {
  categories: Category[]
  infoBlocks: InfoBlock[]
}

export type InstagramPhoto = {
  url: string
  title: string
  sys: {
    id: string
  }
}

export type Image = {
  url: string
  width: number
  height: number
}

export type CollectionInfo = {
  name: string
  slug: string
}

export interface BasicItem {
  name: string
  slug: string
  thumbnail: ObjectWithUrl
  price: number
  compareToPrice: number
  ribbon?: string
  isNew?: boolean
  isPair?: boolean
  sizes?: string[]
  defaultSize?: string[]
  category: Category
  glbModel: ObjectWithUrl
  sys: {
    id: number
  }
  className?: string
}

export interface Item extends BasicItem {
  description: string
  collection: CollectionInfo
  material: Material
  mediaCollection: {
    items: Image[]
  }
  relatedCollection: {
    items: BasicItem[]
  }
}

export interface CommonPageProps {
  children?: ReactNode
  commonData: CommonData
}

export type AnyObject = Record<string, unknown>

export type Data = {
  commonData: CommonData
  data: AnyObject
}

export type Material = {
  name: string
  slug: string
}
