# API configuration

The API has a random delay to allow for loader state. To disable the random delay send PFG-API-SPEED header with the value 1
the same is true for the random error, to disable it send PFG-API-ERROR header with the value 0

To set headers check the src/lib/api/graphql.ts file there in the `authWrapper` function you can set the headers, uncomment the code if needed

```typescript
const authWrapper: SdkFunctionWrapper = (
  action,
  operationName,
  operationType
) => {
  const customHeaders: Record<string, string> = {}
  customHeaders['PFG-API-SPEED'] = '1'
  customHeaders['PFG-API-ERROR'] = '0'
  return action(customHeaders)
}
```