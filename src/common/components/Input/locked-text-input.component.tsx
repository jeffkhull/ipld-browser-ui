import { Box, TextInput, ThemeContext } from 'grommet'
import React from 'react'

export interface LockedTextInputProps {
  id: string
  value: string
  setValue: (val: string) => void
  editable: boolean
  placeholder: string
  containerClassName: string
  textInputClassName: string
  isEditing: boolean
}

export function LockedTextInput(props: LockedTextInputProps) {
  return (
    <ThemeContext.Extend
      value={{
        global: {
          colors: { placeholder: '#777777' },
          control: { disabled: { opacity: 0.9 } },
        },
      }}
    >
      <Box
        onClick={!props.isEditing ? undefined : () => {}}
        id={props.id}
        hoverIndicator={{ color: 'lightgreen' }}
        className={props.containerClassName}
      >
        <TextInput
          className={props.textInputClassName}
          id="entity-text-input"
          size="xxlarge"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setValue(e?.target?.value)}
          plain
          disabled={!props.isEditing}
        />
      </Box>
    </ThemeContext.Extend>
  )
}
