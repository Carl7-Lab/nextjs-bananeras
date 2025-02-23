/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  VStack,
  HStack,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useRef, useState } from 'react';
import { useImportBoxBrands } from '../../hooks/box-brand/uploadBoxBrands';
import axios from '../../lib/axios';

const ImportBoxBrandDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [field, meta, helpers] = useField('import-boxBrand');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const { importBoxBrands, isLoading } = useImportBoxBrands({
    config: {
      onSuccess: () => {
        toast({
          title: 'Importación exitosa',
          description: `Se importaron productores correctamente.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        resetFile();
        onClose();
      },
      onError: (error: any) => {
        toast({
          title: 'Error al importar',
          description: error.response?.data?.message || 'Error desconocido.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    },
  });

  const handleDownloadTemplate = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`/firebase/download/BoxBrandNuevo.xlsm`);

      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No se recibió una URL válida.');
      }
    } catch (error) {
      toast({
        title: 'Error al descargar la plantilla',
        description: 'No se pudo obtener el enlace de descarga.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (file: File): void => {
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);
      helpers.setValue(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      handleFileChange(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent): void => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const resetFile = (): void => {
    setFileName('');
    setFileSize(0);
    setSelectedFile(null);
    helpers.setValue(null);
  };

  const handleUpload = (): void => {
    if (selectedFile) importBoxBrands(selectedFile);
  };

  return (
    <Box>
      <Button py='8px' px='16px' colorScheme='teal' onClick={onOpen}>
        Importar Marcas
      </Button>

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Importar Marca de Caja</DrawerHeader>

          <DrawerBody>
            <Text mb={4} fontSize='sm' color='gray.600'>
              ¿Necesitas ayuda?{' '}
              <Link
                color='teal'
                onClick={handleDownloadTemplate}
                cursor='pointer'
              >
                Utiliza nuestra guía.
              </Link>
            </Text>
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
                    <Text fontWeight='bold' fontSize='lg'>
                      Archivo seleccionado
                    </Text>
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
                    onClick={resetFile}
                  >
                    Quitar
                  </Button>
                </HStack>
              </Box>
            ) : (
              <FormControl id='import-boxBrand' width='100%'>
                <Box
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  border='2px dashed'
                  borderColor={dragging ? 'teal.500' : 'gray.300'}
                  borderRadius='md'
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
                  <FormLabel>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Image
                        src={'/uploaded.png'}
                        alt='Subida de archivo'
                        maxH='200px'
                        my={2}
                        mx='auto'
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
              isDisabled={!selectedFile}
              onClick={handleUpload}
              isLoading={isLoading}
            >
              Subir
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ImportBoxBrandDrawer;
