"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  restrictToWindowEdges,
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

type Components = "banner" | "people" | "poster";

type Section = { component: Components; data: any; id: string };
type BannerProps = {
  data: string;
};
function Banner({ data }: BannerProps) {
  return (
    <div className="w-full h-60 flex items-center justify-center border bg-blue-500">
      this is banner
    </div>
  );
}

type PeopleProps = {
  data: { group: string };
};
function People({ data }: PeopleProps) {
  return (
    <div className="w-full h-60 flex items-center justify-center border bg-red-500">
      this is people
    </div>
  );
}
type PosterProsp = {
  data: string[];
};
function Poster({ data }: PosterProsp) {
  return (
    <div className="w-full h-60 flex items-center justify-center border bg-yellow-500">
      this is poster
    </div>
  );
}

const ComponentMap: Record<Components, React.ComponentType<{ data: any }>> = {
  banner: Banner,
  people: People,
  poster: Poster,
};

function Section({ section }: { section: Section }) {
  let Comp = ComponentMap[section.component];
  return (
    <div>
      <Comp data={section.data as any} />
    </div>
  );
}

function SortableItem({ id, section }: { id: string; section: Section }) {
  let Comp = ComponentMap[section.component];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 20,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Comp data={section.data as any} />
      {/* {id} */}
    </div>
  );
}

export default function Page() {
  let data = {
    sections: [
      {
        id: "1",
        component: "banner",
        data: "!23",
      },
      {
        id: "2",
        component: "people",
        data: { group: "123" },
      },
      {
        id: "3",
        component: "poster",
        data: ["{}", ""],
      },
    ] as Section[],
  };

  const [items, setItems] = useState(data.sections);
  console.log(items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((section, index) => (
          <SortableItem key={section.id} id={section.id} section={section} />
        ))}
      </SortableContext>
    </DndContext>
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        console.log("move", active.id, over.id);
        console.log({
          oldIndex,
          newIndex,
        });

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
