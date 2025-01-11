import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import { FaBan } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

interface InputFieldProps {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  isDisabledRemove?: boolean;
  isReadOnly?: boolean;
  flexDirection?: 'column' | 'row';
  alignItems?: 'flex-start' | 'flex-end';
  isBan?: {
    state: boolean;
    setBanState?: () => void;
    firstChange?: boolean;
  };
  onClickRemove?: () => void;
}

const InputFieldText: React.FC<InputFieldProps> = ({
  name,
  label,
  defaultValue,
  placeholder,
  isDisabledRemove,
  isReadOnly,
  flexDirection = 'column',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBan?.state]);

  useEffect(() => {
    if (!!defaultValue) {
      helpers.setValue(defaultValue);
      field.value = defaultValue;
    } else {
      helpers.setValue('');
      field.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const banClick = () => {
    if (isBan?.setBanState) {
      isBan.setBanState();
    }
  };

  return (
    <FormControl
      id={name}
      isInvalid={!!meta.error && meta.touched}
      width={'100%'}
    >
      <Flex
        flexDirection={flexDirection}
        alignItems={flexDirection === 'row' ? 'center' : 'flex-start'}
      >
        {label && (
          <Flex
            flex={flexDirection === 'row' ? '1' : 'none'}
            minWidth={flexDirection === 'row' ? '15%' : '100%'}
            maxWidth={flexDirection === 'row' ? '25%' : '100%'}
            alignItems='center'
            marginRight={flexDirection === 'row' ? '2%' : '0'}
          >
            <FormLabel
              fontSize='sm'
              m={0}
              mb={flexDirection === 'column' ? '8px' : '0'}
              textAlign={flexDirection === 'row' ? 'left' : 'center'}
              overflow='hidden'
            >
              <Text display='flex' alignItems='center'>
                {label}{' '}
                {!!isBan && (
                  <IconButton
                    isRound={true}
                    ml={'5px'}
                    colorScheme={!!isBan.state ? 'orange' : 'gray'}
                    aria-label='Ban'
                    size='sm'
                    variant='outline'
                    icon={<FaBan size='16px' />}
                    onClick={banClick}
                  />
                )}
              </Text>
            </FormLabel>
          </Flex>
        )}
        <Flex
          flex={label ? '2' : '1'}
          width='100%'
          marginLeft={label ? '0' : '0'}
        >
          {' '}
          <InputGroup>
            <Input
              {...field}
              ref={inputRef}
              isReadOnly={isBan?.state || isReadOnly}
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
        </Flex>
      </Flex>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldText;
