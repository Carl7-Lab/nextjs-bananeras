import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  SingleValue,
  chakraComponents,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { usePagination } from '../../../../hooks/usePagination';
import { BottomType } from '../../../../types/box-brand/materials/bottom';
import { useBottoms } from '../../../../hooks/box-brand/materials/bottom/getBottoms';

interface BottomSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setBottom?: (band: Partial<BottomType>) => void;
  onChange?: (newValue: Partial<BottomType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<BottomType>,
  false,
  GroupBase<Partial<BottomType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
    h: 'auto',
  }),
  input: (provided) => ({
    ...provided,
    color: 'gray.900',
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  }),
};

const bandComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<BottomType>,
      false,
      GroupBase<Partial<BottomType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BottomSelectBase: React.FC<BottomSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setBottom,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } = useBottoms(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data } = response;
      const { statusCode, message, error: errorTitle, model, prop } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<BottomType>>) => {
    if (setBottom) setBottom(newValue as Partial<BottomType>);
    if (onChange) onChange(newValue as Partial<BottomType>);
  };

  return (
    <ChakraSelect
      {...field}
      name={name}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay fondo/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<BottomType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<BottomType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<BottomType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={bandComponents}
    />
  );
};

export default BottomSelectBase;
