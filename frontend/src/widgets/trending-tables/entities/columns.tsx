"use client"

import {ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/shared/ui/native/DataTableColumnHeader.tsx";
import {DataTableColumnCell} from "@/shared/ui/native/DataTableColumnCell.tsx";

export interface INftData {
    id: string
    rank: number
    collection: string,
    thumb: "https://assets.coingecko.com/nft_contracts/images/3610/standard/chameleon-travel-club.png"
    floorPrice: number,
    volume: number,
    items: number,
    owner: number
}

const formatNumber = (value: number): string => {
    if (value >= 1000) {

        return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return value.toString();
}
export const columns: ColumnDef<INftData>[] = [

    {
        accessorKey: "rank",
        header: "#"
    },
    {
        accessorKey: "collection",
        header: "Collection",
        cell: ({row}) => {
            const collectionName = row.getValue<string>("collection");
            const thumbUrl = row.original.thumb;
            return (
                <div className="flex items-center">
                    <img
                        src={thumbUrl}
                        alt={collectionName}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{collectionName}</span>
                </div>
            );
        },
    },

    {
        accessorKey: "floorPrice",
        header:
            ({column}) => <DataTableColumnHeader column={column} title={"Floor Price"}/>,
        cell:
            ({row}) => <DataTableColumnCell row={row} title={"floorPrice"}/>
    }
    ,

    {
        accessorKey: "volume",
        header:
            ({column}) => <DataTableColumnHeader column={column} title={"Volume"}/>,
        cell:
            ({row}) => <DataTableColumnCell row={row} title={"volume"}/>
    }
    ,

    {
        accessorKey: "owner",
        header:
            ({column}) => <DataTableColumnHeader column={column} title={"Owner"}/>,
        cell:
            ({row}) => {
                const ownerCount = row.getValue<number>("owner");
                const formatted = formatNumber(ownerCount);
                return (
                    <div className="text-right">
                        {formatted}
                    </div>
                )
            }
    }
    ,
    {
        accessorKey: "items",
        header:
            ({column}) => <DataTableColumnHeader column={column} title={"Items"}/>,
        cell:
            ({row}) => {
                const ownerCount = row.getValue<number>("items");
                const formatted = formatNumber(ownerCount);
                return (
                    <div className="text-right">
                        {formatted}
                    </div>
                )
            }

    }
    /*{
        "accessorKey": "email",
        "header": ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        "accessorKey": "amount",
        "header": () => <div className="text-right">Amount</div>,
        "cell": ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                "style": "currency",
                "currency": "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },


     */
]
