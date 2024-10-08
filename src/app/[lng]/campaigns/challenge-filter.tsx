import { Dispatch, SetStateAction } from 'react';

interface ChallengeFilterProps {
  tagOptions: string[];
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

export function ChallengeFilter({ tagOptions, selectedTags, setSelectedTags }: ChallengeFilterProps) {
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="p-6 bg-latenight rounded">
      <h2 className="text-lg font-medium mb-4 text-white">Filter by Tags</h2>
      {tagOptions.length > 0 ? (
        <>
          <div className="space-y-2">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded mr-2 mb-2 ${
                  selectedTags.includes(tag)
                    ? "bg-day text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button 
              className="mt-4 text-day underline"
              onClick={() => setSelectedTags([])}
            >
              Clear all
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-300">No campaigns with tags available.</p>
      )}
    </div>
  );
}