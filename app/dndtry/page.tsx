"use client"
import Container from "../component/Container";
import { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Location = { id: string; name: string };

function LocationItem({ location, index }: { location: Location; index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: location.id });

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
            className="p-4 mb-2 bg-white rounded shadow cursor-grab flex items-center gap-3"
        >
            {/* Number */}
            <span className="font-bold w-6 text-center">{index + 1}.</span>
            {/* Location Name */}
            <span>{location.name}</span>
        </li>
    );
}

export default function NumberedItineraryList() {
    const [locations, setLocations] = useState<Location[]>([
        { id: '1', name: 'Louvre Museum' },
        { id: '2', name: 'Lunch at Cafe' },
        { id: '3', name: 'Eiffel Tower' },
        { id: '4', name: 'Seine River Cruise' },
        { id: '5', name: 'Montmartre Walk' },
    ]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = locations.findIndex((l) => l.id === active.id);
            const newIndex = locations.findIndex((l) => l.id === over.id);
            setLocations(arrayMove(locations, oldIndex, newIndex));
        }
    };

    return (
        <Container>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-center font-bold text-lg mb-4">Trip Itinerary</h1>

                <DndContext
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
        </Container>
    );
}
