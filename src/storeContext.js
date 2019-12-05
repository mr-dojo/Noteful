import React from 'react'

const StoreContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
})

export default StoreContext;