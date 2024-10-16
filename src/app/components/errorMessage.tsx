export default function ErrorMessage({ customMessage, errorsArray = undefined }: { customMessage: string, errorsArray?: string[] }) {
    return (
        <div className="text-white max-w-32">
            Error
            <p>{customMessage}</p>

            {errorsArray?.length && <div>
                <h5>Errors: </h5>
                {errorsArray.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
            }
        </div>
    )
}