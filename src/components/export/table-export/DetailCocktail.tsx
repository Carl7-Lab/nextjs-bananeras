import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { InsecticideCocktailPart } from '../../../types/box-brand/additions/insecticideCocktailPart';
import { PesticideCocktailPart } from '../../../types/box-brand/post-harvest/pesticideCocktailPart';
import {
  InsecticideSentPartType,
  PesticideSentPartType,
} from '../../../types/exportSent';

interface Props {
  cocktailNeed: PesticideCocktailPart[] | InsecticideCocktailPart[];
  cocktailSent: PesticideSentPartType[] | InsecticideSentPartType[];
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}

interface TableSizeProps {
  sm: number | null;
  md: number | null;
}

interface CocktailProps {
  name: string;
  need: number;
  sent: number;
}

const DetailCocktail = ({
  cocktailNeed,
  cocktailSent,
  width,
  windowSize,
}: Props) => {
  const cocktail: CocktailProps[] = cocktailSent.map((item, index) => {
    const name: string =
      (item as PesticideSentPartType).pesticide.name ||
      (item as InsecticideSentPartType).insecticide.name ||
      '';

    const need: number =
      (cocktailNeed[index] as PesticideCocktailPart).quantity ||
      (cocktailNeed[index] as InsecticideCocktailPart).quantity ||
      0;

    const sent: number =
      (item as PesticideSentPartType).quantity ||
      (item as InsecticideSentPartType).quantity ||
      0;

    return { name, need, sent };
  });

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Necesario</Th>
              <Th>Enviado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cocktail.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.need}</Td>
                <Td>{item.sent}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DetailCocktail;
