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
import { StrappingType } from '../../../../types/box-brand/container/strapping';

interface StrappingSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setStrapping?: (strapping: Partial<StrappingType>) => void;
  onChange?: (newValue: Partial<StrappingType>) => void;
}

const data: Partial<StrappingType>[] = [
  {
    id: 1,
    name: 'Zuncho1',
    weightPerPack: 20,
    color: 'Color1',
  },
  {
    id: 2,
    name: 'Zuncho2',
    weightPerPack: 40,
    color: 'Color2',
  },
  {
    id: 3,
    name: 'Zuncho3',
    weightPerPack: 60,
    color: 'Color3',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<StrappingType>,
  false,
  GroupBase<Partial<StrappingType>>
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

const strappingComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<StrappingType>,
      false,
      GroupBase<Partial<StrappingType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const StrappingSelectBase: React.FC<StrappingSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setStrapping,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useStrappings(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<StrappingType>>) => {
    if (setStrapping) setStrapping(newValue as Partial<StrappingType>);
    if (onChange) onChange(newValue as Partial<StrappingType>);
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
      noOptionsMessage={() => 'strapping not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<StrappingType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<StrappingType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<StrappingType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={strappingComponents}
    />
  );
};

export default StrappingSelectBase;
