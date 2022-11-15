import { Preview } from '../components/create-offer/Preview'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CreateOfferStepOne } from '../components/create-offer/CreateOfferStepOne'
import { CreateOfferStepTwo } from '../components/create-offer/CreateOfferStepTwo'
import { CreateOfferStepThree } from '../components/create-offer/CreateOfferStepThree'
import { useTokens } from '../hooks/useTokens'
import { useFiat } from '../hooks/useFiat'
import { ProgressBar } from '../components/create-offer/ProgressBar'
import { useCreateRoom } from '../hooks/useCreateRoom'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { ErrorBoundary } from 'react-error-boundary'

const CreateOfferPage = () => {
  const {
    data,
    handleCreateOffer,
    isSuccess,
    isLoading: createRoomLoading,
    hash,
    prepareTxStatus,
    txStatus
  } = useCreateRoom()

  const { step } = useTypedSelector((state) => state.createOfferReducer)

  const { tokens, tokensError, tokensLoading, tokensSuccess } = useTokens()
  const { allFiat, fiatSuccess, fiatError, fiatLoading } = useFiat()

  const isLoaded = tokensSuccess && fiatSuccess

  const pageDisplay = () => {
    switch (step) {
      case 1:
        return <CreateOfferStepOne tokens={tokens} allFiat={allFiat} />
      case 2:
        return <CreateOfferStepTwo />
      case 3:
        return <CreateOfferStepThree handleCreateOffer={handleCreateOffer} />
      default:
        return
    }
  }

  const steps = [
    {
      step: 1,
      name: 'Offer Price'
    },
    {
      step: 2,
      name: 'Payment Method'
    },
    {
      step: 3,
      name: 'Settings'
    }
  ]

  return (
    <ErrorBoundary fallback={<h1>error</h1>}>
      <div className="p-5">
        <ProgressBar steps={steps} />

        <div className={'grid grid-cols-2 gap-5 mt-5'}>
          <div>
            <ErrorBoundary fallback={<h1>error</h1>}>
              <SkeletonWrapper isLoaded={isLoaded} height={600}>
                <div className="flex flex-col gap-5">{pageDisplay()}</div>
              </SkeletonWrapper>
            </ErrorBoundary>
          </div>

          <div>
            <SkeletonWrapper isLoaded={isLoaded} height={600}>
              <Preview />
            </SkeletonWrapper>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default CreateOfferPage
