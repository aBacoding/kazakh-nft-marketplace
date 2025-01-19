import {Row} from "@tanstack/react-table"

import {cn} from "@/shared/lib/utils"

interface DataTableColumnCellProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    row: Row<TData>
    title: string
}

export function DataTableColumnCell<TData>({
                                                         row,
                                                         title,
                                                         className,
                                                     }: DataTableColumnCellProps<TData>) {


    const converter = parseFloat(row.getValue(title))
    const formatted = new Intl.NumberFormat("en-US", {
        "style": "currency",
        "currency": "ETH",
    }).format(converter)

    return <div className="text-right">{formatted}</div>;
}
