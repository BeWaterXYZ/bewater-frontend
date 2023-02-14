'use client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface SearchInputProps extends React.ComponentPropsWithoutRef<'input'> {}
export function SearchInput(props: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 border border-grey-800  h-[36x] py-1 rounded-sm">
      <div>
        <MagnifyingGlassIcon className="text-grey-800" height={20} width={20} />
      </div>
      <input
        className="bg-transparent block flex-1 outline-none text-white"
        placeholder="Search for team or project name"
        {...props}
      />
    </div>
  );
}
