import type { SpecItem } from "@/interfaces";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";


export default function UpdateTracking(props: { open: boolean, setOpen: (open: boolean) => void, items: SpecItem[], onUpdate: () => void }) {
  const [locationOptions, setLocationOptions] = useState<{ id: number, name: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ id: number, name: string }[]>([]);
  const [inputData, setInputData] = useState<{ shipsFrom: string, note: string, location: string, category: string }>({
    shipsFrom: "",
    note: "",
    location: "",
    category: ""
  });

  const fetchLocationOptions = async () => {
    const response = await fetch("api/location/all");
    const data = await response.json();
    setLocationOptions(data);
  };

  const fetchCategoryOptions = async () => {
    const response = await fetch("api/category/all");
    const data = await response.json();
    setCategoryOptions(data);
  };

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleSave = async () => {
    if (!inputData.category && !inputData.location && !inputData.note && !inputData.shipsFrom) {

    }
    const newData = props.items.map((item) => {
      const newItem: {
        id: number;
        locationId?: number;
        categoryId?: number;
        note?: string;
        shipsFrom?: string
      } = {
        id: item.id,
      };

      if (inputData.location) {
        newItem.locationId = parseInt(inputData.location);
      }

      if (inputData.category) {
        newItem.categoryId = parseInt(inputData.category);
      }

      if (inputData.note) {
        newItem.note = inputData.note;
      }

      if (inputData.shipsFrom) {
        newItem.shipsFrom = inputData.shipsFrom;
      }
      return newItem;
    })
    const response = await fetch("api/spec-item", {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PUT',
      body: JSON.stringify(newData)
    })

    if (response.ok) {
      toast.success("Items updated successfully");
      props.setOpen(false);
      props.onUpdate();
    } else {
      toast.error("Failed to update items");
    }
  };

  useEffect(() => {
    fetchCategoryOptions();
    fetchLocationOptions();
  }, []);

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
              <Select onValueChange={(value) => { setInputData({ ...inputData, location: value }) }}>
                <SelectTrigger className="border w-full text-left">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option: { id: number, name: string }) => (
                    <SelectItem value={option.id.toString()}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[48%] mb-8">
              <h2>Category</h2>
              <Select onValueChange={(value) => { setInputData({ ...inputData, category: value }) }}>
                <SelectTrigger className="border w-full text-left">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option: { id: number, name: string }) => (
                    <SelectItem value={option.id.toString()}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <h1>Ship From</h1>
              <Textarea onChange={(e) => { setInputData({ ...inputData, shipsFrom: e.target.value }) }} value={inputData.shipsFrom}></Textarea>
            </div>
            <div className="w-full">
              <h1>Notes for this item</h1>
              <Textarea onChange={(e) => { setInputData({ ...inputData, note: e.target.value }) }} value={inputData.note}></Textarea>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter className="flex flex-row">
          <Button onClick={handleCancel} className="rounded-none border-red-800 border-2 bg-white text-red-800">Cancel</Button>
          <Button onClick={handleSave} className="rounded-none border-red-800 border-2 bg-red-800 text-white">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}