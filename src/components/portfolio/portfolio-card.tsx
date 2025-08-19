import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Portfolio {
    id: string;
    title: string;
    description: string;
    images: string[] | null;
    tags: string[] | null;
    createdAt: Date;
}

interface PortfolioCardProps {
    portfolio: Portfolio;
    children?: React.ReactNode;
}

export function PortfolioCard({ portfolio, children }: PortfolioCardProps) {
    return (
        <Card className="cursor-pointer hover:bg-accent transition-all p-4 pb-6 gap-2">
            <CardHeader className="p-0">
                <img
                    src={portfolio.images?.[0] || "/placeholder.svg"}
                    alt={portfolio.title}
                    className="w-full h-48 object-cover rounded-md mb-4 border"
                />
            </CardHeader>
            <CardContent className="p-0 px-2">
                <h3 className="font-bold mb-2">{portfolio.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {portfolio.description}
                </p>

                <span className="flex flex-wrap gap-1 mt-5">
                    {portfolio.tags &&
                        portfolio.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                </span>
            </CardContent>
            {children}
        </Card>
    );
}
