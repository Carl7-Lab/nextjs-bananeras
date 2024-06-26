import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import { FaBan } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  isDisabledRemove?: boolean;
  isBan?: {
    state: boolean;
    setBanState?: () => void;
    firstChange: boolean;
  };
  onClickRemove?: () => void;
}

const InputFieldText: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  isDisabledRemove,
  isBan,
  onClickRemove,
}) => {
  const [field, meta, helpers] = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (meta.error && meta.touched) {
      inputRef.current?.focus();
    }
  }, [meta.error, meta.touched]);

  useEffect(() => {
    if (!!isBan) {
      field.onChange;
      inputRef.current?.blur();
      if (isBan?.state) {
        field.value = 'N/A';
        helpers.setValue('N/A');
        if (isBan.firstChange) {
          helpers.setTouched(false);
        }
      } else {
        field.value = '';
        helpers.setValue(meta.initialValue);
        if (isBan.firstChange) {
          helpers.setTouched(true);
        }
      }
    }
  }, [isBan?.state]);

  const banClick = () => {
    console.log('banClick: ', label);
    if (isBan?.setBanState) {
      isBan.setBanState();
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          <Text display='flex' alignItems='center'>
            {label}{' '}
            {!!isBan && (
              <IconButton
                isRound={true}
                ml={'5px'}
                colorScheme={!!isBan.state ? 'orange' : 'gray'}
                aria-label='Ban'
                size={'base'}
                variant={'outline'}
                icon={<FaBan size={'20px'} />}
                onClick={banClick}
              />
            )}
          </Text>
        </FormLabel>
      )}
      <InputGroup>
        <Input
          {...field}
          ref={inputRef}
          isReadOnly={isBan?.state}
          placeholder={placeholder || label}
        />
        {onClickRemove && (
          <InputRightElement>
            <IconButton
              variant='solid'
              colorScheme='red'
              aria-label='Eliminar'
              fontSize='20px'
              icon={<TiDelete />}
              isDisabled={isDisabledRemove}
              onClick={onClickRemove}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldText;
