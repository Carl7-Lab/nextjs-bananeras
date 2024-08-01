import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import TableBoxBrandDetail from './TableBoxBrandDetail';
import { InsecticideCocktailPart } from '../../../types/box-brand/additions/insecticideCocktailPart';
import { BoxBrandType } from '../../../types/box-brand/boxBrand';
import { PesticideCocktailPart } from '../../../types/box-brand/post-harvest/pesticideCocktailPart';
import { RequiredCertificateType } from '../../../types/box-brand/specifications/requiredCertificate';

const DetailBoxBrand = ({
  detail,
  width,
  windowSize,
}: {
  detail: Partial<BoxBrandType>;
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const convertObjectToArray = (inputObject: Partial<BoxBrandType>) => {
    const outputArray: any[] = [];

    (Object.keys(inputObject) as (keyof BoxBrandType)[]).forEach((key) => {
      const quantityKey = `${key}Quantity` as keyof BoxBrandType;

      if (
        key !== 'brand' &&
        !key.toString().endsWith('Quantity') &&
        quantityKey in inputObject
      ) {
        if (typeof inputObject[key] === 'object' && inputObject[key] !== null) {
          outputArray.push({
            ['name']: (inputObject[key] as any).name,
            ['quantity']: inputObject[quantityKey],
            ['object']: inputObject[key],
          });
        } else if (inputObject[key] !== null && inputObject[key] !== 'N/A') {
          outputArray.push({
            ['name']: inputObject[key],
            ['quantity']: inputObject[quantityKey],
          });
        }
      } else if (
        key !== 'brand' &&
        typeof inputObject[key] === 'object' &&
        Array.isArray(inputObject[key])
      ) {
        const arrayValue:
          | RequiredCertificateType[]
          | PesticideCocktailPart[]
          | InsecticideCocktailPart[]
          | any[]
          | any = inputObject[key];

        if (
          Array.isArray(inputObject[key]) &&
          arrayValue.every(
            (item: RequiredCertificateType) =>
              item.id !== undefined && item.name !== undefined
          )
        ) {
          outputArray.push({
            ['name']: 'Certificados',
            ['quantity']: 1,
            ['array']: inputObject[key],
          });
        }

        if (
          Array.isArray(inputObject[key]) &&
          arrayValue.every(
            (item: PesticideCocktailPart) =>
              item.id !== undefined &&
              item.quantity !== undefined &&
              item.pesticide !== undefined
          )
        ) {
          outputArray.push({
            ['name']: 'Cóctel de Pesticidas',
            ['quantity']: 1,
            ['array']: inputObject[key],
          });
        }

        if (
          Array.isArray(inputObject[key]) &&
          arrayValue.every(
            (item: InsecticideCocktailPart) =>
              item.id !== undefined &&
              item.quantity !== undefined &&
              item.insecticide !== undefined
          )
        ) {
          outputArray.push({
            ['name']: 'Cóctel de Insecticidas',
            ['quantity']: 1,
            ['array']: inputObject[key],
          });
        }
      }
    });

    return outputArray;
  };

  const outputArray = convertObjectToArray(detail);

  return (
    <Box p={'16px'} width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
      <VStack spacing={4} pl={'60px'} alignItems={'start'} width={'100%'}>
        <TableBoxBrandDetail
          details={outputArray}
          width={width}
          windowSize={windowSize}
        />
      </VStack>
    </Box>
  );
};

export default DetailBoxBrand;
