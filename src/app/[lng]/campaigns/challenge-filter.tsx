"use client";
import { Dispatch, SetStateAction, useEffect } from 'react';
import { PageFilterOption } from "@/components/filter/PageFilterTag";

interface ChallengeFilterProps {
  tagOptions: string[];
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

export function ChallengeFilter({ tagOptions, selectedTags, setSelectedTags }: ChallengeFilterProps) {
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      return newTags;
    });
  };

  return (
    <div className="text-left pt-4">
      <h2 className="body-3 mb-7">Filter by Tags</h2>
      {tagOptions.length > 0 ? (
        <>
          <div className="my-2 h-[50vh] overflow-y-auto">
            {tagOptions.map((tag, index) => (
              <PageFilterOption
                key={`${tag}-${index}`}
                keyword="tag"
                value={tag}
                label={tag}
                on={selectedTags.includes(tag)}
                toggle={() => toggleTag(tag)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-300">No campaigns with tags available.</p>
      )}
    </div>
  );
}