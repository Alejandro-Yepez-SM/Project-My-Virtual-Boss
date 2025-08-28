import { LoadingSpinner } from "./loadingSpinner";

interface ILoadingPageProps {
  className?: string;
}

export const PageLoading = ({ className }: ILoadingPageProps) => {
  return (
    <div
      className={`w-full h-[70vh] flex items-center justify-center ${
        className ?? ""
      }`}
    >
      <LoadingSpinner
        size={8}
        arcColor="fill-brand-200"
        ringColor="text-brand-500"
      />
    </div>
  );
};
