'use client';
import { useState, useEffect } from 'react';
import { useCuttingSheetsPending } from './export/cuttingSheet/getExportsSentPending';
import { useExportsSentPending } from './export/export-sent/getExportsSentPending';
import { useExportsPending } from './export/getExportsPending';

interface MenuCounts {
  addSupplyShipment: number;
  producerPendingPayments: number;
  addCuttingSheet: number;
}

export function useMenuCounts(): {
  counts: MenuCounts;
  loading: boolean;
  error: any;
} {
  const {
    data: supplyData,
    isLoading: isSupplyLoading,
    error: supplyError,
  } = useExportsPending({ page: 1, limit: 1 });

  const {
    data: producerData,
    isLoading: isProducerLoading,
    error: producerError,
  } = useExportsSentPending({ page: 1, limit: 1 });

  const {
    data: cuttingData,
    isLoading: isCuttingLoading,
    error: cuttingError,
  } = useCuttingSheetsPending({ page: 1, limit: 1 });

  const [counts, setCounts] = useState<MenuCounts>({
    addSupplyShipment: 0,
    producerPendingPayments: 0,
    addCuttingSheet: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupplyLoading && !isProducerLoading && !isCuttingLoading) {
      setCounts({
        addSupplyShipment: supplyData?.length || 0,
        producerPendingPayments: producerData?.length || 0,
        addCuttingSheet: cuttingData?.length || 0,
      });
      setLoading(false);
    }
    if (supplyError || producerError || cuttingError) {
      setLoading(false);
    }
  }, [
    isSupplyLoading,
    isProducerLoading,
    isCuttingLoading,
    supplyData,
    producerData,
    cuttingData,
    supplyError,
    producerError,
    cuttingError,
  ]);

  return { counts, loading, error };
}
