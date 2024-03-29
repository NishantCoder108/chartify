import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ISelectItems {
    selectItems: string[];
    handleValueChange: (data: string) => void;
}
export function AppSelect({ selectItems, handleValueChange }: ISelectItems) {
    return (
        <Select
            defaultValue={selectItems[0]}
            onValueChange={(data: string) => handleValueChange(data)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectItems[0]} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {selectItems.map((item, i) => (
                        <SelectItem key={item + i} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
