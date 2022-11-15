import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ProfileOffer } from '../components/profile/ProfileOffer'
import { Legend } from '../components/home/Legend'
import { UserService } from '../api/user.services'
import { Divider } from '../components/profile/Divider'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { IProfileOffer } from '../types/interfaces/profile-offer.interface'
import { ActiveOffer } from '../components/profile/ActiveOffer'
import { IActiveOffer } from '../types/interfaces/active-offer.interface'
import { NoItems } from '../components/errors/no-items'

const ProfilePage = () => {
  const { data, isSuccess, isLoading, isError, refetch, isFetching } = useQuery(
    ['get user offers'],
    () => UserService.getOffers(),
    {
      select: (data) => data.data.offers
    }
  )

  const {
    data: rooms,
    isLoading: isLoadingRooms,
    isError: isErrorRooms,
    isSuccess: isSuccessRooms
  } = useQuery(['get user rooms'], () => UserService.getUserRooms(), {
    select: ({ data }) => data.rooms
  })

  const fields = [
    {
      name: 'Ad number',
      className: 'flex-[1.5_0]'
    },
    {
      name: 'Type',
      className: 'flex-[0.5_0]'
    },
    {
      name: 'Price',
      className: 'flex-1'
    },
    {
      name: 'Pair',
      className: 'flex-1'
    },
    {
      name: 'Pay Methods',
      className: 'flex-1'
    },
    {
      name: 'Info',
      className: 'flex-1'
    }
  ]

  return (
    <div>
      <Legend fields={fields} />

      <section className="relative">
        {rooms?.length ? (
          <>
            <Divider name="Active offers" margin={'my-5'} />

            {isErrorRooms ? (
              <p>error</p>
            ) : rooms?.length === 0 ? (
              <p>no offers</p>
            ) : isSuccessRooms ? (
              <div className={'flex flex-col gap-5'}>
                {rooms?.map((room: IActiveOffer) => {
                  return <ActiveOffer activeOffer={room} key={room._id} />
                })}
              </div>
            ) : null}
          </>
        ) : null}

        {/* <SkeletonWrapper isLoading={isLoading} height={100} count={10} margin={'20px'}> */}
        <Divider name="My offers" margin={'my-5'} />

        {isError ? (
          <p>error</p>
        ) : data?.length === 0 ? (
          <NoItems />
        ) : isSuccess ? (
          <div className={'flex flex-col gap-5'}>
            {data?.map((offer: IProfileOffer) => {
              return <ProfileOffer offer={offer} refetch={refetch} key={offer._id} />
            })}
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default ProfilePage
