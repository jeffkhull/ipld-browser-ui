export interface EntityDocument {
  _id: string
  documentJson: string
}

export const blankEntityDocument: EntityDocument = {
  _id: '',
  documentJson: '',
}
