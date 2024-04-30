import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { BACKEND_URL } from '../../../../lib/constants';
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(BACKEND_URL + `/auth/merchant/profile`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session?.refreshToken}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('session: ', session);
  const user = await response.json();
  console.log('user: ', user);

  const isOnboarding = !!user.merchantId;

  if (!isOnboarding) {
    redirect('/dashboard/onboarding');
  }

  return (
    <div>
      <div>User Profile</div>

      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
