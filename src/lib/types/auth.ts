import { Json } from './supabase'

export interface User {
  bio: string | null
  cover: string | null
  createdAt: string
  dateOfBirth: string
  displayName: string
  id: string
  image: string | null
  intrests: Json
  isMentor: boolean
  isVerified: boolean
  social: Json
  username: string
}
