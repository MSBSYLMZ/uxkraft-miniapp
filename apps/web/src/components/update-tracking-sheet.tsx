import type { SpecItem } from "@/interfaces";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DatePicker } from "./ui/datepicker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";


export default function UpdateTracking(props: { open: boolean, setOpen: (open: boolean) => void, items: SpecItem[] }) {
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
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Hotel Need by Date</h2>
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Expected Delivery</h2>
              <DatePicker onChange={() => { }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Production & Shop </h1>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Send</h2>
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Approved</h2>
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Delivered</h2>
              <DatePicker onChange={() => { }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Planning & Requirements </h1>
            <div className="w-[30%] mb-8">
              <h2>Ordered Date</h2>
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Shipped Date</h2>
              <DatePicker onChange={() => { }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Delivered Date</h2>
              <DatePicker onChange={() => { }} />
            </div>

            <div className="w-full">
              <h1>Shipping Notes</h1>
              <Textarea value={""}></Textarea>
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