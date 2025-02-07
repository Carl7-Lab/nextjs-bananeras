import {
  Box,
  VStack,
  Text,
  Divider,
  Badge,
  Flex,
  Button,
  Image,
} from '@chakra-ui/react';
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
  const response = await fetch(BACKEND_URL + `/auth/exporter/profile`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session?.refreshToken}`,
      'Content-Type': 'application/json',
    },
  });
  const user = await response.json();

  return (
    <VStack
      spacing={4}
      align='center'
      mx={'auto'}
      my={'auto'}
      p={8}
      boxShadow='md'
      borderRadius='lg'
      bg={'whiteAlpha.800'}
    >
      <Flex
        direction={'column'}
        justify='space-between'
        align='flex-center'
        gap={8}
      >
        <Box>
          <Text fontSize='2xl' fontWeight='bold'>
            Detalles de Usuario
          </Text>
          <Divider my={2} />
          <Text>
            <strong>Nombre:</strong> {user.userDetails.name}
          </Text>
          <Text>
            <strong>Correo:</strong> {user.userDetails.email}
          </Text>
          <Text>
            <strong>Estado:</strong>{' '}
            <Badge
              ml={2}
              colorScheme={
                user.userDetails.onboardingStatus === 'done' ? 'green' : 'red'
              }
            >
              {user.userDetails.onboardingStatus === 'done'
                ? 'En Línea'
                : 'Pendiente'}
            </Badge>
          </Text>
        </Box>

        <Box>
          <Text fontSize='2xl' fontWeight='bold'>
            Detalles de Exportadora
          </Text>
          <Divider my={2} />
          <Text>
            <strong>Nombre:</strong> {user.exporterDetails.businessName}
          </Text>
          <Text>
            <strong>ID:</strong> {user.exporterDetails.businessId}
          </Text>
          <Text>
            <strong>Correo:</strong> {user.exporterDetails.email}
          </Text>
          <Text>
            <strong>Dirección:</strong>{' '}
            {user.exporterDetails.address || 'No proporcionado'}{' '}
          </Text>
          <Text>
            <strong>Ciudad:</strong>{' '}
            {user.exporterDetails.city || 'No proporcionado'}{' '}
          </Text>
          <Text>
            <strong>Estado de Cuenta:</strong>
            <Badge
              ml={2}
              colorScheme={
                user.exporterDetails.accountStatus === 'active'
                  ? 'green'
                  : 'red'
              }
            >
              {user.exporterDetails.accountStatus === 'active'
                ? 'Activo'
                : 'Inactivo'}
            </Badge>
          </Text>
          <Text>
            <strong>Editado:</strong>{' '}
            {new Date(user.exporterDetails.updatedAt).toLocaleDateString()}
          </Text>
          {user.exporterDetails.logoUrl ? (
            <Image
              src={user.exporterDetails.logoUrl}
              alt='Logo de la Empresa'
              boxSize='100px'
              objectFit='cover'
              borderRadius='full'
              my={2}
              mx={'auto'}
            />
          ) : (
            <Text mt={4} fontStyle='italic'>
              Logo No Disponible
            </Text>
          )}
        </Box>
      </Flex>
    </VStack>
  );
};

export default ProfilePage;
