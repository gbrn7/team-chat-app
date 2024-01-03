import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  classname?: string;
}

export const UserAvatar = ({
  src,
  classname
}: UserAvatarProps) => {

  return (
    <Avatar className={cn(" md:h-10 md:-10 object-cover", classname)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}