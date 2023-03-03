export interface GiftProps {
  id: number
  name: string
  price: number
  image_url: string
  is_presented: boolean
}

export interface CategoryProps {
  id: number
  name: string
  description: string
}

export interface LoveStoryProps {
  id: number
  date: Date
  title: string
  description: string
  icon_url: string
}
