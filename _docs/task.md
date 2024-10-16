# Simple Task Car Management System

## Task Description
Implement a 2-page website (/, /edit), consisting of a home page with a DataTable of all car management crud page
where you can edit/create/delete cars (brands, models, modifications).
The home page should have a table showing all cars modifications and there respective data 
 - eg. brand.name, model.name, modification.name, horsePower, weight (from graphql: CarModification type)
 - the name columns should be filterable and the horsePower, weight sortable (do this in the table context)
The crud page should have a form for editing/creating/deleting a brand, model, modification (see _docs/images for UI guidance)
 - use selects that allow search, the search value is not found then allow user to create a new item (_docs/images/4_searching_value_or_creating_new_one.png)
   - for getting the date related to brand, model, modification and prefilling the selects use the following graphql queries:
     - brands: carBrands
     - models: carModels(brandId) - where brandId is the selected brand
     - modifications: carModifications(modelId) - where modelId is the selected model
   - avoid excessive calls to the API (especially for data already fetched)
 - preview the images in _docs/images for editing/creating/deleting a brand, model, modification
make sure you have loading states and error handling (the API is randomly slow and randomly fails on purpose - to disable read _docs/other.md)
Style however you like, but make sure it's responsive and looks good on mobile and desktop 
 - the datatable can have horizontal scroll on mobile

## Data and file structure
 - The data comes form the graphql API (https://task_fe_demo.pfgbulgaria.com/graphql) already configured in .env.local and it's randomly generated
   - see _docs/graphql.md and TestCors.tsx for usage and how to generate the API/SDK
   - there is a Postman collection in _docs/ for all available requests 
 - Chose what ever file structure you like and make sense to you

## Requirements
 - Use Next/React.js and typescript form the current project (already added)
 - Style using tailwindcss (already added)
 - for form state use formik (already added)
 - for application state use React context API or zustand (already added)
 - API calls are done using graphql and the generated SDK (see _docs/graphql.md)
 - don't install any additional packages or libraries except "radix-ui/*" (any package from this namespace, used for styling) if you need some base UI components

## Nice to have
 - avoid excessive calls to the API (especially for data already fetched)
 - use generic components (one Editable_Searchable_Select component for all selects)
 - use generics for types when leveraging generic components

## Tips
 - read the docs in _docs/ folder
 - check the TestCors.tsx for graphql queries usage 
 - preview the schemas in _schema.graphql (this is the entire schema of the graphql API)
 - see all requests in the .env/PFG Tasks Cars - V2.postman_collection.json (import in postman)

### For any questions or issues please contact me at: todor.mitev@pfgbulgaria.com
