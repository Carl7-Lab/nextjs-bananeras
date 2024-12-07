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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

const ImportProducerDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);

  const [field, meta, helpers] = useField('import-producer');
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setFileSize(file.size);
      console.log('file.size', file.size);

      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0].name);
      setLoading(true);
      helpers.setValue(event.target.files[0]);
      setFileName(event.target.files[0].name);
      setFileSize(event.target.files[0].size);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setLoading(false);
    }
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
            <Text mb={4}>Selecciona un archivo:</Text>
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
              >
                <Input
                  ref={fileInputRef}
                  id={field.name}
                  type='file'
                  accept='.csv'
                  display={'none'}
                  onChange={handleChange}
                />
                <FormLabel m={0} id={field.name}>
                  {loading ? (
                    <Spinner />
                  ) : fileName ? (
                    <>
                      {fileSize > 0 && (
                        <Flex mt={2} textAlign='left' gap={2} ml={'15px'}>
                          <Text>
                            archivo: {fileName} - {(fileSize / 1024).toFixed(2)}{' '}
                            KB
                          </Text>
                        </Flex>
                      )}
                    </>
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
              {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                  {meta.error}
                </FormErrorMessage>
              )}
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              py='8px'
              px='16px'
              colorScheme='teal'
              onClick={() => alert('File uploaded!')}
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
