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
import { useBusinessesByMerchantId } from '../../hooks/business/getBusinesses';
import { usePagination } from '../../hooks/usePagination';
import { BusinessType } from '../../types/merchant/business';

interface BusinessSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  merchant?: number;
  setBusiness?: (business: Partial<BusinessType>) => void;
  onChange?: (newValue: Partial<BusinessType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<BusinessType>,
  false,
  GroupBase<Partial<BusinessType>>
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

const businessComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<BusinessType>,
      false,
      GroupBase<Partial<BusinessType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BusinessSelectBase: React.FC<BusinessSelectBaseProps> = ({
  name,
  placeholder,
  field,
  merchant,
  onChange,
  setBusiness,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } = useBusinessesByMerchantId(
    { ...paginationParams },
    { id: merchant ?? 0 }
  );
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

  const handleChange = (newValue: SingleValue<Partial<BusinessType>>) => {
    if (setBusiness) {
      setBusiness(newValue as Partial<BusinessType>);
    }

    if (onChange) {
      onChange(newValue as Partial<BusinessType>);
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
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay finca/s disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(business: Partial<BusinessType>) => `${business.name}`}
      getOptionValue={(business: Partial<BusinessType>) =>
        business.id ? business.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<BusinessType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={businessComponents}
    />
  );
};

export default BusinessSelectBase;
