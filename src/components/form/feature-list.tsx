"use client";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FeatureListProps {
    features: string[];
    onFeaturesChange: (features: string[]) => void;
    error?: string;
}

export function FeatureList({
    features,
    onFeaturesChange,
    error,
}: FeatureListProps) {
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        onFeaturesChange(newFeatures);
    };

    const addFeature = () => {
        onFeaturesChange([...features, ""]);
    };

    const removeFeature = (index: number) => {
        onFeaturesChange(features.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Label>Package Features *</Label>
            <div className="space-y-2 mt-2">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Input
                            placeholder="Professional video editing"
                            value={feature}
                            onChange={(e) =>
                                handleFeatureChange(index, e.target.value)
                            }
                            className="flex-1"
                        />
                        {features.length > 1 && (
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFeature(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="mt-2 bg-transparent"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
    );
}
