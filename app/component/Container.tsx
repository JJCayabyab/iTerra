import { ReactNode } from "react"

type ContainerProps = {
    children: ReactNode
    className?: string
}

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-15 mt-10 ${className}`}>
            {children}
        </div>
    )
}
