import Spinner from "./components/spinner";

export default function Loading() {
    return (
        <div className="flex text-center min-h-screen justify-center bg-slate-300 ">
            <div className="flex flex-col m-4">
                <h1>Loading ...</h1>
                <Spinner />
            </div>
        </div>
    )
}