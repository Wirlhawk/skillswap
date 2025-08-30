"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import formatRupiah from "@/utils/format-rupiah";

interface RevenueChartProps {
    data: { date: Date; revenue: number }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
    const formattedData = data.map((item) => ({
        // Format date for display, e.g., "Aug 28"
        name: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
        revenue: item.revenue,
    }));

    // Calculate total revenue and growth
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const avgRevenue = totalRevenue / data.length;
    const isGrowth =
        data.length > 1 &&
        data[data.length - 1].revenue > data[data.length - 2].revenue;

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">
                            Revenue Overview
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Track your daily revenue performance
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                                Total Revenue
                            </p>
                            <p className="text-lg font-bold text-primary">
                                {formatRupiah(totalRevenue)}
                            </p>
                        </div>
                        <Badge
                            variant={isGrowth ? "default" : "secondary"}
                            className="flex items-center gap-1"
                        >
                            {isGrowth ? (
                                <TrendingUp className="h-3 w-3" />
                            ) : (
                                <TrendingDown className="h-3 w-3" />
                            )}
                            {isGrowth ? "Growing" : "Declining"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={formattedData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#6b7280" }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#6b7280" }}
                            tickFormatter={(value) =>
                                `${formatRupiah(Number(value))}`
                            }
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border p-3 rounded-lg shadow-lg">
                                            <p className="font-medium text-sm mb-1">
                                                {label}
                                            </p>
                                            <p className="text-sm text-primary font-semibold">
                                                Revenue:{" "}
                                                {formatRupiah(
                                                    payload[0].value as number
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Daily earnings
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="revenue"
                            fill="url(#colorGradient)"
                            radius={[6, 6, 0, 0]}
                            className="hover:opacity-80 transition-opacity duration-200"
                        />
                    </BarChart>
                </ResponsiveContainer>

                {/* Gradient definition for the bars */}
                <svg width="0" height="0">
                    <defs>
                        <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                    </defs>
                </svg>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
