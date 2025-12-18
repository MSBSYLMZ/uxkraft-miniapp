import DetailsSheet from "@/components/details-sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, FileStack, FolderDown, Search, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SpecItem } from "@/interfaces";
import type { CheckedState } from "@radix-ui/react-checkbox";
import UpdateTracking from "@/components/update-tracking-sheet";
import BulkEditSheet from "@/components/bulk-edit-sheet";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationData {
  currentPage: number,
  limit: number,
  totalPages: number,
  totalResults: number
}


export default function SpecItemsList() {
  const [data, setData] = useState<SpecItem[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>({ currentPage: 1, limit: 5, totalPages: 1, totalResults: 0 });
  const [detailsSheetData, setDetailsSheetData] = useState<{ open: boolean, item: SpecItem | null }>({
    open: false,
    item: null
  });
  const [updateTrackingSheetData, setUpdateTrackingSheetData] = useState<{ open: boolean, items: SpecItem[] }>({
    open: false,
    items: []
  });

  const [bulkEditSheetData, setBulkEditSheetData] = useState<{ open: boolean, items: SpecItem[] }>({
    open: false,
    items: []
  });

  const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState({
    orderBy: "",
    query: "",
    page: 1,
    limit: 5
  });

  const handleOpenDetailsSheet = (itemId: number) => {
    const findItem = data.find(item => item.id === itemId);
    if (!findItem) return;
    setDetailsSheetData({
      open: true,
      item: findItem
    });
  }

  const handleOpenBulkEditSheet = () => {
    setBulkEditSheetData({
      open: true,
      items: Array.from(checkedItemIds).map(id => data.find(item => item.id === id)!)
    });
  }

  const handleUpdateTrackingSheet = () => {
    setUpdateTrackingSheetData({
      open: true,
      items: Array.from(checkedItemIds).map(id => data.find(item => item.id === id)!)
    });
  }

  const handleCheckedChange = (checked: CheckedState, itemId: number) => {
    const findItem = data.find(item => item.id === itemId);
    if (!findItem) return;
    if (typeof checked === "boolean") {
      if (checked) {
        setCheckedItemIds(new Set([...checkedItemIds, itemId]));
      } else {
        setCheckedItemIds(new Set([...checkedItemIds].filter(id => id !== itemId)));
      }
    }
    setData(data.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item));
  }


  const changeCheckForAll = (checked: CheckedState) => {
    if (typeof checked === "boolean") {
      if (checked) {
        setData(data.map(item => ({ ...item, checked: true })));
        setCheckedItemIds(new Set(data.map(item => item.id)));
      } else {
        setData(data.map(item => ({ ...item, checked: false })));
        setCheckedItemIds(new Set([]));
      }
    }
  }

  const fetchData = async () => {
    const params = new URLSearchParams({ ...filters, page: String(filters.page), limit: String(filters.limit) });
    const response = await fetch('api/spec-item?' + params.toString());
    const parsed = await response.json();
    const { data, ...paginationData } = parsed;
    setPaginationData(paginationData);
    setData(data.map((item: SpecItem) => ({ ...item, checked: false })));
  }

  const pages = useMemo(() => {
    const minPage = Math.max(1, paginationData.currentPage - 1);
    const maxPage = Math.min(paginationData.totalPages, paginationData.currentPage + 2);
    return Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);
  }, [paginationData]);

  const handleOnUpdate = async () => {
    setCheckedItemIds(new Set([]));
    await fetchData();
  }


  useEffect(() => {
    fetchData();
  }, [filters]);

  if (!data) return null;

  return (
    <>

      <div className="bg-white p-8">
        <header className="flex space-between">
          <h1 className="text-3xl font-bold">Items</h1>
        </header>
        <div className="flex gap-4 justify-between">
          <InputGroup className="rounded-1 my-4 h-12 border-2 border-gray-300">
            <InputGroupInput value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} className="rounded-1 my-8" placeholder="Find by Item Name, Item # or Spec #" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={() => { setFilters({ ...filters, orderBy: filters.orderBy && filters.orderBy === 'phase' ? 'phase_desc' : 'phase' }) }} title="Phase" className="rounded-1 h-12 my-4 bg-white text-black border-2 border-gray-300">
            <p>Phase</p>
            <ChevronDown />
          </Button>
          <Button onClick={() => { setFilters({ ...filters, orderBy: filters.orderBy && filters.orderBy === 'vendor' ? 'vendor_desc' : 'vendor' }) }} title="Phase" className="rounded-1 h-12 my-4 bg-white text-black border-2 border-gray-300">
            <p>Vendor</p>
            <ChevronDown />
          </Button>

          <FolderDown className="my-4" size={50} />

        </div>

        {
          checkedItemIds.size > 0 ? (
            <div className="flex gap-4 justify-start align-center my-2">
              <p className="mt-1 font-semibold">{checkedItemIds.size} items selected</p>
              <Button onClick={handleOpenBulkEditSheet} title="Phase" className="border-none bg-white text-black">
                <FileStack />
                <p>Bulk Edit</p>
              </Button>
              <Button onClick={handleUpdateTrackingSheet} title="Phase" className="rounded-1 bg-white text-black">
                < FileStack />
                <p>Update Tracking</p>
              </Button>
              <Button title="Phase" className="rounded-1 bg-white text-black">
                < SquarePen />
                <p>Create PO</p>
              </Button>
              <Button title="Phase" className="rounded-1 bg-white text-black">
                < Trash2 color="red" />
                <p className="text-red-500">Delete</p>
              </Button>
            </div>
          ) : null
        }

        <Table className="border-2 border-gray-300 rounded-1">
          <TableHeader className="bg-stone-100 border-slate-400">
            <TableRow>
              <TableHead className="text-left border pr-2!"><Checkbox className="border-gray-600" onCheckedChange={changeCheckForAll} /></TableHead>
              <TableHead className="border">Item #</TableHead>
              <TableHead className="border">Spec #</TableHead>
              <TableHead className="border">Item Name</TableHead>
              <TableHead className="border">Vendor</TableHead>
              <TableHead className="border">Ship To</TableHead>
              <TableHead className="border">Qty</TableHead>
              <TableHead className="border">Phase</TableHead>
              <TableHead className="border">Price</TableHead>
              <TableHead className="border">Ship Notes</TableHead>
              <TableHead className="border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-left border"><Checkbox className="border-gray-600" checked={item.checked} onCheckedChange={(checked: CheckedState) => { handleCheckedChange(checked, item.id) }} /></TableCell>
                <TableCell className="text-left border">{item.id}</TableCell>
                <TableCell className="text-left border">{item.spec?.title}</TableCell>
                <TableCell onClick={() => { handleOpenDetailsSheet(item.id) }} className="text-left border text-red-800 cursor-pointer">{item.name}</TableCell>
                <TableCell className="text-left border">{item.vendor.name}</TableCell>
                <TableCell className="text-left border">{item.shipsToAddress.name}</TableCell>
                <TableCell className="text-left border">{new Intl.NumberFormat('en-US').format(Number(item.quantity))}</TableCell>
                <TableCell className="text-left border">
                  {/* <div className="bg-black"> */}
                  <p className="bg-gray-300 text-center w-8">{item.phase.name}</p>
                  {/* </div> */}
                </TableCell>
                <TableCell className="text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(((+item.unitPrice + (item.unitPrice * item.markupPercent / 100)) * item.quantity))}</TableCell>
                <TableCell className="text-left border">{item.shippingNotes}</TableCell>
                <TableCell className="text-left border font-semibold cursor-pointer">Edit </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-4 justify-between mt-4 w-full">
          <div className="flex gap-4 justify-between">
            <p className="w-28">Rows per page</p>
            <Select defaultValue="5" onValueChange={(value) => { setFilters({ ...filters, limit: +value, page: 1 }) }}>
              <SelectTrigger className="w-24 border-gray-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>

              </SelectContent>
            </Select>
          </div>
          <Pagination className="justify-end! gap-4">
            <p className="mt-1.5"> {paginationData.limit * (paginationData.currentPage - 1) + 1} - {Math.min(paginationData.currentPage * paginationData.limit, paginationData.totalResults)} of {paginationData.totalResults}</p>
            <PaginationContent>
              {
                paginationData.currentPage === 1 ? null :

                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => { setFilters({ ...filters, page: paginationData.currentPage - 1 }) }} />
                  </PaginationItem>
              }
              {
                pages.map((page) => (
                  <PaginationItem>
                    <PaginationLink onClick={() => { setFilters({ ...filters, page: page }) }} isActive={page === paginationData.currentPage}>{page}</PaginationLink>
                  </PaginationItem>
                ))
              }
              {
                paginationData.totalPages === paginationData.currentPage ? null :
                  <PaginationItem>
                    <PaginationNext href="#" onClick={() => { setFilters({ ...filters, page: paginationData.currentPage + 1 }) }} />
                  </PaginationItem>
              }
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {
        detailsSheetData.item ?
          <DetailsSheet open={detailsSheetData.open} item={detailsSheetData.item} setOpen={(open: boolean) => { if (!open) { setDetailsSheetData({ open: false, item: null }) } }} onUpdate={handleOnUpdate} />
          : updateTrackingSheetData.items && updateTrackingSheetData.items.length > 0 ?
            <UpdateTracking open={updateTrackingSheetData.open} setOpen={(open: boolean) => { if (!open) { setUpdateTrackingSheetData({ open: false, items: [] }) } }} items={updateTrackingSheetData.items} onUpdate={handleOnUpdate} />
            : bulkEditSheetData.items && bulkEditSheetData.items.length > 0 ?
              <BulkEditSheet open={bulkEditSheetData.open} setOpen={(open: boolean) => { if (!open) { setBulkEditSheetData({ open: false, items: [] }) } }} items={bulkEditSheetData.items} onUpdate={handleOnUpdate} />
              : null
      }
    </>
  )
}
