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
import { useClientsByHarborId } from '../../hooks/export/client/getClientsByHarborId';
import { usePagination } from '../../hooks/usePagination';

export type PartialClientType = {
  id: string;
  businessName: string;
  businessId: string;
  type: string;
  email: string;
  phone: string;
};

interface ClientSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  harbor?: number;
  setClient?: (client: PartialClientType) => void;
  onChange?: (newValue: PartialClientType) => void;
}

const chakraStyles: ChakraStylesConfig<
  PartialClientType,
  false,
  GroupBase<PartialClientType>
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

const clientComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      PartialClientType,
      false,
      GroupBase<PartialClientType>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ClientSelectBase: React.FC<ClientSelectBaseProps> = ({
  name,
  placeholder,
  field,
  harbor,
  onChange,
  setClient,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useClientsByHarborId(
    { ...paginationParams },
    { id: harbor ?? 0 }
  );

  const handleChange = (newValue: SingleValue<PartialClientType>) => {
    if (setClient) {
      setClient(newValue as PartialClientType);
    }

    if (onChange) {
      onChange(newValue as PartialClientType);
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
      noOptionsMessage={() => 'client not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(client: PartialClientType) => `${client.businessName}`}
      getOptionValue={(client: PartialClientType) => client.id}
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: PartialClientType) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      components={clientComponents}
    />
  );
};

export default ClientSelectBase;
