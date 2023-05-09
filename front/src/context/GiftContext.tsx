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
  giftNameSelected: string
  setGiftNameSelected: Dispatch<SetStateAction<string>>
}

type GiftProviderProps = {
  children: ReactNode
}

export const GiftContext = React.createContext({} as GiftContextData)

export function GiftProvider({ children }: GiftProviderProps) {
  const [giftSelected, setGiftSelected] = useState(0)
  const [giftNameSelected, setGiftNameSelected] = useState<string>('')

  return (
    <GiftContext.Provider
      value={{
        giftSelected,
        setGiftSelected,
        giftNameSelected,
        setGiftNameSelected
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
