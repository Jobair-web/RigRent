import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return <div className="space-y-4"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-64" /></div>;
}
