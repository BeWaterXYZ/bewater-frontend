import { Cross2Icon } from '@radix-ui/react-icons';

interface LabelSkillProps {
  label: string;
  onClick?: () => void;
}

export function LabelSkill({ label, onClick }: LabelSkillProps) {
  return (
    <span className="whitespace-nowrap inline-block rounded-full h-6 bg-[#1E293B]  body-4 px-3 py-1 m-1 ">
      <span className="opacity-75">
        #{label}{' '}
        {onClick && (
          <Cross2Icon
            className="inline w-3 h-3 cursor-pointer"
            onClick={onClick}
          />
        )}
      </span>
    </span>
  );
}
