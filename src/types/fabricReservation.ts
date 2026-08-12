// Fabric Reservation (reserva de tela para corte)

export interface FabricReservation {
  id: number;
  reservationDate: string;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  componentId?: number;
  componentCode?: string;
  lotId?: number;
  lotNumber?: string;
  reservedQuantity: number;
  uom?: string;
  releasedQuantity: number;
  remainingReservation: number;
  status?: string;
  reservedByUserId?: number;
  reservedByName?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  lastUpdated?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFabricReservationInput {
  reservationDate: string;
  fabricPOId: number;
  fgpoId: number;
  lotId?: number | null;
  reservedQuantity: number;
  releasedQuantity: number;
  status?: string;
  reservedByUserId?: number;
  approvedByUserId?: number;
  lastUpdated?: string;
  comments?: string;
}
