import { Preview } from '../components/create-offer/Preview'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CreateOfferStepOne } from '../components/create-offer/CreateOfferStepOne'
import { CreateOfferStepTwo } from '../components/create-offer/CreateOfferStepTwo'
import { CreateOfferStepThree } from '../components/create-offer/CreateOfferStepThree'
import { BigNumber, ethers } from 'ethers'
import { useTokens } from '../hooks/useTokens'
import { useFiat } from '../hooks/useFiat'
import { ProgressBar } from '../components/create-offer/Progressbar'
import { useCreateRoom } from '../hooks/useCreateRoom'

const CreateOfferPage = () => {
  const { data, handleCreateOffer, isSuccess, isLoading, hash, prepareTxStatus, txStatus } =
    useCreateRoom()

  const { step } = useTypedSelector((state) => state.createOfferReducer)

  const { tokens, isSuccess: tokensSuccess } = useTokens()
  const { allFiat, isSuccess: fiatSuccess } = useFiat()

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
    <div className="p-5">
      {/* <SkeletonWrapper isLoading={isLoaded} height={100}> */}
      <ProgressBar steps={steps} />
      {/* </SkeletonWrapper> */}

      <div className={'grid grid-cols-2 gap-5 mt-5'}>
        <div>
          {/* <SkeletonWrapper isLoading={isLoaded} height={600}> */}
          {pageDisplay()}
          {/* </SkeletonWrapper> */}
        </div>

        <div>
          {/* <SkeletonWrapper isLoading={isLoaded} height={600}> */}
          <Preview />
          {/* </SkeletonWrapper> */}
        </div>
      </div>
    </div>
  )
}

export default CreateOfferPage
