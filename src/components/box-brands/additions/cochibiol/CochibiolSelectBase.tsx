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
import { useCochibiols } from '../../../../hooks/box-brand/additions/cochibiol/getCochibiols';
import { usePagination } from '../../../../hooks/usePagination';
import { CochibiolType } from '../../../../types/box-brand/additions/cochibiol';

interface CochibiolSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setCochibiol?: (cochibiol: Partial<CochibiolType>) => void;
  onChange?: (newValue: Partial<CochibiolType>) => void;
}

// const data: Partial<CochibiolType>[] = [
//   {
//     id: 1,
//     name: 'Cochibiol1',
//   },
//   {
//     id: 2,
//     name: 'Cochibiol2',
//   },
//   {
//     id: 3,
//     name: 'Cochibiol3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<CochibiolType>,
  false,
  GroupBase<Partial<CochibiolType>>
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

const cochibiolComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<CochibiolType>,
      false,
      GroupBase<Partial<CochibiolType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const CochibiolSelectBase: React.FC<CochibiolSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setCochibiol,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useCochibiols(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<CochibiolType>>) => {
    if (setCochibiol) setCochibiol(newValue as Partial<CochibiolType>);
    if (onChange) onChange(newValue as Partial<CochibiolType>);
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
      noOptionsMessage={() => 'cochibiol not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<CochibiolType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<CochibiolType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<CochibiolType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={cochibiolComponents}
    />
  );
};

export default CochibiolSelectBase;
