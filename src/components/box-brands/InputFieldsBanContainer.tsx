import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldQuantity from '../ui/form/InputFieldQuantity';
import InputFieldText from '../ui/form/InputFieldText';

interface props {
  name1: string;
  label1: string;
  placeholder1?: string;
  name2: string;
  label2: string;
  placeholder2?: string;
  unit?: string;
}

const InputFieldsBanContainer: React.FC<props> = ({
  name1,
  label1,
  placeholder1,
  name2,
  label2,
  placeholder2,
  unit,
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
      <InputFieldText
        name={name1}
        label={label1}
        placeholder={placeholder1}
        isBan={{
          state: isBan,
          setBanState: setBanState,
          firstChange: firstChange,
        }}
      />
      <InputFieldQuantity
        name={name2}
        label={label2}
        isBan={{ state: isBan, firstChange: firstChange }}
        placeholder={placeholder2}
        unit={unit}
      />
    </Flex>
  );
};

export default InputFieldsBanContainer;
