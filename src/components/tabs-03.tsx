import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    {
        name: "Overview",
        value: "overview",
        content: "pnpm dlx shadcn@latest add tabs",
    },
    {
        name: "Portfolio",
        value: "portfolio",
        content: "npx shadcn@latest add tabs",
    },
    {
        name: "Projects",
        value: "projects",
        content: "npx shadcn@latest add tabs",
    },
];

export default function TabsSeparatedDemo() {
    return (
        <Tabs defaultValue={tabs[0].value} className="max-w-xs w-full">
            <TabsList className="p-0 h-auto bg-background gap-3 mb-2">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-5"
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {/* {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    <div className="h-10 flex items-center justify-between border gap-2 rounded-md pl-3 pr-1.5">
                        <code className="text-[13px]">{tab.content}</code>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-7 w-7"
                        >
                            <Copy className="!h-3.5 !w-3.5" />
                        </Button>
                    </div>
                </TabsContent>
            ))} */}
        </Tabs>
    );
}
