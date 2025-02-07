import { useEffect, useState } from 'react';
import { useCuttingSheetsPending } from './export/cuttingSheet/getExportsSentPending';
import { useExportsSentPending } from './export/export-sent/getExportsSentPending';
import { useExportsPending } from './export/getExportsPending';

interface NotificationItem {
  message: string;
  href: string;
}

export function useNotifications() {
  const { data: cuttingSheets, isLoading: isLoadingCuttingSheets } =
    useCuttingSheetsPending({ page: 1, limit: 10 });
  const { data: supplies, isLoading: isLoadingSupplies } = useExportsPending({
    page: 1,
    limit: 10,
  });
  const { data: payments, isLoading: isLoadingPayments } =
    useExportsSentPending({ page: 1, limit: 10 });

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const isLoading =
    isLoadingCuttingSheets || isLoadingSupplies || isLoadingPayments;

  useEffect(() => {
    const newNotifications = [];
    if (cuttingSheets?.length > 0) {
      newNotifications.push(
        ...cuttingSheets.map((sheet: any) => ({
          message: `Hoja de corte pendiente con ID ${sheet.id}`,
          href: `/dashboard/export/add-cutting-sheet/${sheet.id}`,
        }))
      );
    }
    if (supplies?.length > 0) {
      newNotifications.push(
        ...supplies.map((supply: any) => ({
          message: `Envío de insumos pendiente con ID ${supply.id}`,
          href: `/dashboard/liquidation/add-supply-shipment/${supply.id}`,
        }))
      );
    }
    if (payments?.length > 0) {
      newNotifications.push(
        ...payments.map((payment: any) => ({
          message: `Pago pendiente al productor con ID ${payment.id}`,
          href: `/dashboard/liquidation/producer-pending-payments/${payment.id}`,
        }))
      );
    }

    setNotifications(newNotifications);
  }, [cuttingSheets, supplies, payments]);

  return { notifications, isLoading };
}
