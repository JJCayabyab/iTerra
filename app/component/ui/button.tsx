import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    btnName: string
}

export default function Button({ btnName, className = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`bg-[#f68712] hover:bg-orange-500  rounded-md py-1 px-3 text-white text-2xl ${className}`}
        >
            {btnName}
        </button>
    )
}
