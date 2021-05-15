import React from 'react'
import Routes from './component/router/route'
import ContextProvider from './component/state_management/context'

const App = () => {
  return (
    <ContextProvider>
      <Routes/>
    </ContextProvider>
  )
}

export default App