import {Column} from "@tanstack/react-table"
import {ChevronDown, ChevronUp} from "lucide-react"

import {cn} from "@/shared/lib/utils"
import {Button} from "@/shared/ui/native/button"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
                                                         column,
                                                         title,
                                                         className,
                                                     }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("text-right text-xl", className)}>
            <Button variant="ghost"
                    size="sm"
                    className="text-black"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                {
                    column.getIsSorted() === "asc" ? <ChevronUp className="h-4 w-4"/> :
                        <ChevronDown className="h-4 w-4"/>
                }
                {title}
            </Button>
        </div>
    )
}
