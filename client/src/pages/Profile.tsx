import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Offer } from '../components/profile/Offer'
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi'
import { Legend } from '../components/home/Legend'
import { UserService } from '../api/user.services'
import { Divider } from '../components/profile/Divider'
import { IProfileOffer } from '../interfaces/IProfileOffer'

const Profile = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(
    ['get user offers'],
    () => UserService.getOffers(),
    {
      select: (data) => data.data.offers
    }
  )

  console.log(data)

  const fields = [
    <div className="flex-[1.5_0]">Ad number</div>,
    <div className="flex-[0.5_0]">Type</div>,
    <div className="flex-1">Price</div>,
    <div className="flex-1">Pair</div>,
    <div className="flex-1">Pay Methods</div>,
    <div className="flex-1">Info</div>
  ]

  return (
    <>
      <Legend fields={fields} />

      <Divider name="All offers" />
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
