'use client'
import { CarBrand, CarCoupe, CarModel, CarModification } from "@/lib/_generated/graphql_sdk";
import { GraphQLBackend } from "@/lib/api/graphql";
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useModificationStore } from "../assets/store";
import SuccessMessage from "../components/successMessage";
import ErrorMessage from "../components/errorMessage";
import { BRAND, carCoupeTypes, ERROR, LOADING, MODEL, SUCCESS } from "../assets/asstes";
import SelectItemComponent from "./editFormComponents/selectItemFormComponent";
import Spinner from "../components/spinner";



export default function EditForm() {
    const [modificationId, setModificationId] = useState<string>()

    const [responseHandling, setResponseHandling] = useState<string>('')
    const [successMsg, setSuccessMsg] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [errorsArray, setErrorsArray] = useState<string[]>()

    function success(msg: string) {
        setErrorMsg('')
        setSuccessMsg(msg)
        setResponseHandling(SUCCESS)
    }

    function fail(msg: string, errorsArray: string[] = []) {
        setSuccessMsg('')
        setErrorMsg(msg)
        setErrorsArray(errorsArray)
        setResponseHandling(ERROR)
    }

    const modificationForEdit: CarModification | undefined = useModificationStore((state) => state.selectedModification)

    useEffect(() => {
        if (modificationForEdit?.model) {
            setModificationId(modificationForEdit.id)
        }
    }, [])

    async function deleteModification(id: string) {
        try {
            setResponseHandling(LOADING)
            await GraphQLBackend.DeleteModification({ id: id })
            success("Modification deleted")
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                fail("Modification is not deleted", [error.message])
            }
        }

    }

    const validate = (values: {
        brand: string,
        model: string,
        name: string,
        coupe: CarCoupe | undefined,
        horsePower: number | undefined,
        weight: number | undefined
    }) => {
        const errors: {
            brand?: string,
            model?: string,
            name?: string,
            weight?: string
        } = {}

        if (!values.brand) {
            errors.brand = 'Required';
        }

        if (!values.model) {
            errors.model = 'Required';
        }

        if (values.name.length > 30 || values.name.length < 3) {
            errors.name = 'Name must be between 3 and 30 characters';
        }

        if (values.weight !== undefined && values.weight < 500) {
            errors.weight = "Minimum weight is 500"
        }

        if (values.horsePower !== undefined && values.horsePower < 50) {
            errors.weight = "Minimum Horse Power is 50"
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            brand: modificationForEdit?.model.brand.id ?? '',
            model: modificationForEdit?.model.id ?? '',
            name: modificationForEdit?.name ?? '',
            coupe: modificationForEdit?.coupe ?? undefined,
            horsePower: modificationForEdit?.horsePower ?? undefined,
            weight: modificationForEdit?.weight ?? undefined
        },
        validate,
        onSubmit: async values => {
            try {
                setResponseHandling(LOADING)
                let id
                if (!modificationId) {
                    const createResponse = await GraphQLBackend.CreateModification({ name: values.name, modelId: values.model })
                    console.log(createResponse.createCarModification)
                    id = createResponse.createCarModification.id
                    setModificationId(id)
                } else {
                    id = modificationId
                }
                const editResponse = await GraphQLBackend.EditModification({
                    data: {
                        id: id,
                        name: values.name,
                        horsePower: values.horsePower,
                        weight: values.weight,
                        coupe: values.coupe
                    }
                })
                console.log(editResponse)
                success("New Modification is added or edited succesfully!")
            } catch (error) {
                if (error instanceof Error) {
                    fail("Item is not added", [error.message])
                    console.log(error.message)
                }
                //Keep in mind that this works better in our case, 
                //but probably to show the error.message is the better aproach in general, TBD
                //fail("Modification is not added correctly!", error?.response?.errors?.map((_error: any) => _error.message))
            }

        },
    });
    return (
        <form className="max-w-fit p-2 mt-2 flex flex-col" onSubmit={formik.handleSubmit}>
            <SelectItemComponent success={success} fail={fail} formik={formik} name={BRAND} />
            <SelectItemComponent success={success} fail={fail} formik={formik} name={MODEL} />

            <div className="flex justify-between flex-col md:flex-row">
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    disabled={!formik.values.model}
                    className="m-1 border-2 border-black p-1 rounded-md"
                />

                <select
                    id="coupe"
                    name="coupe"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coupe}
                    disabled={!formik.values.model}
                    className="m-1 min-w-48 border-2 border-black p-1 rounded-md"
                >
                    {carCoupeTypes.map((coupe) => <option key={coupe.value} value={coupe.value}>{coupe.name}</option>)}
                </select>
            </div>

            <div className="flex justify-between flex-col md:flex-row">
                <input
                    id="horsePower"
                    name="horsePower"
                    type="number"
                    placeholder="Horse Power"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.horsePower}
                    disabled={!formik.values.model}
                    className="m-1 border-2 border-black p-1 rounded-md"
                />

                <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                    disabled={!formik.values.model}
                    className="m-1 border-2 border-black p-1 rounded-md"
                />
            </div>
            <div className="p-2">
                {
                    formik.touched.horsePower && formik.errors.horsePower ? (
                        <div className="text-white">{formik.errors.horsePower}</div>
                    ) : null
                }

                {
                    formik.touched.weight && formik.errors.weight ? (
                        <div className="text-white">{formik.errors.weight}</div>
                    ) : null
                }

                {
                    formik.touched.name && formik.errors.name ? (
                        <div className="text-white">{formik.errors.name}</div>
                    ) : null
                }

            </div>

            <button className="w-24 m-2 p-2 bg-lime-500" type="submit">Submit</button>
            {modificationId && <button onClick={() => deleteModification(modificationId)} className=" w-24 m-2 p-2 bg-red-600" type="button">Delete</button>}
            {responseHandling == LOADING && <Spinner />}
            {responseHandling == SUCCESS && <SuccessMessage customMessage={successMsg} />}
            {responseHandling == ERROR && <ErrorMessage customMessage={errorMsg} errorsArray={errorsArray} />}
        </form >
    )
}