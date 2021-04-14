import { BaseEditor, BaseSelection, BasePoint, BaseRange, Descendant, BaseText } from 'slate'
import { IndexedItem } from '../../feat/search/IxSearchModel/IndexedItem'
import { ReactEditor } from 'slate-react'

export type ParagraphElement = {
  type: 'paragraph'
  children: Descendant[]
}

export type LinkElement = {
  type: 'link'
  url: string
  children: Descendant[]
}

export type EntityElement = {
  type: 'entity'
  indexedItem: IndexedItem
  children: Descendant[]
}

// const entityLink = {
//   type: model.NodeType.entity,
//   indexedItem: indexedItem,
//   children: [{ text: indexedItem.name }],

export interface TypedEditor extends BaseEditor {
  type: string
}

export type FormattedText = {
  type?: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
}

export type CustomElement = ParagraphElement | LinkElement | EntityElement
export type CustomEditor = BaseEditor & ReactEditor & TypedEditor
export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
    Node: CustomElement | BaseText
    Point: BasePoint
    Range: BaseRange
    Selection: BaseSelection
  }
}
