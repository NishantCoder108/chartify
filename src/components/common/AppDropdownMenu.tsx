import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
    dropdownItem: string[];
}
export function AppDropdownMenu({ dropdownItem }: IProps) {
    const [position, setPosition] = React.useState(dropdownItem[0]);

    return (
        <DropdownMenu>
            <div className="w-52">
                <DropdownMenuTrigger asChild>
                    <Button>{position}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 ">
                    {/* <DropdownMenuLabel> Position</DropdownMenuLabel> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                    >
                        {dropdownItem?.map((item, i) => (
                            <DropdownMenuRadioItem key={item + i} value={item}>
                                {item}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    );
}
