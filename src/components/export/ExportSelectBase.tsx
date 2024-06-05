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
import { ExportType } from '@/types/export';
import { useExportsNotSent } from '../../hooks/export/getExportsNotSend';
import { usePagination } from '../../hooks/usePagination';

interface ExportSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setExport?: (exportSelected: Partial<ExportType>) => void;
  onChange?: (newValue: Partial<ExportType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<ExportType>,
  false,
  GroupBase<Partial<ExportType>>
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

const brandComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ExportType>,
      false,
      GroupBase<Partial<ExportType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ExportSelectBase: React.FC<ExportSelectBaseProps> = ({
  name,
  field,
  placeholder,
  onChange,
  setExport,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useExportsNotSent(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<ExportType>>) => {
    if (setExport) {
      setExport(newValue as Partial<ExportType>);
    }
    if (onChange) {
      onChange(newValue as Partial<ExportType>);
    }
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
      noOptionsMessage={() => 'export not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<ExportType>) => `${opt.id}`}
      getOptionValue={(opt: Partial<ExportType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<ExportType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      components={brandComponents}
    />
  );
};

export default ExportSelectBase;
