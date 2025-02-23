/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function IsOnboarding(Component: any) {
  return function IsMerchantId(props: any): React.JSX.Element | null {
    const { data: session, status } = useSession();

    const isOnboarded = session?.user?.onboardingStatus;

    useEffect(() => {
      if (isOnboarded === 'pending' && status === 'authenticated') {
        return redirect('/dashboard/onboarding');
      }
    }, [isOnboarded, status]);

    if (!isOnboarded) {
      return null;
    }

    return <Component {...props} />;
  };
}
