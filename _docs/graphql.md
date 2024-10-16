# GraphQL API and types

## GraphQL API
 - The api URL is `https://task_fe_demo.pfgbulgaria.com/graphql` the entire schema can be found in _schema.graphql
 - Postman collection with all requests can be found in .env/PFG Tasks Cars - V2.postman_collection.json

## How to make requests to the API using graphql
 - Write the query in a .gql file located in the src/app folder (example: src/app/example.gql)
 - go in the _codegen folder (install packages if needed)
 - run `npm run codegen`
    - this command creates an SDK in the src/lib/_generated folder
    - the SDK can be used in any ts/tsx file view the exported variable - GraphQLBackend (src/lib/api/graphql.ts)
    - THe command also creates types for typescript in the src/lib/_generated folder
      - if a fragment is created (example: src/app/example.gql) the type is named <fragmentname>Fragment (example: CarBrandDataFragment)