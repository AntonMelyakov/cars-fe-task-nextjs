'use client'
import React from 'react'
import { GraphQLBackend } from '@lib/api/graphql'
import { Mutation, useQuery } from '@tanstack/react-query'
import { CarBrand, CarModel, CarModification, CreateModelMutation, MutationCreateCarModelArgs, Mutation as MutationSDK } from '@lib/_generated/graphql_sdk'

interface Props {
  className?: string
  children?: React.ReactNode
}

const TestCors: React.FC<Props> = (props) => {
  const { data, isLoading } = useQuery<CarModification[]>({
    queryKey: ["brands"],
    retry: false,
    queryFn: async () => {
      const response = await GraphQLBackend.GetModification()
      console.log(response.allCarModifications)
      return response.allCarModifications
    },
  })

  return <div>{isLoading ? "loading data" : data?.length}


  </div>
}

export default TestCors
