'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteService } from "@/server/actions/service";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteServiceActionProps {
    serviceId: string;
    children?: React.ReactNode;
}

export function DeleteServiceAction({ serviceId, children }: DeleteServiceActionProps) {
    const [isPending, setIsPending] = useState(false);

    const handleClick = async () => {
        setIsPending(true);
        try {
            const result = await deleteService(serviceId);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.success);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children || (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                        Delete Service
                    </DropdownMenuItem>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your service
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
