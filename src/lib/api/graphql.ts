import { GraphQLClient } from 'graphql-request'
import { getSdk, SdkFunctionWrapper } from '@lib/_generated/graphql_sdk'

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_FRONTEND_GRAPTHQL_ENDPOINT ?? ''
const SERVER_GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_SIDE_GRAPTHQL_ENDPOINT ?? GRAPHQL_ENDPOINT

export const BACKEND_DATASOURCE = {
  endpoint: GRAPHQL_ENDPOINT,
  fetchParams: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
    },
  },
}

function isServerSide() {
  return typeof window === 'undefined'
}

const url = isServerSide() ? SERVER_GRAPHQL_ENDPOINT : GRAPHQL_ENDPOINT

const client = new GraphQLClient(url, {
  headers: { ...BACKEND_DATASOURCE.fetchParams.headers },
})

const authWrapper: SdkFunctionWrapper = (
  action,
  operationName,
  operationType
) => {
  const customHeaders: Record<string, string> = {}
  // uncomment this line to remove random API delay
  // authHeaders['PFG-API-SPEED'] = '1'

  // uncomment this line to remove random EDIT error's
  // errors occur about 20% of the time
  // 0 - no errors. 1 - garantied edit error
  // authHeaders['PFG-API-ERROR'] = '0'

  return action(customHeaders)
}

export const GraphQLBackend = getSdk(client, authWrapper)
