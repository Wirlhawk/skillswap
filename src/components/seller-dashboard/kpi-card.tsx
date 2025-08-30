import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

const KpiCard = ({ title, value, icon, trend, className }: KpiCardProps) => {
    return (
        <Card
            className={cn(
                "group hover:shadow-lg transition-all duration-300 cursor-pointer",
                "border-l-4 border-l-primary/50",
                className
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                            {title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                            {value}
                        </p>
                        {trend && (
                            <div className="flex items-center gap-1 mt-2">
                                <span
                                    className={cn(
                                        "text-xs font-medium",
                                        trend.isPositive
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    )}
                                >
                                    {trend.isPositive ? "+" : ""}
                                    {trend.value}%
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    vs last month
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                            {icon}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default KpiCard;
