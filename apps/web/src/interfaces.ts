export interface Address {
  id: number;
  name: string;
  address: string;
}

export interface SpecItem {
  checked?: boolean;
  id: number;
  specId: number;
  locationId: number;
  categoryId: number;
  phaseId: number;
  vendorId: number;
  shipsToAddressId: string;
  name: string;
  description: string;
  basePrice: number;
  markupPercent: number;
  unitPrice: number;
  quantity: number;
  unit: string;
  poApprovalDate: Date;
  needBy: Date;
  expectedDelivery: Date;
  orderedDate: Date;
  shippedDate: Date;
  deliveredDate: Date;
  shipsFrom: string;
  shippingNotes: string;
  shopsSend: Date;
  shopsApproved: Date;
  shopsDelivered: Date;
  note: string;
  attachment_name: string;
  attachment_url: string;
  createdAt: Date;
  updatedAt: Date;
  spec?: {
    id: number;
    title: string;
  };

  location: {
    id: number;
    name: string;
  };

  category: {
    id: number;
    name: string;
  };

  phase: {
    id: number;
    name: string;
  };

  shipsToAddress: Address

  vendor: {
    id: number;
    name: string;
    address: Address
  }
}

