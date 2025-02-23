/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldBottomSelect from './InputFieldBottomSelect';
import InputFieldQuantity from '../../../ui/form/InputFieldQuantity';

interface props {
  name1: string;
  label1: string;
  placeholder1: string;
  name2: string;
  label2: string;
  placeholder2?: string;
  unit?: string;
  quantity?: number | '';
}

const BottomSelectBanContanier: React.FC<props> = ({
  name1,
  label1,
  placeholder1,
  name2,
  label2,
  placeholder2,
  unit,
  quantity,
}) => {
  const [isBan, setIsBan] = useState(false);
  const [firstChange, setFirstChange] = useState(false);

  useEffect(() => {
    if (isBan && !firstChange) {
      setFirstChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBan]);

  const setBanState = (): void => {
    setIsBan((prevState) => !prevState);
  };

  return (
    <Flex gap={2} alignItems={'flex-end'}>
      <InputFieldBottomSelect
        name={name1}
        label={label1}
        placeholder={placeholder1}
        // isBan={{
        //   state: isBan,
        //   setBanState: setBanState,
        //   firstChange: firstChange,
        // }}
      />
      <InputFieldQuantity
        name={name2}
        label={label2}
        placeholder={placeholder2}
        isBan={{ state: isBan, firstChange: firstChange }}
        quantity={quantity}
        unit={unit}
      />
    </Flex>
  );
};

export default BottomSelectBanContanier;
