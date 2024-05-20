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
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SealType } from '../../../../types/box-brand/container/seal';

interface SealSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setSeal?: (seal: Partial<SealType>) => void;
  onChange?: (newValue: Partial<SealType>) => void;
}

const data: Partial<SealType>[] = [
  {
    id: 1,
    name: 'Sello1',
    type: 'Tipo1',
  },
  {
    id: 2,
    name: 'Sello2',
    type: 'Tipo2',
  },
  {
    id: 3,
    name: 'Sello3',
    type: 'Tipo3',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<SealType>,
  false,
  GroupBase<Partial<SealType>>
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

const sealComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<SealType>,
      false,
      GroupBase<Partial<SealType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const SealSelectBase: React.FC<SealSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setSeal,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useSeals(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<SealType>>) => {
    if (setSeal) setSeal(newValue as Partial<SealType>);
    if (onChange) onChange(newValue as Partial<SealType>);
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
      noOptionsMessage={() => 'seal not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<SealType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<SealType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<SealType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={sealComponents}
    />
  );
};

export default SealSelectBase;
