"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MilestoneHeader } from "./milestone-header";
import { MilestoneList } from "./milestone-list";
import { MilestoneForm } from "./milestone-form";
import { MilestonePreview } from "./milestone-preview";
import { MilestoneActions } from "./milestone-actions";
import {
    createMilestone,
    updateMilestone,
    deleteMilestone,
    updateMilestoneStatus,
} from "@/server/order";
import {
    MilestoneViewData,
    MilestoneDisplayData,
    MilestoneFormData,
    MilestoneStatus,
} from "@/types/order";
import PageInset from "@/components/shared/page-inset";
import { useMilestoneActions } from "@/hooks/use-milestone-actions";

interface MilestoneViewProps {
    data: MilestoneViewData;
}

export function MilestoneView({ data }: MilestoneViewProps) {
    const [milestones, setMilestones] = useState<MilestoneDisplayData[]>(
        data.milestones
    );
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    
    const { milestoneActions, isLoading } = useMilestoneActions({
        orderId: data.orderData.orderId,
        onSuccess: () => {
            // Refresh the page to show updated milestones
            window.location.reload();
        },
        onError: (error) => {
            console.error("Milestone action error:", error);
            alert(`Error: ${error}`);
        }
    });

    const handleAddMilestone = () => {
        setShowAddForm(true);
        setEditingId(null);
    };

    const handleEditMilestone = (milestoneId: string) => {
        setEditingId(milestoneId);
        setShowAddForm(false);
    };

    const handleDeleteMilestone = async (milestoneId: string) => {
        // If it's a temporary milestone, just remove it from the state
        if (milestoneId.startsWith("temp-")) {
            setMilestones((prev) => prev.filter((m) => m.id !== milestoneId));
            setHasChanges(true);
            return;
        }

        // Otherwise, delete it from the server
        try {
            await deleteMilestone(milestoneId);
            setMilestones((prev) => prev.filter((m) => m.id !== milestoneId));
            setHasChanges(false);
        } catch (error) {
            console.error("Error deleting milestone:", error);
        }
    };

    const handleStatusChange = async (
        milestoneId: string,
        status: MilestoneStatus
    ) => {
        // If it's a temporary milestone, just update the state
        if (milestoneId.startsWith("temp-")) {
            setMilestones((prev) =>
                prev.map((m) =>
                    m.id === milestoneId
                        ? {
                              ...m,
                              status,
                              completedDate:
                                  status === "completed" ? new Date() : null,
                          }
                        : m
                )
            );
            setHasChanges(true);
            return;
        }

        // Otherwise, update it on the server
        try {
            await updateMilestoneStatus(milestoneId, status);
            setMilestones((prev) =>
                prev.map((m) =>
                    m.id === milestoneId
                        ? {
                              ...m,
                              status,
                              completedDate:
                                  status === "completed" ? new Date() : null,
                          }
                        : m
                )
            );
        } catch (error) {
            console.error("Error updating milestone status:", error);
        }
    };

    const handleReorder = async (milestoneId: string, newPosition: number) => {
        const updatedMilestones = [...milestones];
        const currentIndex = updatedMilestones.findIndex(
            (m) => m.id === milestoneId
        );
        const [movedMilestone] = updatedMilestones.splice(currentIndex, 1);
        updatedMilestones.splice(newPosition, 0, movedMilestone);

        // Update positions
        const reorderedMilestones = updatedMilestones.map(
            (milestone, index) => ({
                ...milestone,
                position: index,
            })
        );

        setMilestones(reorderedMilestones);

        // If it's a temporary milestone, just update the state
        if (milestoneId.startsWith("temp-")) {
            setHasChanges(true);
            return;
        }

        // Otherwise, update the position on the server
        try {
            await updateMilestone(milestoneId, { position: newPosition });
        } catch (error) {
            console.error("Error reordering milestone:", error);
        }
    };

    const handleFormSubmit = async (formData: MilestoneFormData) => {
        if (editingId) {
            // If it's a temporary milestone, just update the state
            if (editingId.startsWith("temp-")) {
                setMilestones((prev) =>
                    prev.map((m) =>
                        m.id === editingId
                            ? {
                                  ...m,
                                  title: formData.title,
                                  description: formData.description,
                                  status: formData.status,
                                  estimatedDate: new Date(
                                      formData.estimatedDate
                                  ),
                                  completedDate:
                                      formData.status === "completed"
                                          ? new Date()
                                          : m.completedDate,
                                  updatedAt: new Date(),
                              }
                            : m
                    )
                );
                setEditingId(null);
                setHasChanges(true);
            } else {
                // Update existing milestone on the server
                try {
                    await updateMilestone(editingId, {
                        title: formData.title,
                        description: formData.description,
                        status: formData.status,
                        estimatedDate: new Date(formData.estimatedDate),
                    });
                    

                    setMilestones((prev) =>
                        prev.map((m) =>
                            m.id === editingId
                                ? {
                                      ...m,
                                      title: formData.title,
                                      description: formData.description,
                                      status: formData.status,
                                      estimatedDate: new Date(
                                          formData.estimatedDate
                                      ),
                                      completedDate:
                                          formData.status === "completed"
                                              ? new Date()
                                              : m.completedDate,
                                      updatedAt: new Date(),
                                  }
                                : m
                        )
                    );

                    setEditingId(null);
                } catch (error) {
                    console.error("Error updating milestone:", error);
                }
            }
        } else {
            // Create new milestone (will be saved to server on handleSaveAll)
            const newMilestone: MilestoneDisplayData = {
                id: `temp-${Date.now()}`,
                title: formData.title,
                description: formData.description,
                status: formData.status,
                estimatedDate: new Date(formData.estimatedDate),
                completedDate:
                    formData.status === "completed" ? new Date() : null,
                position: milestones.length,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setMilestones((prev) => [...prev, newMilestone]);
            setShowAddForm(false);
            setHasChanges(true);
        }
    };

    const handleFormCancel = () => {
        setEditingId(null);
        setShowAddForm(false);
    };

    const handleSaveAll = async () => {
        setIsSubmitting(true);
        try {
            // Save all new milestones to the server
            const newMilestones = milestones.filter((m) =>
                m.id.startsWith("temp-")
            );

            console.log("New milestones to save:", newMilestones);
            console.log("Order ID:", data.orderData.orderId);
            
            if (newMilestones.length === 0) {
                console.log("No new milestones to save");
                setHasChanges(false);
                return;
            }
            
            // Validate orderId before proceeding
            if (!data.orderData.orderId) {
                const error = "Order ID is missing or invalid";
                console.error(error);
                alert(error);
                return;
            }

            // Use the milestoneActions hook to save each milestone
            for (const milestone of newMilestones) {
                console.log("Saving milestone:", milestone);
                
                try {
                    // Ensure all required fields are present
                    if (!milestone.title) {
                        throw new Error("Milestone title is required");
                    }
                    
                    // Convert to the format expected by the hook
                    await milestoneActions.onCreateMilestone({
                        title: milestone.title,
                        description: milestone.description,
                        status: milestone.status,
                        estimatedDate: milestone.estimatedDate ? milestone.estimatedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    });
                    
                } catch (innerError) {
                    console.error("Error in createMilestone:", innerError);
                    throw innerError;
                }
            }

            // Call the onSaveAllChanges to finalize the save process
            await milestoneActions.onSaveAllChanges();
            
            // Mark changes as saved
            setHasChanges(false);
            
            // The page will be refreshed by the onSuccess callback in the hook
            
        } catch (error) {
            console.error("Error saving milestones:", error);
            alert(`Failed to save milestones: ${error instanceof Error ? error.message : 'Unknown error'}`); 
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setMilestones(data.milestones);
        setEditingId(null);
        setShowAddForm(false);
        setHasChanges(false);
    };

    const handleBack = () => {
        // In a real app, this would navigate back
        console.log("Navigating back to order");
    };

    const editingMilestone = editingId
        ? milestones.find((m) => m.id === editingId)
        : undefined;

    return (
        <PageInset>
            <div className="max-w-7xl mx-auto ">
                <MilestoneHeader
                    orderData={data.orderData}
                    onBack={handleBack}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Milestone Management */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <MilestoneActions
                                    onAddMilestone={handleAddMilestone}
                                    onSaveAll={handleSaveAll}
                                    onReset={handleReset}
                                    isSubmitting={isSubmitting}
                                    hasChanges={hasChanges}
                                />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Add/Edit Form */}
                                {(showAddForm || editingId) && (
                                    <MilestoneForm
                                        milestone={editingMilestone}
                                        onSubmit={handleFormSubmit}
                                        onCancel={handleFormCancel}
                                        isSubmitting={isSubmitting}
                                    />
                                )}

                                {/* Milestone List */}
                                <MilestoneList
                                    milestones={milestones}
                                    onEdit={handleEditMilestone}
                                    onDelete={handleDeleteMilestone}
                                    onStatusChange={handleStatusChange}
                                    onReorder={handleReorder}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Timeline Preview */}
                    <div>
                        <MilestonePreview
                            milestones={milestones}
                            orderTitle={data.orderData.orderTitle}
                        />
                    </div>
                </div>
            </div>
        </PageInset>
    );
}
