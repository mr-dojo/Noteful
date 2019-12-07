import React from 'react'

const StoreContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
})

export default StoreContext;