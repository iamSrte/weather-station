import { Skeleton } from '@/components/ui/skeleton';

function CurrentWeatherSkeleton() {
  return (
    <div className="h-auto border rounded-md space-y-2 p-4">
      <div className="flex flex-row items-center space-x-2">
        <Skeleton className="size-9" />
        <Skeleton className="h-9 w-12" />
      </div>
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-6 w-30" />
      <div className="block overflow-hidden justify-between border-t space-y-1 mt-2 pt-2">
        <div className="flex flex-row items-center space-x-2">
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-22" />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-25" />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-23" />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherSkeleton;
