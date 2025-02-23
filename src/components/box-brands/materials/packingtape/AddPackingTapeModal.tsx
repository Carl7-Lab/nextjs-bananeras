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
import AddPackingTapeForm from './AddPackingTapeForm';

const AddPackingTapeModal = (): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        position='relative'
        top='-5px'
        ml='5px'
        isRound
        aria-label='agregar packingTape'
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
            <AddPackingTapeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPackingTapeModal;
