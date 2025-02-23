import { FormLabel, Grid, GridItem } from '@chakra-ui/react';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import InputFieldQuantity from '../../ui/form/InputFieldQuantity';

interface Props {
  nameWeek: string;
  nameBoxes: string;
  boxQuantity: number;
  dateSelected: Date;
  startDate: Date;
}

const DateGrid = ({
  nameWeek,
  nameBoxes,
  boxQuantity,
  dateSelected,
  startDate,
  // daysOfWeek,
}: Props): React.JSX.Element => {
  const daysOfWeek = Array.from({ length: 7 }).map((_, i) =>
    addDays(startDate, i)
  );

  const [, , helpersWeek] = useField(nameWeek);

  useEffect(() => {
    if (!!dateSelected) {
      helpersWeek.setValue(
        daysOfWeek.map((date) => format(date, 'EEEE/dd', { locale: es }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameWeek]);

  return (
    <>
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(27, 1fr)'
        gap={0}
      >
        <GridItem colSpan={4} rowSpan={2}>
          <FormLabel fontSize='sm' m='0px'>
            Dias de corte:
          </FormLabel>
          <FormLabel fontSize='sm' m='0px'>
            Volumen de cajas:
          </FormLabel>
        </GridItem>
        {daysOfWeek.map((date, index) => {
          return (
            <GridItem colSpan={3} rowSpan={2} key={index}>
              <FormLabel
                fontSize='sm'
                m='0px'
                borderWidth={'0.5px'}
                textAlign={'center'}
                bg={'yellow.200'}
              >
                {format(date, 'EEEE/dd', { locale: es })}
              </FormLabel>
              <InputFieldQuantity name={`${nameBoxes}[${index}]`} size={'xs'} />
            </GridItem>
          );
        })}
        <GridItem colSpan={2} rowSpan={2}>
          <FormLabel fontSize='sm' m='0px' textAlign={'right'}>
            Total
          </FormLabel>
          <FormLabel
            fontSize='sm'
            m='0px'
            h={'23px'}
            textAlign={'right'}
            alignItems={'center'}
          >
            {boxQuantity}
          </FormLabel>
        </GridItem>
      </Grid>
    </>
  );
};

export default DateGrid;
