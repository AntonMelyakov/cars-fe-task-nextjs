import { fetchBrands, fetchModels } from "@/app/assets/asstes"
import { CarBrand, CarModel } from "@/lib/_generated/graphql_sdk"
import { GraphQLBackend } from "@/lib/api/graphql"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { MODEL, BRAND } from "@/app/assets/asstes"
import Spinner from "@/app/components/spinner"

type SelectItemComponentprops = {
    name: string,
    formik: any,
    fail: (msg: string, array?: string[]) => void,
    success: (msg: string) => void
}

export default function SelectItemComponent({ name, formik, fail, success }: SelectItemComponentprops) {
    const [searchedItems, setSearchedItems] = useState<CarBrand[] | CarModel[]>([])
    const [newItem, setNewItem] = useState<string>()
    const [showItemsDropdown, setShowItemsDropdown] = useState<boolean>(false)
    const [editItemForm, setEditItemForm] = useState<boolean>(false)
    const [editItemTitle, setEditItemTitle] = useState<string>('')
    const [itemLoading, setItemLoading] = useState<boolean>(false)

    async function deleteItem(itemId: string) {
        if (itemId) {
            try {
                setItemLoading(true)
                const result = name === BRAND ?
                    await GraphQLBackend.DeleteBrand({ id: itemId })
                    : await GraphQLBackend.DeleteModel({ id: itemId })
                refetch()
                success("Item is deleted")
                setItemLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    fail("Item is not deleted", [error.message])
                    console.log(error.message)
                }
                setItemLoading(false)
            }
        }
    }

    async function editItem(itemId: string, itemName: string) {
        if (itemId && itemName) {
            try {
                setNewItem('')
                setShowItemsDropdown(false)
                setItemLoading(true)
                const result = name === BRAND ?
                    await GraphQLBackend.EditBrands({ data: { id: itemId, name: itemName } })
                    : await GraphQLBackend.EditModel({ data: { id: itemId, name: itemName } })
                refetch()
                success("Item added!")
                setItemLoading(false)
            } catch (error) {
                setItemLoading(false)
                if (error instanceof Error) {
                    fail("Item is not added", [error.message])
                }
            }
        }
    }

    async function addItem(itemName: string, brand = '') {
        if (itemName) {
            try {
                setItemLoading(true)
                setShowItemsDropdown(false)
                setNewItem('')
                const response = name === BRAND ? await GraphQLBackend.CreateBrand({ name: itemName })
                    : await GraphQLBackend.CreateModel({ name: itemName, brandId: brand })
                refetch()
                setItemLoading(false)
                success("Item created")
            } catch (error) {
                if (error instanceof Error) {
                    fail("Something went wrong, please try again later.", [error.message])
                    console.log(error)
                }
                setItemLoading(false)
            }
        }
    }

    const { data, isLoading, refetch } = useQuery<CarBrand[] | CarModel[]>({
        queryKey: name === BRAND ? [name] : [formik.values.brand],
        retry: false,
        queryFn: async () => name === BRAND ? fetchBrands(setSearchedItems) : fetchModels(setSearchedItems, formik.values.brand)
    })

    function filterData(value: string, searchData: CarBrand[] | CarModel[] | undefined, setNewList: Function, setNewParam: Function) {
        if (value.length > 2 && searchData) {
            const newList = [...searchData].filter((brand) => brand.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
            if (newList.length === 0) {
                if (name === BRAND) {
                    setNewParam(value)
                } else { //if this is Model, we need a brand to be set
                    if (formik.values.brand) {
                        setNewParam(value)
                    }
                }
            }
            setNewList(newList)
        } else if (value.length <= 2 && searchData?.length) {
            setNewList(searchData)
            setNewParam("")
        }
    }

    return (
        <div className="border-2 rounded-md p-2 m-2 flex justify-between flex-col md:flex-row">
            {isLoading ? <Spinner /> :
                <div>
                    <select id={name}
                        name={name}
                        onChange={(e) => formik.handleChange(e)}
                        onBlur={formik.handleBlur}
                        value={formik["values"][name]}
                        onMouseDown={(e) => {
                            e.preventDefault()
                        }}
                        onClick={() => setShowItemsDropdown(!showItemsDropdown)}
                        disabled={name == MODEL && !formik.values.brand}

                    >
                        <option disabled value={''}> -- select a Item -- </option>
                        {searchedItems.map((Item) => <option key={Item.id} value={Item.id}>{Item.name}</option>)}
                    </select>
                    <div className={`absolute z-10 flex flex-col p-2 bg-white ${showItemsDropdown ? 'shown' : 'hidden'}`}>
                        <input className="m-1 border-2 border-black p-1 rounded-md" type="text"
                            onChange={(e) => filterData(e.target.value, data, setSearchedItems, setNewItem)} />
                        {!newItem && <ul className="overflow-auto h-40">
                            {searchedItems.map((item) => <li className="cursor-pointer hover:bg-gray-400 " onClick={() => {
                                formik.setFieldValue(name, item.id)
                                setShowItemsDropdown(!showItemsDropdown)
                            }} key={item.id} value={item.id}>{item.name}</li>)}
                        </ul>}
                        {newItem && <div>
                            <p>Do you want to create an Item "{newItem}"</p>
                            <button className={`m-2 p-2 bg-lime-500`}
                                onClick={() => addItem(newItem, formik.values.brand)} type="button">Add</button>
                        </div>}
                    </div>
                    <div className={`mt-2 ${editItemForm ? 'opacity-100' : 'opacity-30'}`}>
                        <input
                            disabled={!editItemForm || !formik.values.brand}
                            placeholder={"Change name ..."}
                            type="text"
                            value={editItemTitle}
                            onChange={(e) => setEditItemTitle(e.target.value)}
                            className="border-2"
                        />
                        <button className={`mx-2 p-1 bg-lime-500 ${editItemTitle && formik["values"][name] ?
                            'opacity-100 cursor-default' : 'opacity-30 cursor-not-allowed'}`} onClick={() => editItem(formik["values"][name], editItemTitle)}
                            type="button">Save</button>
                    </div>
                </div>
            }
            <div>
                <button className={`m-2 p-2 bg-lime-500 ${searchedItems.length && formik["values"][name] ?
                    'opacity-100 cursor-default' : 'opacity-30 cursor-not-allowed'}`} type='button'
                    onClick={() => setEditItemForm(!editItemForm)}> Edit</button>
                <button className={`m-2 p-2 bg-red-600  ${searchedItems.length && formik["values"][name] ?
                    'opacity-100 cursor-default' : 'opacity-30 cursor-not-allowed'}`} type='button'
                    onClick={() => deleteItem(formik["values"][name])}> Delete</button>
            </div>
            {itemLoading && <Spinner />}
        </div>
    )
}