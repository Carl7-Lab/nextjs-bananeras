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
import { usePagination } from '@/hooks/usePagination';
import { PalletType } from '@/types/box-brand/materials/pallet';
import { usePallets } from '@/hooks/box-brand/materials/pallet/getPallets';

interface PalletSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setPallet?: (pallet: Partial<PalletType>) => void;
  onChange?: (newValue: Partial<PalletType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<PalletType>,
  false,
  GroupBase<Partial<PalletType>>
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

const palletComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<PalletType>,
      false,
      GroupBase<Partial<PalletType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const PalletSelectBase: React.FC<PalletSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setPallet,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = usePallets(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const { response } = error as any;
      if (response?.data?.statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<PalletType>>) => {
    if (setPallet) setPallet(newValue as Partial<PalletType>);
    if (onChange) onChange(newValue as Partial<PalletType>);
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
        error
          ? (error as any).response.data.message
          : 'Ya no hay pallet/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<PalletType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<PalletType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<PalletType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={palletComponents}
    />
  );
};

export default PalletSelectBase;
