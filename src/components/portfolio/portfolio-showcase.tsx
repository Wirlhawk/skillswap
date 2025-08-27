import { PortfolioPreviewDialog } from "./portfolio-preview-dialog";
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
import { PortfolioCard } from "./portfolio-card";

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
                <div>
                    <h1 className="font-bold text-2xl">Portfolio Showcase</h1>
                    <p className="text-muted-foreground">
                        Explore projects and works in this portfolio.
                    </p>
                </div>

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
                            trigger={<PortfolioCard portfolio={portfolio} />}
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
