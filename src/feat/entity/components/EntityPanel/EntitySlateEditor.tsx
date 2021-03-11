import { Box } from '@chakra-ui/react'
import { css } from 'emotion'
import isHotkey from 'is-hotkey'
import React from 'react'
import * as Slate from 'slate'
import { Element as SlateNode } from 'slate'
import * as SlateHistory from 'slate-history'
import * as SlateReact from 'slate-react'
import * as subComponents from './EntitySlateEditor/components'
import * as helpers from './EntitySlateEditor/helpers'
import { LiveTypingPortal } from './EntitySlateEditor/LiveTypingPortal'
import * as model from './EntitySlateEditor/model'
import { toggleMark } from './EntitySlateEditor/Toolbar/helpers'
import * as _ from 'lodash'
import { IndexedItemType } from '../../../search/IxSearchModel/IndexedItemType'
import { IndexedItem } from '../../../search/IxSearchModel/IndexedItem'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { entityStoreSelectors, useEntityStore } from '../../stores/entity.store'
import { latestChangeType } from '../../singletons'

const HotkeyMap = new Map<string, string>()
HotkeyMap.set('mod+b', 'bold')
HotkeyMap.set('mod+i', 'italic')
HotkeyMap.set('mod+u', 'underline')
HotkeyMap.set('mod+`', 'code')

export interface EntitySlateEditorProps {
  setEditorContent: (content: SlateNode[]) => void
  isEditing: boolean
  slateEditorContent: SlateNode[]
  triggerOutboundRelationCreate: () => void
}

export const curDataContainer: { curData: model.CursorPostionData } = {
  curData: {
    analysisRanges: {},
    searchType: IndexedItemType.ENTITY,
    charInfo: {},
    wordInfo: {},
    nodeInfo: {},
    lineInfo: {},
    sentenceInfo: {},
    atInfo: {},
    paragraphInfo: {},
  },
}

function setCurData(newCurData: model.CursorPostionData) {
  curDataContainer.curData = newCurData
}

export function EntitySlateEditor(props: EntitySlateEditorProps) {
  const cursorRef = React.useRef<any>()
  const curData = curDataContainer.curData
  const editor = React.useMemo(
    () =>
      helpers.withModifiers(SlateReact.withReact(SlateHistory.withHistory(Slate.createEditor()))),
    [],
  )

  const [ltBoxTarget, setLtBoxTarget] = React.useState<any>()
  const [ltSelectionIndex, setLtSelectionIndex] = React.useState(0)
  const [inlineSearchString, setSearchString] = React.useState<string | null>(null)
  const entityId = useEntityStore(entityStoreSelectors.entityId)
  const entityName = useEntityStore(entityStoreSelectors.entityName)

  const [indexedItems, setIndexedItems] = React.useState<IndexedItem[]>([])
  const { apply } = editor

  // const setContent = React.useCallback(
  //   _.throttle(props.setEditorContent, 1000, { leading: false, trailing: true }),
  //   [props.setEditorContent],
  // )

  React.useEffect(() => {
    // throw new NotImplementedException('Method')
    // void IxSearch.getIndexedItems(
    //   { id: entityId || '', name: entityName },
    //   inlineSearchString || '',
    //   curData.searchType,
    //   (items: IxSearch.IndexedItem[]) => {
    //     setIndexedItems(items)
    //   },
    //   10,
    // )
  }, [entityName, entityId, inlineSearchString, curData.searchType])

  editor.apply = React.useCallback((op: Slate.Operation) => {
    switch (op.type) {
      case 'merge_node': {
        latestChangeType.type = 'merge_node'
        if (op.path.length === 1) {
          // Two merge_node calls are made.  The condition in this if is arbitrary right now...not sure how to pick the right one.
          editor.insertText('\n')
        }
        apply(op)
        break
      }
      default:
        apply(op)
        break
    }
  }, [])

  const renderElement = React.useCallback((props) => <subComponents.EditorElement {...props} />, [])
  const renderLeaf = React.useCallback((props) => <subComponents.EditorLeaf {...props} />, [])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      // Process hotkey
      HotkeyMap.forEach((value, key) => {
        if (isHotkey(key, event as any)) {
          event.preventDefault()
          toggleMark(editor, value)
        }
      })

      // Process live typing box
      if (ltBoxTarget != null) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault()
            const prevIndex = ltSelectionIndex >= indexedItems.length - 1 ? 0 : ltSelectionIndex + 1
            setLtSelectionIndex(prevIndex)
            break
          }
          case 'ArrowUp': {
            event.preventDefault()
            const nextIndex = ltSelectionIndex <= 0 ? indexedItems.length - 1 : ltSelectionIndex - 1
            setLtSelectionIndex(nextIndex)
            break
          }
          case 'Tab':
          case 'Enter':
            // TODO - put special case here for "in this search?".  to start workflow for creating a relation
            event.preventDefault()

            console.log(`ltSelectionIndex`, ltSelectionIndex)
            console.log(`indexedItems[ltSelectionIndex]`, indexedItems[ltSelectionIndex])

            void helpers.processLtItemSelection(
              editor,
              ltBoxTarget,
              curData,
              curData.searchType,
              indexedItems[ltSelectionIndex],
              setLtBoxTarget,
            )

            break
          case 'Escape':
            event.preventDefault()
            setLtBoxTarget(null)
            break
        }
      }
    },
    [ltSelectionIndex, inlineSearchString, ltBoxTarget, indexedItems],
  )

  React.useEffect(() => {
    if (ltBoxTarget && indexedItems.length > 0) {
      const el = cursorRef.current
      const domRange = SlateReact.ReactEditor.toDOMRange(editor, ltBoxTarget)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [indexedItems.length, editor, ltSelectionIndex, inlineSearchString, ltBoxTarget])

  return (
    <Box
      id="entity-document"
      className={css`
        padding: 10px;
        padding-left: 21px;
        overflow-y: auto;
        overflow-x: hidden;
      `}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    >
      <SlateReact.Slate
        id="slate-editor"
        editor={editor}
        value={props.slateEditorContent}
        onChange={(newValue) => {
          helpers.analyzeLiveTypingOnChange(
            editor,
            setLtBoxTarget,
            setSearchString,
            setLtSelectionIndex,
            curData,
            setCurData,
          )

          //   console.log(`new content `, newValue);
          props.setEditorContent(newValue as SlateNode[])
        }}
      >
        <subComponents.Toolbar />
        <SlateReact.Editable
          // TODO - reactivate this statement when https://github.com/ianstormtaylor/slate/pull/3388 is in latest version
          readOnly={!props.isEditing}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onError={(e) => {
            console.log(`onError occurred in slate editor `, e)
          }}
          onErrorCapture={(e) => {
            console.log(`onErrorCapture in slate editor`)
          }}
          onChange={(newVal) => {
            console.log(`changed`, newVal)
          }}
          onKeyDown={onKeyDown}
        />
        {ltBoxTarget != null && (
          <LiveTypingPortal
            cursorRef={cursorRef}
            indexedItems={indexedItems}
            selectionIndex={ltSelectionIndex}
            editor={editor}
            ltBoxTarget={ltBoxTarget}
            inlineSearchString={inlineSearchString || ''}
            searchType={curData.searchType}
            setLtBoxTarget={setLtBoxTarget}
            curData={curData}
          />
        )}
      </SlateReact.Slate>
    </Box>
  )
}
