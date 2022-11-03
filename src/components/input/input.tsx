import clsx from 'clsx';
import { HelpText } from './help-text';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  errors: {
    [key: string]: {
      [key: string]: string;
    } | null;
  };
  required?: boolean;
  className?: string;
}

export const Input = ({
  label,
  name,
  errors,
  className,
  required,
  ...props
}: Props) => {
  return (
    <>
      {label ? (
        <label className="block typ-label py-1">
          {label}
          {required && '*'}
        </label>
      ) : null}
      <input
        className={clsx('input', className, {
          error: errors[name],
        })}
        {...props}
      ></input>
      <HelpText text={errors[name]?.message} />
    </>
  );
};
