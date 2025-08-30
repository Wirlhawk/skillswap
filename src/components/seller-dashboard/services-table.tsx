'use client';

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Service } from "./services-columns";
import { useRouter } from "next/navigation";


interface ServicesTableProps {
    initialServices: Service[];
    initialTotalPages: number;
}

const ServicesTable = ({ initialServices, initialTotalPages }: ServicesTableProps) => {
    const router = useRouter();
    const [data, setData] = useState<{ services: Service[], totalPages: number }>({ services: initialServices, totalPages: initialTotalPages });
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handlePreviousPage = () => {
        if (page > 1) {
            setIsLoading(true);
            const newPage = page - 1;
            setPage(newPage);
            router.push(`/seller/services?page=${newPage}`);
        }
    };

    const handleNextPage = () => {
        if (page < data.totalPages) {
            setIsLoading(true);
            const newPage = page + 1;
            setPage(newPage);
            router.push(`/seller/services?page=${newPage}`);
        }
    };

    return (
        <DataTable
            columns={columns}
            data={data.services}
            filterKey="title"
            page={page}
            totalPages={data.totalPages}
            setPage={(newPage) => {
                setIsLoading(true);
                setPage(newPage);
                router.push(`/seller/services?page=${newPage}`);
            }}
            isLoading={isLoading}
        />
    );
};

export default ServicesTable;
