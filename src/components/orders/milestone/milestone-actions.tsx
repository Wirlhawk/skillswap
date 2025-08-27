"use client";

import { Button } from "@/components/ui/button";
import { Plus, Save, RotateCcw } from "lucide-react";
import { MilestoneActionsProps } from "@/types/order";

export function MilestoneActions({
    onAddMilestone,
    onSaveAll,
    onReset,
    isSubmitting,
    hasChanges,
}: MilestoneActionsProps) {
    return (
        <div className="flex items-center justify-between">
            <Button onClick={onAddMilestone} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
            </Button>
            
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onReset}
                    disabled={isSubmitting || !hasChanges}
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
                <Button
                    onClick={onSaveAll}
                    disabled={isSubmitting || !hasChanges}
                    size="sm"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save All Changes
                </Button>
            </div>
        </div>
    );
}
