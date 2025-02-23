import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import { FaBan } from 'react-icons/fa';
import AddLidModal from './AddLidModal';
import LidSelectBase from './LidSelectBase';

interface InputFieldLidSelectProps {
  name: string;
  label: string;
  placeholder: string;
  isBan?: {
    state: boolean;
    setBanState?: () => void;
    firstChange?: boolean;
  };
}

const InputFieldLidSelect: React.FC<InputFieldLidSelectProps> = ({
  name,
  label,
  placeholder,
  isBan,
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (isBan) {
      if (isBan.state) {
        helpers.setValue(undefined);
        if (isBan.firstChange) {
          helpers.setTouched(false);
        }
      } else {
        helpers.setValue(meta.initialValue);
        if (isBan.firstChange) {
          helpers.setTouched(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBan?.state]);

  const banClick = (): void => {
    if (isBan?.setBanState) {
      isBan.setBanState();
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h='21px'>
        {label} <AddLidModal />
        {isBan && (
          <IconButton
            position='relative'
            top='-5px'
            isRound={true}
            ml='5px'
            colorScheme={isBan.state ? 'orange' : 'gray'}
            aria-label='Ban'
            size='base'
            variant='outline'
            icon={<FaBan size='20px' />}
            onClick={banClick}
          />
        )}
      </FormLabel>

      <LidSelectBase
        name={name}
        placeholder={placeholder}
        isReadOnly={isBan?.state}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldLidSelect;
