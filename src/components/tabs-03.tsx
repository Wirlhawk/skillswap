import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ReactNode } from "react";

export interface TabItem {
    name: string;
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ModularTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    className?: string;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "outline" | "pills";
    onValueChange?: (value: string) => void;
}

export function ModularTabs({
    tabs,
    defaultValue,
    className = "max-w-xs w-full",
    orientation = "horizontal",
    variant = "pills",
    onValueChange,
}: ModularTabsProps) {
    const defaultTab = defaultValue || tabs[0]?.value;

    return (
        <Tabs
            defaultValue={defaultTab}
            className={className}
            orientation={orientation}
            onValueChange={onValueChange}
        >
            <TabsList
                className={`p-0 h-auto bg-background gap-3 mb-2 ${
                    variant === "pills" ? "rounded-full" : ""
                }`}
            >
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        disabled={tab.disabled}
                        className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                            variant === "pills" ? "rounded-xl px-5" : ""
                        }`}
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
