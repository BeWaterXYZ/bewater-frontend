import { Card } from './card';
import { QueryType } from '../search-param-schema';

export function ProjectList({ query }: { query: QueryType }) {
  return (
    <div>
      <div className="mono-5">{JSON.stringify(query, null, 2)}</div>
      <div className="grid gap-4 grid-cols-300">
        {new Array(4).fill(0).map((_, index) => {
          return <Card key={index} />;
        })}
      </div>
    </div>
  );
}
