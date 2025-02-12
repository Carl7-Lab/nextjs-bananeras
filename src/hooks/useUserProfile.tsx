import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from 'react-query';
import { BACKEND_URL } from '../lib/constants';

export interface UserProfile {
  userDetails: {
    name: string;
    email: string;
    onboardingStatus: string;
  };
  exporterDetails: {
    id?: number;
    businessName: string;
    businessId: string;
    email: string;
    address?: string;
    city?: string;
    accountStatus: string;
    updatedAt: string;
    logoUrl?: string;
  };
}

async function fetchExporter(refreshToken: string): Promise<UserProfile> {
  const response = await fetch(BACKEND_URL + '/auth/exporter/profile', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el perfil');
  }
  return response.json();
}

export function useExporter() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserProfile>(
    ['exporter', session?.refreshToken],
    () => {
      if (!session) throw new Error('No hay sesión activa');
      return fetchExporter(session.refreshToken);
    },
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      placeholderData: () =>
        queryClient.getQueryData(['exporter', session?.refreshToken]),
    }
  );

  return {
    user,
    isLoading,
    error,
    reloadExporter: () => queryClient.invalidateQueries(['exporter']),
  };
}
export type UseExporterReturn = ReturnType<typeof useExporter>;
