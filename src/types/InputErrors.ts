import type { Member } from './Member'

export type InputErrors = Partial<Record<keyof Omit<Member, 'id'>, string[]>>
