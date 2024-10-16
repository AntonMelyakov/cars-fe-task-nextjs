'use client'
import { CarModification } from "@/lib/_generated/graphql_sdk"
import Link from "next/link"
import { useState } from "react"
import { useModificationStore } from "./assets/store"
import { UpAndDown, EditIcn } from "./components/icons"
import { selectColumnProperty } from "./assets/asstes"

export default function Table({ allModifications }: { allModifications: CarModification[] }) {
    const [tableInfo, setTableInfo] = useState<CarModification[]>(allModifications)
    const [orderTypeAsc, setOrderTypeAsc] = useState<boolean>(true)
    const setNewModificationForEdit = useModificationStore((state) => state.setNewModification)

    function searchTable(value: string, column: string) {
        if (value.length > 2) {
            const newTable = allModifications.filter((car) =>
                selectColumnProperty(car, column).toLowerCase().includes(value.toLocaleLowerCase()))
            setTableInfo(newTable)
        } else if (value === "") {
            setTableInfo(allModifications)
        }

    }

    function orderTable(column: "weight" | "horsePower") {
        const newTable = [...tableInfo].sort((a, b) => {
            return orderTypeAsc ? a[column] - b[column] : b[column] - a[column]
        })
        setTableInfo(newTable)
        setOrderTypeAsc(!orderTypeAsc)
    }

    return (
        <div className="overflow-x-auto">
            <table className="border-collapse table-auto w-full text-sm p-2">
                <thead>
                    <tr className="bg-slate-600 text-center">
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 
                    text-slate-400 dark:text-slate-200 ">
                            <input type="text" placeholder={"Brand Name"}
                                onChange={(e) => searchTable(e.target.value, 'brandName')} />
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3
                     text-slate-400 dark:text-slate-200 "><input type="text"
                                placeholder={"Model"} onChange={(e) => searchTable(e.target.value, 'model')} />
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3
                     text-slate-400 dark:text-slate-200 ">
                            <div className="flex justify-center">
                                <p>HorsePower</p>
                                <UpAndDown buttonFunction={() => orderTable("horsePower")} />
                            </div>
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3
                     text-slate-400 dark:text-slate-200"><input type="text"
                                placeholder={"Modification"} onChange={(e) => searchTable(e.target.value, 'modification')} />
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3
                     text-slate-400 dark:text-slate-200">
                            <div className="flex justify-center">
                                <p>Weight</p>
                                <UpAndDown buttonFunction={() => orderTable("weight")} />
                            </div>
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3
                     text-slate-400 dark:text-slate-200">EDIT
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                    {tableInfo?.map((car, idx) => {
                        return <tr className="text-center" key={idx}>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">{car.model.brand.name}
                            </td>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">{car.model.name}
                            </td>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">{car.horsePower}
                            </td>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">{car.coupe}
                            </td>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">{car.weight}
                            </td>
                            <td className="border-b border-slate-100 dark:border-slate-700 
                        p-4 text-slate-500 dark:text-slate-400">
                                <button onClick={() => setNewModificationForEdit(car)}>
                                    <Link href={'/edit'}><EditIcn /></Link>
                                </button>
                            </td>
                        </tr>
                    })}
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}