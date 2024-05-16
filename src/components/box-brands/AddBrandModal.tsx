import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import AddBrandForm from '../settings/AddBrandForm';

const AddBrandModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        position={'relative'}
        top={'-5px'}
        ml={'5px'}
        isRound={true}
        aria-label={'agregar marca'}
        size={'base'}
        colorScheme='teal'
        variant={'elevated'}
        icon={<AiFillPlusCircle size={'20px'} />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AddBrandForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBrandModal;
