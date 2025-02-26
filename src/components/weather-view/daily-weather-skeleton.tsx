import { Skeleton } from '@/components/ui/skeleton';

function DailyWeatherSkeleton() {
  return (
    <div className="flex flex-row border-b items-center justify-between space-x-4 h-20 p-4 mx-2">
      <div className="block space-y-1">
        <Skeleton className="h-6 w-12 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
      <div className="flex flex-row space-x-2 items-baseline">
        <Skeleton className="size-8" />
        <Skeleton className="size-7" />
        <Skeleton className="size-6" />
      </div>
      <div className="flex flex-row items-center space-x-1">
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-5" />
      </div>
    </div>
  );
}

export default DailyWeatherSkeleton;
