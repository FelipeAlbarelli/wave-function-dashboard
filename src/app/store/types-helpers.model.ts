export type ModelToAdd<T extends {id: string | number}> = Omit<T, 'id'>

export type SetOptional<T , Rem extends keyof T> = Omit<T , Rem> & {
    [key in Rem]?: T[Rem] 
}