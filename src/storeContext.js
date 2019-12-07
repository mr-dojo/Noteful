import React from 'react'

const StoreContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
})

export default StoreContext;