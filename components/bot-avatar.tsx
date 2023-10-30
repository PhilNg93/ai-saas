import { Avatar } from "./ui/avatar"
import { AvatarImage } from "./ui/avatar"
export const BotAvatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/logo.png" />
        </Avatar>
    )
}