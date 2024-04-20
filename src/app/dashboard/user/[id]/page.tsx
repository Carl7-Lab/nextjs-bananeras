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
  const response = await fetch(BACKEND_URL + `/auth/profile`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session?.refreshToken}`,
      'Content-Type': 'application/json',
    },
  });
  const user = await response.json();

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
