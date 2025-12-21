"use client";

import { useState, useEffect, useId } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Location } from "@/app/generated/prisma/client";
import { UpdateLocationOrder } from "@/lib/actions/update-location-order";



type LocationListProps = {
    locations: Location[];
};

function LocationItem({ location, index }: { location: Location; index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: location.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 mb-2 bg-white rounded shadow cursor-grab active:cursor-grabbing flex items-center gap-3 list-none hover:bg-gray-50"
        >
            <span className="font-bold w-6 text-center">{index + 1}.</span>
            <span>{location.locationTitle}</span>
        </li>
    );
}

export default function SortableItinerary({ locations: initialLocations }: LocationListProps) {
    const [mounted, setMounted] = useState(false);
    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [isSaving, setIsSaving] = useState(false);

    const dndContextId = useId();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setLocations(initialLocations);
    }, [initialLocations]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = locations.findIndex((l) => l.id === active.id);
            const newIndex = locations.findIndex((l) => l.id === over.id);
            const newOrder = arrayMove(locations, oldIndex, newIndex);

            // Update UI immediately 
            setLocations(newOrder);

            // Prepare data for database update
            const updatedOrder = newOrder.map((location, index) => ({
                id: location.id,
                order: index,
            }));

            // Save to database
            try {
                setIsSaving(true);
                await UpdateLocationOrder(updatedOrder);
            } catch (error) {
                console.error("Failed to update order:", error);
                // Revert to original order on error
                setLocations(initialLocations);
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (!mounted) return null;

    return (
        <div className="relative">
            {isSaving && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Saving...
                </div>
            )}
            <DndContext
                id={dndContextId}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={locations.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-2">
                        {locations.map((location, index) => (
                            <LocationItem key={location.id} location={location} index={index} />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}