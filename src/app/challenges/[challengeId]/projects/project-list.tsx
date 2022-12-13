import { Card } from './card';
import { QueryType } from './type';

export function ProjectList({ query }: { query: QueryType }) {
  return (
    <div>
      ProjectList
      <div>{JSON.stringify(query, null, 2)}</div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {new Array(4).fill(0).map((_, index) => {
          return <Card key={index} />;
        })}
      </div>
    </div>
  );
}
