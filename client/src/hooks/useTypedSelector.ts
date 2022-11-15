import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../state/store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
