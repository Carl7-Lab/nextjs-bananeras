import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  MultiValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { ShippingCompanyType } from '../../types/shippingCompany';

interface ShippingCompanyMultiSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setShippingCompanies?: (
    shippingCompanies: Partial<ShippingCompanyType>[]
  ) => void;
  onChange?: (newValues: Partial<ShippingCompanyType>[]) => void;
}

const data: Partial<ShippingCompanyType>[] = [
  { id: 1, name: 'Shipping Company 1', estDuration: '8 hrs' },
  { id: 2, name: 'Shipping Company 2', estDuration: '12 hrs' },
  { id: 3, name: 'Shipping Company 3', estDuration: '16 hrs' },
];

const chakraStyles: ChakraStylesConfig<
  Partial<ShippingCompanyType>,
  true,
  GroupBase<Partial<ShippingCompanyType>>
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

const shippingCompanyComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ShippingCompanyType>,
      true,
      GroupBase<Partial<ShippingCompanyType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ShippingCompanyMultiSelectBase: React.FC<
  ShippingCompanyMultiSelectBaseProps
> = ({ name, placeholder, field, onChange, setShippingCompanies }) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useHarbors(paginationParams);

  const handleChange = (
    newValues: MultiValue<Partial<ShippingCompanyType>>
  ) => {
    if (setShippingCompanies) {
      setShippingCompanies(newValues as Partial<ShippingCompanyType>[]);
    }

    if (onChange) {
      onChange(newValues as Partial<ShippingCompanyType>[]);
    }
  };

  return (
    <ChakraSelect
      {...field}
      name={name}
      isMulti
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() => 'shipping company not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(shippingCompany: Partial<ShippingCompanyType>) =>
        `${shippingCompany.name} - ${shippingCompany.id}`
      }
      getOptionValue={(shippingCompany: Partial<ShippingCompanyType>) =>
        shippingCompany.id ? shippingCompany.id.toString() : ''
      }
      onChange={(newValues) =>
        handleChange(newValues as Partial<ShippingCompanyType>[])
      }
      value={
        field?.value
          ? data.filter(
              (opt: Partial<ShippingCompanyType>) =>
                field.value.indexOf(opt.id) >= 0
            )
          : []
      }
      closeMenuOnSelect={false}
      placeholder={placeholder}
      components={shippingCompanyComponents}
    />
  );
};

export default ShippingCompanyMultiSelectBase;
