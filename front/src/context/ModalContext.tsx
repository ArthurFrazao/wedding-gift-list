import React, {
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
  useState
} from 'react'

type ModalContextData = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isWaiting: boolean
  setIsWaiting: Dispatch<SetStateAction<boolean>>
}

type ModalProviderProps = {
  children: ReactNode
}

export const ModalContext = React.createContext({} as ModalContextData)

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isWaiting,
        setIsWaiting
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider')
  }

  return context
}
