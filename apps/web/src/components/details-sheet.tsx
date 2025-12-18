import type { SpecItem } from "@/interfaces";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DatePicker } from "./ui/datepicker";
import { Textarea } from "./ui/textarea";
import { useMemo, useState } from "react";
import { toast } from "sonner";


export default function DetailsSheet(props: { open: boolean, setOpen: (open: boolean) => void, item: SpecItem, onUpdate: () => void }) {
  const [shippingNotes, setShippingNotes] = useState(props.item.shippingNotes);
  const deliveryDifference = useMemo(() => {
    return props.item.expectedDelivery && props.item.needBy ? Math.ceil((new Date(props.item.expectedDelivery).getTime() - new Date(props.item.needBy).getTime()) / (1000 * 60 * 60 * 24)) : undefined
  }, [props.item.expectedDelivery, props.item.needBy])

  const handleUpdate = async (key: string, value: any) => {
    const data = {
      id: props.item.id,
      [key]: value
    }

    const response = await fetch("api/spec-item", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify([data]),

    })

    if (response.ok) {
      toast.success("Item updated successfully")
      props.onUpdate();
    } else {
      toast.error("Failed to update item")
    }
  }

  return (
    <Sheet open={props.open && !!props.item} onOpenChange={props.setOpen}>
      <SheetContent className="w-[800px] sm:w-[800px] !max-w-[800px] bg-neutral-100 p-8 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Item  #{props.item.id} - {props.item?.name}</SheetTitle>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <div className="w-[30%] mb-8">
              <h2 className="text-gray-600 font-semibold">Spec#</h2>
              <h1 className="font-semibold">{props.item.specId}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Vendor</h2>
              <h1 className="font-semibold">{props.item.vendor.name}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Phase</h2>
              <h1 className="font-semibold">{props.item.spec?.title}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Ship To</h2>
              <h1 className="font-semibold">{props.item.shipsToAddress.name}</h1>
              <h1 className="text-gray-600 text-sm">{props.item.shipsToAddress.address}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Ship From</h2>
              <h1 className="font-semibold">{props.item.shipsFrom}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Notes for this item</h2>
              <h1 className="font-semibold">{props.item.note}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Location</h2>
              <h1 className="font-semibold">{props.item.location.name}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Category</h2>
              <h1 className="font-semibold">{props.item.category.name}</h1>
            </div>
            <div className="w-[30%]">
              <h2 className="text-gray-600 font-semibold">Upload</h2>
              <h1 className="font-semibold">{props.item.attachment_name}</h1>
            </div>
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-neutral-100">
                  <TableHead className="border border-gray-500">Description</TableHead>
                  <TableHead className="border border-gray-500">Price</TableHead>
                  <TableHead className="border border-gray-500">Markup</TableHead>
                  <TableHead className="border border-gray-500">Unit Price</TableHead>
                  <TableHead className="border border-gray-500">Qty</TableHead>
                  <TableHead className="border border-gray-500">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="border border-gray-500">{props.item.description}</TableCell>
                  <TableCell className="border border-gray-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+props.item.unitPrice)}</TableCell>
                  <TableCell className="border border-gray-500">{props.item.markupPercent}%</TableCell>
                  <TableCell className="border border-gray-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+props.item.unitPrice + props.item.unitPrice * (props.item.markupPercent / 100))}</TableCell>
                  <TableCell className="border border-gray-500">{new Intl.NumberFormat('en-US').format(props.item.quantity)}</TableCell>
                  <TableCell className="border border-gray-500">{props.item.unit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-between w-full">
              <div></div>
              <div>
                <p>Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.item.quantity * (+props.item.unitPrice + props.item.unitPrice * (props.item.markupPercent / 100)))}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Planning & Requirements </h1>
            <div className="w-[31%] mb-8">
              <h2>PO Approval Date</h2>
              <DatePicker date={props.item.poApprovalDate} onChange={(date) => { handleUpdate("poApprovalDate", date) }} />
            </div>
            <div className="w-[31%] mb-8">
              <h2>Hotel Need by Date</h2>
              <DatePicker date={props.item.needBy} onChange={(date) => { handleUpdate("needBy", date) }} />
            </div>
            <div className="w-[31%] mb-8">
              <h2>Expected Delivery</h2>
              <DatePicker date={props.item.expectedDelivery} onChange={(date) => { handleUpdate("expectedDelivery", date) }} />
            </div>
            <div className="w-full flex justify-between">
              <div></div>
              <div>
                {deliveryDifference && deliveryDifference > 0 ? <p className="text-red-800 font-semibold">Late by {deliveryDifference} days</p> : <p className="text-green-800 font-semibold">On Time</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Production & Shop </h1>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Send</h2>
              <DatePicker date={props.item.shopsSend} onChange={(date) => { handleUpdate("shopsSend", date) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Approved</h2>
              <DatePicker date={props.item.shopsApproved} onChange={(date) => { handleUpdate("shopsApproved", date) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>CFA/Shops Delivered</h2>
              <DatePicker date={props.item.shopsDelivered} onChange={(date) => { handleUpdate("shopsDelivered", date) }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 bg-white p-4 mt-4">
            <h1 className="w-full">Planning & Requirements </h1>
            <div className="w-[30%] mb-8">
              <h2>Ordered Date</h2>
              <DatePicker date={props.item.orderedDate} onChange={(date) => { handleUpdate("orderedDate", date) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Shipped Date</h2>
              <DatePicker date={props.item.shippedDate} onChange={(date) => { handleUpdate("shippedDate", date) }} />
            </div>
            <div className="w-[30%] mb-8">
              <h2>Delivered Date</h2>
              <DatePicker date={props.item.deliveredDate} onChange={(date) => { handleUpdate("deliveredDate", date) }} />
            </div>

            <div className="w-full">
              <h1>Shipping Notes</h1>
              <Textarea value={shippingNotes} onBlur={() => { handleUpdate('shippingNotes', shippingNotes) }} onChange={(e) => { setShippingNotes((_) => e.target.value) }}></Textarea>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}