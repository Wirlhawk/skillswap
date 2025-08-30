import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, School, BookOpen } from "lucide-react";
import { getAllVerifications } from "@/lib/actions/seller-verification";
import { ModularTabs, TabItem } from "@/components/tabs-03";
import { VerificationActions } from "@/components/admin/verification-actions";

interface Verification {
    id: string;
    userId: string;
    studentIdImage: string;
    majorId: string;
    schoolName: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string | null;
    verifiedAt?: Date | null;
    verifiedBy?: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: {
        name: string;
        email: string;
        role: string;
    } | null;
    major?: {
        name: string;
        alias: string;
    } | null;
}

export async function VerificationRequestsList() {
    // Fetch verifications server-side
    const verifications = await getAllVerifications();

    const pendingVerifications = verifications.filter(
        (v) => v.status === "PENDING"
    );
    const approvedVerifications = verifications.filter(
        (v) => v.status === "APPROVED"
    );
    const rejectedVerifications = verifications.filter(
        (v) => v.status === "REJECTED"
    );

    const tabs: TabItem[] = [
        {
            name: `Pending (${pendingVerifications.length})`,
            value: "pending",
            content: (
                <div className="space-y-4">
                    {pendingVerifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No pending verification requests
                        </div>
                    ) : (
                        pendingVerifications.map((verification) => (
                            <VerificationCard
                                key={verification.id}
                                verification={verification}
                                showActions={true}
                            />
                        ))
                    )}
                </div>
            ),
        },
        {
            name: `Approved (${approvedVerifications.length})`,
            value: "approved",
            content: (
                <div className="space-y-4">
                    {approvedVerifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No approved verification requests
                        </div>
                    ) : (
                        approvedVerifications.map((verification) => (
                            <VerificationCard
                                key={verification.id}
                                verification={verification}
                                showActions={false}
                            />
                        ))
                    )}
                </div>
            ),
        },
        {
            name: `Rejected (${rejectedVerifications.length})`,
            value: "rejected",
            content: (
                <div className="space-y-4">
                    {rejectedVerifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No rejected verification requests
                        </div>
                    ) : (
                        rejectedVerifications.map((verification) => (
                            <VerificationCard
                                key={verification.id}
                                verification={verification}
                                showActions={false}
                            />
                        ))
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Pending
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {pendingVerifications.length}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Approved
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {approvedVerifications.length}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Rejected
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {rejectedVerifications.length}
                                </p>
                            </div>
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Verification Requests Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>Verification Requests</CardTitle>
                    <CardDescription>
                        Review and manage student verification applications
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ModularTabs
                        tabs={tabs}
                        defaultValue="pending"
                        className="w-full"
                        variant="pills"
                    />
                </CardContent>
            </Card>
        </div>
    );
}

interface VerificationCardProps {
    verification: Verification;
    showActions: boolean;
}

function VerificationCard({
    verification,
    showActions,
}: VerificationCardProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return (
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Clock className="h-3 w-3" /> Pending
                    </Badge>
                );
            case "APPROVED":
                return (
                    <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 flex items-center gap-1"
                    >
                        <CheckCircle className="h-3 w-3" /> Approved
                    </Badge>
                );
            case "REJECTED":
                return (
                    <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                    >
                        <XCircle className="h-3 w-3" /> Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Clock className="h-5 w-5 text-yellow-600" />;
            case "APPROVED":
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "REJECTED":
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return <Clock className="h-5 w-5 text-gray-600" />;
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            {getStatusIcon(verification.status)}
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    {verification.user?.name || "Unknown User"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {verification.user?.email || "No email"}
                                </p>
                            </div>
                            {getStatusBadge(verification.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <School className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                    {verification.schoolName}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                    {verification.major?.name ||
                                        "Unknown Major"}
                                </span>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Submitted on{" "}
                            {new Date(
                                verification.createdAt
                            ).toLocaleDateString()}
                        </div>

                        {verification.rejectionReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-red-800 mb-1">
                                    Rejection Reason:
                                </p>
                                <p className="text-sm text-red-700">
                                    {verification.rejectionReason}
                                </p>
                            </div>
                        )}
                    </div>

                    {showActions && verification.status === "PENDING" && (
                        <div className="flex flex-col gap-2 ml-4">
                            <VerificationActions
                                verificationId={verification.id}
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
