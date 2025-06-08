import type { ReactElement } from "react";

const variantStyle = {
    "primary": "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium",
    "secondary": "bg-slate-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium border border-gray-300"
}

const sizeStyle = {
    "sm": "px-3 py-1.5 text-sm",
    "md": "px-4 py-2 text-base", 
    "lg": "px-5  py-2 text-lg"
}

interface ButtonProps {
    variant: "primary" | "secondary",
    size?: "sm" | "md" | "lg",
    text: string;
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variantClasses = variantStyle[props.variant];
    const sizeClasses = sizeStyle[props.size || "md"];
    
    return (
        <button 
            className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
            onClick={props.onClick}
        >
            {props.startIcon}
            {props.text}
            {props.endIcon}
        </button>
    );
}