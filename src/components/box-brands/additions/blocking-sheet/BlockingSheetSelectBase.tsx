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
import { useBlockingSheets } from '../../../../hooks/box-brand/additions/blocking-sheet/getBlockingSheets';
import { usePagination } from '../../../../hooks/usePagination';
import { BlockingSheetType } from '../../../../types/box-brand/additions/blockingSheet';

interface BlockingSheetSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setBlockingSheet?: (blockingSheet: Partial<BlockingSheetType>) => void;
  onChange?: (newValue: Partial<BlockingSheetType>) => void;
}

// const data: Partial<BlockingSheetType>[] = [
//   {
//     id: 1,
//     name: 'Lamina de bloque1',
//   },
//   {
//     id: 2,
//     name: 'Lamina de bloque2',
//   },
//   {
//     id: 3,
//     name: 'Lamina de bloque3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<BlockingSheetType>,
  false,
  GroupBase<Partial<BlockingSheetType>>
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

const blockingSheetComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<BlockingSheetType>,
      false,
      GroupBase<Partial<BlockingSheetType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BlockingSheetSelectBase: React.FC<BlockingSheetSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setBlockingSheet,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useBlockingSheets(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<BlockingSheetType>>) => {
    if (setBlockingSheet)
      setBlockingSheet(newValue as Partial<BlockingSheetType>);
    if (onChange) onChange(newValue as Partial<BlockingSheetType>);
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
      noOptionsMessage={() => 'staple not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<BlockingSheetType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<BlockingSheetType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<BlockingSheetType>) => opt.id === field?.value
            )
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={blockingSheetComponents}
    />
  );
};

export default BlockingSheetSelectBase;
