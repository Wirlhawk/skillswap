'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrderStatus } from "@/server/actions/order";
import { toast } from "sonner";
import { Order } from "./columns";

interface UpdateOrderStatusActionProps {
    order: Order;
    children: React.ReactNode;
}

export function UpdateOrderStatusAction({ order, children }: UpdateOrderStatusActionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [newStatus, setNewStatus] = useState<'Pending' | 'In Progress' | 'Done' | 'Cancelled'>(order.status);

    const handleSave = async () => {
        setIsPending(true);
        try {
            const result = await updateOrderStatus(order.id, newStatus);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.success);
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <p>Current Status: <strong>{order.status}</strong></p>
                    <Select onValueChange={(value: 'Pending' | 'In Progress' | 'Done' | 'Cancelled') => setNewStatus(value)} defaultValue={order.status}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a new status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleSave} disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
