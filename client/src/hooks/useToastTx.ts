import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export const useToastTx = (isLoading: boolean) => {
  const toastId = useRef(null)

  const txSuccess = (msg: string) => {
    toast.update(toastId.current, {
      render: msg,
      type: 'success',
      position: toast.POSITION.BOTTOM_RIGHT,
      isLoading: false,
      closeOnClick: true,
      autoClose: 5000
    })
  }

  const txError = (error: string) => {
    toast.update(toastId.current, {
      render: error,
      type: 'error',
      position: toast.POSITION.BOTTOM_RIGHT,
      isLoading: false,
      closeOnClick: true,
      autoClose: 5000
    })
  }

  useEffect(() => {
    const loading = () => {
      toastId.current = toast(`Waiting for tx...`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        isLoading: true
      })
    }

    if (isLoading) {
      loading()
    }
  }, [isLoading])

  return { txSuccess, txError }
}
