import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import {Badge} from "@heroui/badge";

interface Reward{
    img?: string;
    name?: string;
    amount?: string;
}

export const Reward = ({name,img="",amount}:Reward) => {
    return(
        <Badge color="danger" size="sm" classNames={{badge:'text-[2px]'}} content={amount}>
            <div className={`flex w-20 h-full ModalBackground flex-col rounded-sm flex-shrink-0 items-center justify-center`}>
                <Avatar alt="reward" src={img} size="sm"/>
                <div className={`*:text-[8px]`}>
                    <span>{name}</span>
                </div>
            </div>
        </Badge>
    )
}
