"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getSellerVerificationStatus } from "@/lib/actions/seller-verification";
import Link from "next/link";

interface VerificationStatusProps {
    userId: string;
}

interface Verification {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    schoolName: string;
    createdAt: string;
    rejectionReason?: string;
}

export function VerificationStatus({ userId }: VerificationStatusProps) {
    const [verification, setVerification] = useState<Verification | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const status = await getSellerVerificationStatus(userId);
                setVerification(status);
            } catch (error) {
                console.error("Error fetching verification status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [userId]);

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!verification) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        Seller Verification
                    </CardTitle>
                    <CardDescription>
                        Become a seller to start offering your services
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        You&apos;re currently registered as a client. To start
                        selling your skills and services, you need to complete
                        the verification process.
                    </p>
                    <Link href="/become-seller">
                        <Button className="w-full">
                            Apply to Become a Seller
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Clock className="h-5 w-5 text-yellow-600" />;
            case "APPROVED":
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "REJECTED":
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-600" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge variant="secondary">Pending Review</Badge>;
            case "APPROVED":
                return (
                    <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                    >
                        Approved
                    </Badge>
                );
            case "REJECTED":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getStatusMessage = (status: string) => {
        switch (status) {
            case "PENDING":
                return "Your verification request is currently under review. This usually takes 2-3 business days.";
            case "APPROVED":
                return "Congratulations! You're now a verified seller. You can start creating and offering your services.";
            case "REJECTED":
                return "Your verification request was not approved. Please review the reason below and try again.";
            default:
                return "Verification status unknown.";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(verification.status)}
                    Seller Verification Status
                </CardTitle>
                <CardDescription>{verification.schoolName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Status:
                    </span>
                    {getStatusBadge(verification.status)}
                </div>

                <p className="text-sm text-gray-600">
                    {getStatusMessage(verification.status)}
                </p>

                {verification.status === "REJECTED" &&
                    verification.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-red-800 mb-1">
                                Rejection Reason:
                            </p>
                            <p className="text-sm text-red-700">
                                {verification.rejectionReason}
                            </p>
                        </div>
                    )}

                {verification.status === "PENDING" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            Submitted on{" "}
                            {new Date(
                                verification.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {verification.status === "REJECTED" && (
                    <Link href="/become-seller">
                        <Button variant="outline" className="w-full">
                            Apply Again
                        </Button>
                    </Link>
                )}
            </CardContent>
        </Card>
    );
}
