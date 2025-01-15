import { useState } from "react";
import { Input } from "@/components/form/control";
import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialogs } from "../store";
import { useImportGithubProject } from "@/services/leaderboard.query";

const schema = z.object({
  repoUrl: z.string()
    .url("Please enter a valid URL")
    .regex(/^https:\/\/github\.com\/[^/]+\/[^/]+$/, "Invalid GitHub repository URL format")
});

type Inputs = z.infer<typeof schema>;

interface BuilderboardImportDialogProps {
  data: Dialogs["builderboard_import"];
  close: () => void;
}

export default function BuilderboardImportDialog({
  close,
}: BuilderboardImportDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const importMutation = useImportGithubProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      await importMutation.mutateAsync(formData.repoUrl);
      addToast({
        type: "success",
        title: "Success",
        description: "Project has been queued for import",
      });
      close();
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to import project. Please try again.",
      });
    } finally {
      dismissLoading();
    }
  };

  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <h2 className="heading-6 mb-6 text-center">Upload Github Link</h2>
      
      <div className="flex justify-center mb-6">
        <img src="/icons/github.svg" alt="GitHub" className="w-16 h-16" />
      </div>

      <p className="text-center text-gray-200 mb-6">
        Information about verified projects and developers will be displayed on the Builderboard.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="GitHub Repository URL"
          placeholder="example: https://github.com/owner/repo"
          error={errors["repoUrl"]}
          {...register("repoUrl")}
        />

        <div className="flex justify-end mt-6">
          <button 
            type="button" 
            className="btn btn-secondary mr-2" 
            onClick={close}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
} 