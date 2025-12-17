import type { SpecItem } from "@/interfaces";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export default function UpdateTracking(props: { open: boolean, setOpen: (open: boolean) => void, items: SpecItem[] }) {
  const [locationOptions, setLocationOptions] = useState<string[]>([
    "Bedroom",
    "Bathroom",
    "Kitchen",
    "Guestroom",
  ]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([
    "Drawings",
    "Floor Plans",
    "Elevations",
    "Other",
  ]);
  const [inputData, setInputData] = useState<{ shipFrom: string, note: string }>({
    shipFrom: "",
    note: "",
  });

  return (
    <Sheet open={props.open && props.items.length > 0} onOpenChange={props.setOpen}>
      <SheetContent className="w-[800px] sm:w-[800px] !max-w-[800px] bg-neutral-100 p-8 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Bulk Edit</SheetTitle>
          <p><span className="font-semibold">{props.items.length} items</span> will be updated</p>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Item Details </h1>
            <div className="w-[48%] mb-8">
              <h2>Location</h2>
              <Select>
                <SelectTrigger className="border w-full text-left">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem value="option">{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[48%] mb-8">
              <h2>Category</h2>
              <Select>
                <SelectTrigger className="border w-full text-left">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem value="option">{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <h1>Ship From</h1>
              <Textarea value={inputData.shipFrom}></Textarea>
            </div>
            <div className="w-full">
              <h1>Notes for this item</h1>
              <Textarea value={inputData.note}></Textarea>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter className="flex flex-row">
          <Button className="rounded-none border-red-800 border-2 bg-white text-red-800">Cancel</Button>
          <Button className="rounded-none border-red-800 border-2 bg-red-800 text-white">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}