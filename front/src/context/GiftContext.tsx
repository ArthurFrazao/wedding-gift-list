import React, {
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
  useState
} from 'react'

type GiftContextData = {
  giftSelected: number
  setGiftSelected: Dispatch<SetStateAction<number>>
}

type GiftProviderProps = {
  children: ReactNode
}

export const GiftContext = React.createContext({} as GiftContextData)

export function GiftProvider({ children }: GiftProviderProps) {
  const [giftSelected, setGiftSelected] = useState(0)

  return (
    <GiftContext.Provider
      value={{
        giftSelected,
        setGiftSelected
      }}
    >
      {children}
    </GiftContext.Provider>
  )
}

export function useGift(): GiftContextData {
  const context = useContext(GiftContext)

  if (!context) {
    throw new Error('useGift must be used within an GiftProvider')
  }

  return context
}
