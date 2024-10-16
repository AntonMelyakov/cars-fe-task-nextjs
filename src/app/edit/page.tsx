import { useQuery } from "@tanstack/react-query";
import EditForm from "./editForm";
import { CarBrand } from "@/lib/_generated/graphql_sdk";
import { GraphQLBackend } from "@/lib/api/graphql";

export default async function Edit() {

    return (
        <div className="flex min-h-screen flex-col bg-slate-700 p-5 items-center">
            <h1 className="text-white">Edit Form:</h1>
            <EditForm />
        </div >
    )

}