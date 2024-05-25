import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  SingleValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useStrippings } from '../../../../hooks/box-brand/container/stripping/getStrippings';
import { usePagination } from '../../../../hooks/usePagination';
import { StrippingType } from '../../../../types/box-brand/container/stripping';

interface StrippingSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setStripping?: (stripping: Partial<StrippingType>) => void;
  onChange?: (newValue: Partial<StrippingType>) => void;
}

// const data: Partial<StrippingType>[] = [
//   {
//     id: 1,
//     name: 'Zuncho1',
//     weightPerPack: 20,
//     color: 'Color1',
//   },
//   {
//     id: 2,
//     name: 'Zuncho2',
//     weightPerPack: 40,
//     color: 'Color2',
//   },
//   {
//     id: 3,
//     name: 'Zuncho3',
//     weightPerPack: 60,
//     color: 'Color3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<StrippingType>,
  false,
  GroupBase<Partial<StrippingType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
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

const strippingComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<StrippingType>,
      false,
      GroupBase<Partial<StrippingType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const StrippingSelectBase: React.FC<StrippingSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setStripping,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useStrippings(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<StrippingType>>) => {
    if (setStripping) setStripping(newValue as Partial<StrippingType>);
    if (onChange) onChange(newValue as Partial<StrippingType>);
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
      noOptionsMessage={() => 'stripping not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<StrippingType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<StrippingType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<StrippingType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={strippingComponents}
    />
  );
};

export default StrippingSelectBase;
