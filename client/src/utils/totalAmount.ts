import { useTypedSelector } from '../hooks/useTypedSelector'

export const totalAmount = () => {
  const { unitPrice, quantity } = useTypedSelector((state) => state.offerReducer)

  return +unitPrice * +quantity
}
