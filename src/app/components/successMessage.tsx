'use client'

export default function SuccessMessage({ customMessage }: { customMessage: string }) {
    return (
        <div className="text-white max-w-32">
            Success!
            <p>{customMessage}</p>
        </div>

    )
}