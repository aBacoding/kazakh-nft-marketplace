import * as React from 'react';

import { DataTable } from '@/widgets/trending-tables/ui/trending-table';
import {columns } from '@/widgets/trending-tables/entities/columns';
import {nftData} from "@/pages/trend/model/NFTDATA.tsx";


export const TrendingPage = () => {
    return (
        <div className="container mx-auto min-w-max">
            <h1 className="text-left text-2xl font-bold mb-5">Trending NFTs</h1>
            <DataTable columns={columns} data={nftData} />
        </div>

    );
}
