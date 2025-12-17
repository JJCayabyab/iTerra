// "use client";

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

type LocationListProps = {
    locations: Location[];
    onOrderChange?: (newLocations: Location[]) => void;
};

function LocationItem({ location, index }: { location: Location; index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: location.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 mb-2 bg-white rounded shadow cursor-grab flex items-center gap-3 list-none"
        >
            <span className="font-bold w-6 text-center">{index + 1}.</span>
            <span>{location.locationTitle}</span>
        </li>
    );
}

export default function SortableItinerary({ locations: initialLocations, onOrderChange }: LocationListProps) {
    const [mounted, setMounted] = useState(false);
    const [locations, setLocations] = useState<Location[]>([...initialLocations]);


    const dndContextId = useId(); 

    useEffect(() => {
        setMounted(true);
    }, []);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = locations.findIndex((l) => l.id === active.id);
            const newIndex = locations.findIndex((l) => l.id === over.id);
            const newOrder = arrayMove(locations, oldIndex, newIndex);
            setLocations(newOrder);

            if (onOrderChange) onOrderChange(newOrder);
        }
    };


    if (!mounted) return null;

    return (

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
    );
}
