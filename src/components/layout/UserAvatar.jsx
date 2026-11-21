import { cn, initials } from "@/lib/utils";

export default function UserAvatar({ user, className }) {
  return (
    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy font-bold text-white", className)}>
      {user?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      ) : initials(user?.name)}
    </span>
  );
}
