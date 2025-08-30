'use client';

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import formatRupiah from "@/utils/format-rupiah";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Service } from "./services-columns";

import { DeleteServiceAction } from "./delete-service-action";
import Link from "next/link";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* Edit functionality removed */}
                        <DeleteServiceAction serviceId={service.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-sm font-semibold">{formatRupiah(service.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Created:</span>
                        <span className="text-sm">{new Date(service.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Link href={`/service/${service.id}`} passHref>
                    <Button size="sm" variant="outline">View Service</Button>
                </Link>
                <div className="flex space-x-2">
                    {/* Edit button removed */}
                    <DeleteServiceAction serviceId={service.id}>
                        <Button size="sm" variant="destructive">Delete</Button>
                    </DeleteServiceAction>
                </div>
            </CardFooter>
        </Card>
    );
}