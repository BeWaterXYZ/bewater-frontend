import { FilterArea } from './filter-area';
import { ProjectList } from './project-list';

import { querySchema } from '../search-param-schema';
import { getChallenges } from '@/services/challenge';

export default function ChallengeProjects({ params, searchParams }: any) {
  const query = querySchema.parse(searchParams);

  return (
    <div className="container flex flex-wrap gap-10 pt-4">
      <div className="w-full lg:w-[200px] hidden lg:block">
        <FilterArea />
      </div>
      <div className="w-full lg:w-auto flex-1">
        <ProjectList query={query} />
      </div>
    </div>
  );
}
