import { FilterArea } from './filter-area';
import { ProjectList } from './project-list';

import { querySchema } from './type';

export default function ChallengeProjects({ params, searchParams }: any) {
  console.log('ChallengeProjects', { params, searchParams });

  const query = querySchema.parse(searchParams);

  return (
    <div className="body-1 text-center">
      <div className="container flex  p-4">
        <div className="hidden md:block">
          <FilterArea />
        </div>
        <div className="flex-1">
          <ProjectList query={query} />
        </div>
      </div>
    </div>
  );
}
