import { subMonths } from "date-fns";

export const defMilestoneArr = [
  {
    dueDate: "",
    showName: "Preparation",
    stageName: "Preparation",
  },
  {
    dueDate: "",
    showName: "Teaming",
    stageName: "Teaming",
  },
  {
    dueDate: "",
    showName: "Registration Deadline",
    stageName: "Project Submission",
  },
  {
    dueDate: "",
    showName: "Shortlisting",
    stageName: "Review",
  },
  {
    dueDate: "",
    showName: "Result",
    stageName: "Result",
  },
].map((ms, i) => ({
  ...ms,
  dueDate: subMonths(new Date(), -i).toISOString(),
}));
