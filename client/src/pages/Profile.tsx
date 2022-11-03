import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Offer } from '../components/profile/Offer'
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi'
import { Legend } from '../components/home/Legend'
import { UserService } from '../api/user.services'
import { Divider } from '../components/profile/Divider'
import { IProfileOffer } from '../types/interfaces/profile-offer.interface'

const Profile = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(
    ['get user offers'],
    () => UserService.getOffers(),
    {
      select: (data) => data.data.offers
    }
  )

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

      <Divider name="Active offers" margin={'my-5'} />

      <Divider name="My offers" margin={'my-5'} />

      <section className={'flex flex-col gap-5 mt-[20px]'}>
        {isLoading ? (
          <p>loading</p>
        ) : isError ? (
          <p>error</p>
        ) : data?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          data?.map((offer: IProfileOffer) => {
            return <Offer key={offer._id} {...offer} />
          })
        ) : null}
      </section>
    </>
  )
}

export default Profile
