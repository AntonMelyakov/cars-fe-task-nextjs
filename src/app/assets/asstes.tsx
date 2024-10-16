import { CarBrand, CarCoupe, CarModel, CarModification } from "@/lib/_generated/graphql_sdk"
import { GraphQLBackend } from "@/lib/api/graphql"

//constants 
export const MODEL = "model"
export const BRAND = "brand"
export const SUCCESS = "success"
export const ERROR = "error"
export const LOADING = "loading"

//for Edit form
export const carCoupeTypes: any[] = [
    {
        name: "Convertible",
        value: CarCoupe.Convertible
    },
    {
        name: "Coupe",
        value: CarCoupe.Coupe
    },
    {
        name: "Hatchback",
        value: CarCoupe.Hatchback
    },
    {
        name: "Sedan",
        value: CarCoupe.Sedan
    },
    {
        name: "Suv",
        value: CarCoupe.Suv
    },
    {
        name: "Truck",
        value: CarCoupe.Truck
    },
    {
        name: "Van",
        value: CarCoupe.Van
    },
    {
        name: "Wagon",
        value: CarCoupe.Wagon
    },
]


//HELPER FUNCTIONS

//Homepage - table
export function selectColumnProperty(car: CarModification, column: string) {
    switch (column) {
        case "brandName":
            return car.model.brand.name;
            break;
        case "model":
            return car.model.name
            break;
        default:
            return car.coupe
    }
}

//Edit form - selectItemFormComponent 
export async function fetchBrands(setSearchedItems: (array: CarBrand[]) => void) {
    const response = await GraphQLBackend.GetBrands()
    setSearchedItems(response.carBrands)
    return response.carBrands
}


export async function fetchModels(setSearchedItems: (array: CarModel[]) => void, brandId: string) {
    if (!brandId) {
        return []
    }
    const response = await GraphQLBackend.GetModel({ brandId: brandId })
    setSearchedItems(response.carModels)
    return response.carModels
}
