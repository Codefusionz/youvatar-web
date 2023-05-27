import { User } from '@/lib/types/auth'
import { Mentor } from '@/lib/types/mentor'
import { signal } from '@preact/signals-react'

export const user = signal<User | null>(null)
export const mentor = signal<Mentor | null>(null)
