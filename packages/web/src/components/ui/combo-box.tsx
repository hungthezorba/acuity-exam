import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./input"
import { useState } from "react"

interface IOption {
  label: string
  value: string
}

interface IComboBoxProps {
  options: IOption[]
  onChange: (value: string) => void
}

export function Combobox({ options, onChange }: IComboBoxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const handleSelect = (option: IOption) => {
    setValue(option.value)
    onChange(option.value)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select a symbol"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div>
          <Input value={searchValue} onChange={event => setSearchValue(event.target.value)} />
          <div className="h-40 overflow-auto mt-2 p-1">
            {options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())).map(option => (
              <div key={option.value} className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm" onClick={() => handleSelect(option)}>
                <span className="text-sm">{ option.label }</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
