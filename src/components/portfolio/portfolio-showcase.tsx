import { PortfolioPreviewDialog } from "./portfolio-preview-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreatePortfolioForm from "./create-portfolio-form";
import { Badge } from "../ui/badge";

interface Portfolio {
    id: string;
    title: string;
    description: string;
    images: string[] | null;
    tags: string[] | null;
    createdAt: Date;
}

interface PortfolioShowcaseProps {
    portfolios: Portfolio[];
    isOwnProfile: boolean;
    onDelete?: () => void;
}

export function PortfolioShowcase({
    portfolios,
    isOwnProfile,
    onDelete,
}: PortfolioShowcaseProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between item-center">
                <h1 className="font-bold text-2xl">Portfolio Showcase</h1>
                {isOwnProfile && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" size="sm">
                                <Plus /> Add Portfolio
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Portfolio</DialogTitle>
                            </DialogHeader>
                            <CreatePortfolioForm />
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            {portfolios.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <Plus className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold">No Portfolio yet</h3>
                    <p className="text-muted-foreground mb-4">
                        No Portfolio to show yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    {portfolios.map((portfolio) => (
                        <PortfolioPreviewDialog
                            key={portfolio.id}
                            trigger={
                                <Card className="cursor-pointer hover:outline-primary transition-all p-4 pb-6 gap-2">
                                    <CardHeader className="p-0">
                                        <img
                                            src={
                                                portfolio.images?.[0] ||
                                                "/placeholder.svg"
                                            }
                                            alt={portfolio.title}
                                            className="w-full h-48 object-cover rounded-md mb-4 border"
                                        />
                                    </CardHeader>
                                    <CardContent className="p-0 px-2">
                                        <h3 className="font-bold mb-2">
                                            {portfolio.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {portfolio.description}
                                        </p>

                                        <span className="flex flex-wrap gap-1 mt-5">
                                            {portfolio.tags &&
                                                portfolio.tags.map((tag) => (
                                                    <Badge key={tag}>
                                                        {tag}
                                                    </Badge>
                                                ))}
                                        </span>
                                    </CardContent>
                                </Card>
                            }
                            portfolio={{
                                id: portfolio.id,
                                title: portfolio.title,
                                description: portfolio.description,
                                images: portfolio.images || [],
                                tags: portfolio.tags || [],
                                createdAt:
                                    portfolio.createdAt.toLocaleDateString(
                                        "id-ID",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    ),
                            }}
                            onDelete={onDelete}
                            isEditable={isOwnProfile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
