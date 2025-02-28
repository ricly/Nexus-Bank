import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-[50vh]">
      <div className="max-w-2xl mx-auto grid place-items-center h-full">
        <Loader className="size-5 animate-spin" />
      </div>
    </div>
  );
};

export default LoadingPage;
