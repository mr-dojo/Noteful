import React from 'react'

const storeContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
})

export default storeContext;