import React from "react"
import cn from "classnames"

interface BoxProps {
    className?: string,
    children: React.ReactNode
}


export const Box: React.FC<BoxProps> = ({children, className}) => {
  return (
    <div className={cn(
        className,
        "bg-white py-5"
    )}>
        {children}
    </div>
  )
}
