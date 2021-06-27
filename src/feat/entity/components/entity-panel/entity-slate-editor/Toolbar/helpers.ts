import * as Slate from 'slate'

const LIST_TYPES = ['numbered-list', 'bulleted-list']
export function isBlockActive(editor: any, format: any) {
  try {
    const [match] = Slate.Editor.nodes(editor, {
      match: (n) => n.type === format,
    })

    return !!match
  } catch (error) {
    return false
  }
}

export function isMarkActive(editor: any, format: string) {
  try {
    const marks = Slate.Editor.marks(editor) as { [index: string]: any }
    return marks ? marks[format] === true : false
  } catch (error) {
    return false
  }
}
export function toggleMark(editor: any, format: any) {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Slate.Editor.removeMark(editor, format)
  } else {
    Slate.Editor.addMark(editor, format, true)
  }
}
export function toggleBlock(editor: any, format: any) {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Slate.Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as any),
    split: true,
  })

  Slate.Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Slate.Transforms.wrapNodes(editor, block)
  }
}
