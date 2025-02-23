import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import AddCoverForm from './AddCoverForm';

const AddCoverModal = (): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        position='relative'
        top='-5px'
        ml='5px'
        isRound
        aria-label='agregar cubierta'
        size='base'
        colorScheme='teal'
        variant='elevated'
        icon={<AiFillPlusCircle size='20px' />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AddCoverForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCoverModal;
