import type { SpecItem } from "@/interfaces";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { DatePicker } from "./ui/datepicker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface InputData {
  poApprovalDate: Date | undefined | null;
  needBy: Date | undefined | null;
  expectedDelivery: Date | undefined | null;
  shopsSend: Date | undefined | null;
  shopsApproved: Date | undefined | null;
  shopsDelivered: Date | undefined | null;
  deliveredDate: Date | undefined | null;
  shippedDate: Date | undefined | null;
  orderedDate: Date | undefined | null;
  shippingNotes: string | undefined;
}


export default function UpdateTracking(props: { open: boolean, setOpen: (open: boolean) => void, items: SpecItem[], onUpdate: () => void }) {
  const [inputData, setInputData] = useState<InputData>({
    poApprovalDate: undefined,
    needBy: undefined,
    expectedDelivery: undefined,
    shopsSend: undefined,
    shopsApproved: undefined,
    shopsDelivered: undefined,
    deliveredDate: undefined,
    shippedDate: undefined,
    orderedDate: undefined,
    shippingNotes: undefined
  });


  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleSave = async () => {

    const validInputData: any = {};

    console.log(inputData);

    for (let [key, value] of Object.entries(inputData)) {
      if (value !== undefined) {
        validInputData[key] = value;
      }
    }

    if (Object.keys(validInputData).length === 0) {
      toast.info("No data to update");
      return;
    }

    const newData = props.items.map((item) => {
      const newItem: {
        id: number;
        [key: string]: any
      } = {
        id: item.id,
      };

      for (let [key, value] of Object.entries(validInputData)) {
        newItem[key] = value;
      }

      return newItem;
    });

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

  return (
    <Sheet open={props.open && props.items.length > 0} onOpenChange={props.setOpen}>
      <SheetContent className="w-[800px] sm:w-[800px] !max-w-[800px] bg-neutral-100 p-8 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Update Tracking</SheetTitle>
          <p><span className="font-semibold">{props.items.length} items</span> will be updated</p>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Planning & Requirements </h1>
            <div className="w-[30%] mb-8">
              <h2>PO Approval Date</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, poApprovalDate: date }); }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Hotel Need by Date</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, needBy: date }); }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Expected Delivery</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, expectedDelivery: date }); }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Production & Shop </h1>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Send</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, shopsSend: date }); }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Approved</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, shopsApproved: date }); }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Delivered</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, shopsDelivered: date }) }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Planning & Requirements </h1>
            <div className="w-[30%] mb-8">
              <h2>Ordered Date</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, orderedDate: date }) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Shipped Date</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, shippedDate: date }) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Delivered Date</h2>
              <DatePicker onChange={(date) => { setInputData({ ...inputData, deliveredDate: date }) }} />
            </div>

            <div className="w-full">
              <h1>Shipping Notes</h1>
              <Textarea value={inputData.shippingNotes} onChange={(e) => { setInputData({ ...inputData, shippingNotes: e.target.value }) }}></Textarea>
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