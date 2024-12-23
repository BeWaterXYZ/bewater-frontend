import { Input } from "@/components/form/control";
import { Dialogs } from "../store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  icon: z.string().default('link'),
  url: z.string().url("Please enter a valid URL"),
});

type Inputs = z.infer<typeof schema>;

interface LinkImportDialogProps {
  data: NonNullable<Dialogs["link_import"]>;
  close: () => void;
}

export default function LinkImportDialog({
  data,
  close,
}: LinkImportDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      icon: 'link'
    }
  });

  const onSubmit = (formData: Inputs) => {
    data.onLinkAdd(formData);
    close();
  };

  return (
    <div className="w-[80vw] max-w-md">
      <p className="font-secondary text-base text-gray-200 leading-[30px] mb-4">
        Add Link
      </p>

      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            label="URL"
            placeholder="Enter your link URL (e.g., https://example.com)"
            error={errors["url"]}
            {...register("url")}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={close}
          >
            Cancel
          </button>
          <button className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
} 