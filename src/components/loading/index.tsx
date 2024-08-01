import { Loading } from "./loading";

interface LoadingContainerProps {
  loading: boolean;
}
export function LoadingContainer({ loading }: LoadingContainerProps) {
  return loading ? <Loading /> : null;
}
