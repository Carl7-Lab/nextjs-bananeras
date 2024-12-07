// import { CheckCircleIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Spinner,
  Image,
  Flex,
  Icon,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

const ImportProducerDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [field, meta, helpers] = useField('import-producer');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!field.value) {
      setLoading(false);
      setDragging(false);
    }
  }, [field.value]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setLoading(true);
      helpers.setValue(file);
      setFileName(file.name);
      setFileSize(file.size); // Set file size in bytes
      setLoading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      handleFileChange(file);
    }
  };

  const resetFile = () => {
    setFileName('');
    setFileSize(0);
    helpers.setValue(null);
  };

  return (
    <Box>
      <Button py='8px' px='16px' colorScheme='teal' onClick={onOpen}>
        Importar
      </Button>

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Importar Productor</DrawerHeader>

          <DrawerBody>
            {fileName ? (
              <Box
                border='1px solid'
                borderColor='gray.200'
                borderRadius='md'
                p={4}
                bg='teal.50'
                shadow='md'
              >
                <HStack justify='space-between'>
                  <VStack align='start' spacing={1}>
                    <HStack>
                      {/* <CheckCircleIcon color='green.500' /> */}
                      <Text fontWeight='bold' fontSize='lg'>
                        Archivo subido con éxito
                      </Text>
                    </HStack>
                    <Text fontSize='sm' color='gray.600'>
                      Nombre: <b>{fileName}</b>
                    </Text>
                    <Text fontSize='sm' color='gray.600'>
                      Tamaño: <b>{(fileSize / 1024).toFixed(2)} KB</b>
                    </Text>
                  </VStack>
                  <Button
                    size='sm'
                    colorScheme='red'
                    variant='outline'
                    /* leftIcon={<CloseIcon />} */
                    onClick={resetFile}
                  >
                    Quitar
                  </Button>
                </HStack>
              </Box>
            ) : (
              <FormControl id={'import-producer'} width={'100%'}>
                <Box
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  border='2px dashed'
                  borderColor={dragging ? 'teal.500' : 'gray.300'}
                  borderRadius='md'
                  p={0}
                  m={0}
                  textAlign='center'
                  bg={dragging ? 'teal.50' : 'white'}
                  cursor='pointer'
                >
                  <Input
                    ref={fileInputRef}
                    id={field.name}
                    type='file'
                    accept='.csv'
                    display='none'
                    onChange={handleChange}
                  />
                  <FormLabel m={0} id={field.name}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Image
                        src={'/uploaded.png'}
                        alt='imagen de subida'
                        maxH='200px'
                        my={2}
                        mx={'auto'}
                      />
                    )}
                    <Text p={4} color={dragging ? 'teal.500' : 'gray.300'}>
                      {dragging
                        ? 'Suelta aquí...'
                        : 'Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno'}
                    </Text>
                  </FormLabel>
                </Box>
              </FormControl>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              py='8px'
              px='16px'
              colorScheme='teal'
              onClick={() => alert('Archivo procesado exitosamente.')}
              isDisabled={!fileName}
            >
              Subir
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ImportProducerDrawer;
