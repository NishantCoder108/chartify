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
            <div className="bg-white">
                <SelectTrigger className="w-[180px] cursor-pointer text-xs">
                    <SelectValue
                        placeholder={selectItems[0]}
                        className="cursor-pointer text-xs"
                    />
                </SelectTrigger>
                <SelectContent className="bg-white ">
                    <SelectGroup className="cursor-pointer">
                        {selectItems.map((item, i) => (
                            <SelectItem
                                key={item + i}
                                value={item}
                                className="cursor-pointer text-xs hover:bg-slate-200"
                            >
                                {item.toUpperCase()}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </div>
        </Select>
    );
}
