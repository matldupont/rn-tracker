import * as React from 'react'

export const createDataContext = (reducer, actions, defaultValue) => {
  const Context = React.createContext()

  const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, defaultValue)


    const boundActions = Object.keys(actions).reduce((bound, key) => {
      return { ...bound, [key]: actions[key](dispatch)}
    }, {})
    
    return (
      <Context.Provider value={{ state, ...boundActions}}>
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider }
}