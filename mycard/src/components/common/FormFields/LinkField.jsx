
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSearch } from "frappe-react-sdk"

const frameworks = []
const LinkField = ({ value, onChange, doctype }) => {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('');

    const { data } = useSearch(doctype, searchValue)
    console.log("Link data", data)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
         { value ? value : `select ${doctype}`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search ..." className="h-9" value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>No {doctype} found.</CommandEmpty>
            <CommandGroup>
                {data?.message.length === 0 && <span className="py-6 text-center text-sm">No {doctype} found.</span>}
              {data?.message?.map((dataRes) => (
                <CommandItem
                  key={dataRes.value}
                  value={dataRes.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {dataRes.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === dataRes.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LinkField