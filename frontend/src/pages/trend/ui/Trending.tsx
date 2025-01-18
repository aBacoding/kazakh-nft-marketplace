import * as React from 'react';

import { TrendingCarousel } from '@/widgets/trending-carousel';
import { DataTable } from '@/widgets/trending-tables/ui/trending-table';
import { Payment, columns } from '@/widgets/trending-tables/entities/columns';


const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "failed",
        email: "m@example.com",
    },
    {
        id: "b1a2c3d4",
        amount: 200,
        status: "pending",
        email: "j@example.com",
    },
    {
        id: "c3d4e5f6",
        amount: 150,
        status: "failed",
        email: "k@example.com",
    },
    {
        id: "d4e5f6g7",
        amount: 250,
        status: "pending",
        email: "l@example.com",
    },
    {
        id: "e5f6g7h8",
        amount: 300,
        status: "pending",
        email: "n@example.com",
    },
    {
        id: "f6g7h8i9",
        amount: 350,
        status: "pending",
        email: "o@example.com",
    },
    {
        id: "g7h8i9j0",
        amount: 400,
        status: "pending",
        email: "p@example.com",
    },
    {
        id: "h8i9j0k1",
        amount: 450,
        status: "pending",
        email: "q@example.com",
    },
    {
        id: "i9j0k1l2",
        amount: 500,
        status: "failed",
        email: "r@example.com",
    },
    {
        id: "j0k1l2m3",
        amount: 550,
        status: "pending",
        email: "s@example.com",
    },
    {
        id: "k1l2m3n4",
        amount: 600,
        status: "pending",
        email: "t@example.com",
    },
    {
        id: "l2m3n4o5",
        amount: 650,
        status: "failed",
        email: "u@example.com",
    },
    {
        id: "m3n4o5p6",
        amount: 700,
        status: "pending",
        email: "v@example.com",
    },
    {
        id: "n4o5p6q7",
        amount: 750,
        status: "failed",
        email: "w@example.com",
    },
    {
        id: "o5p6q7r8",
        amount: 800,
        status: "pending",
        email: "x@example.com",
    },
    {
        id: "p6q7r8s9",
        amount: 850,
        status: "failed",
        email: "y@example.com",
    },
    {
        id: "q7r8s9t0",
        amount: 900,
        status: "pending",
        email: "z@example.com",
    },
    {
        id: "r8s9t0u1",
        amount: 950,
        status: "failed",
        email: "aa@example.com",
    },
    {
        id: "s9t0u1v2",
        amount: 1000,
        status: "pending",
        email: "bb@example.com",
    },
    {
        id: "t0u1v2w3",
        amount: 1050,
        status: "failed",
        email: "cc@example.com",
    },
    {
        id: "u1v2w3x4",
        amount: 1100,
        status: "pending",
        email: "dd@example.com",
    },
    {
        id: "v2w3x4y5",
        amount: 1150,
        status: "failed",
        email: "ee@example.com",
    },
    {
        id: "w3x4y5z6",
        amount: 1200,
        status: "pending",
        email: "ff@example.com",
    },
    {
        id: "x4y5z6a7",
        amount: 1250,
        status: "failed",
        email: "gg@example.com",
    },
    {
        id: "y5z6a7b8",
        amount: 1300,
        status: "pending",
        email: "hh@example.com",
    },
    {
        id: "z6a7b8c9",
        amount: 1350,
        status: "failed",
        email: "ii@example.com",
    },
    {
        id: "a7b8c9d0",
        amount: 1400,
        status: "pending",
        email: "jj@example.com",
    },
    {
        id: "b8c9d0e1",
        amount: 1450,
        status: "failed",
        email: "kk@example.com",
    },
    
];

export const Trending = () => {

    return (
        <>
            <TrendingCarousel />
            <DataTable columns={columns} data={data} />
        </>

    );
}
