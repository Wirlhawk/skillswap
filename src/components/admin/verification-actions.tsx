"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateVerificationStatus } from "@/lib/actions/seller-verification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VerificationActionsProps {
    verificationId: string;
}

export function VerificationActions({
    verificationId,
}: VerificationActionsProps) {
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        try {
            setIsProcessing(true);
            await updateVerificationStatus(verificationId, "APPROVED");
            toast.success("Verification approved successfully");
            router.refresh(); // Refresh the page to show updated data
        } catch (error) {
            console.error("Error approving verification:", error);
            toast.error("Failed to approve verification");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            toast.error("Please provide a reason for rejection");
            return;
        }

        try {
            setIsProcessing(true);
            await updateVerificationStatus(
                verificationId,
                "REJECTED",
                rejectionReason
            );
            toast.success("Verification rejected successfully");
            setRejectionReason("");
            setIsRejectDialogOpen(false);
            router.refresh(); // Refresh the page to show updated data
        } catch (error) {
            console.error("Error rejecting verification:", error);
            toast.error("Failed to reject verification");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
            >
                {isProcessing ? "Processing..." : "Approve"}
            </Button>
            <Button
                variant="outline"
                onClick={() => setIsRejectDialogOpen(true)}
                disabled={isProcessing}
                className="border-red-300 text-red-700 hover:bg-red-50"
            >
                Reject
            </Button>

            {/* Rejection Dialog */}
            <Dialog
                open={isRejectDialogOpen}
                onOpenChange={setIsRejectDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Verification Request</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this
                            verification request.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        placeholder="Enter rejection reason..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsRejectDialogOpen(false)}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={isProcessing || !rejectionReason.trim()}
                        >
                            {isProcessing ? "Rejecting..." : "Reject"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
