import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { ProfileOffer } from '../components/profile/ProfileOffer'
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi'
import { Legend } from '../components/home/Legend'
import { UserService } from '../api/user.services'
import { Divider } from '../components/profile/Divider'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { IProfileOffer } from '../types/interfaces/profile-offer.interface'
import { ActiveOffer } from '../components/profile/ActiveOffer'
import { IActiveOffer } from '../types/interfaces/active-offer.interface'

const Profile = () => {
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
    <>
      <Legend fields={fields} />

      {rooms?.length ? (
        <>
          <Divider name="Active offers" margin={'my-5'} />

          {isErrorRooms ? (
            <p>error</p>
          ) : rooms?.length === 0 ? (
            <p>no offers</p>
          ) : isSuccessRooms ? (
            rooms?.map((room: IActiveOffer) => {
              return <ActiveOffer activeOffer={room} key={room._id} />
            })
          ) : null}
        </>
      ) : null}

      <Divider name="My offers" margin={'my-5'} />

      {/* <SkeletonWrapper isLoading={isLoading} height={100} count={10} margin={'20px'}> */}
      <section className={'flex flex-col gap-5 mt-[20px]'}>
        {isError ? (
          <p>error</p>
        ) : data?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          data?.map((offer: IProfileOffer) => {
            return <ProfileOffer offer={offer} refetch={refetch} key={offer._id} />
          })
        ) : null}
      </section>
      {/* </SkeletonWrapper> */}
    </>
  )
}

export default Profile
