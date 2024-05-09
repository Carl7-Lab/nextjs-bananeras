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
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useMerchants } from '../../hooks/merchants/getMerchants';
import { usePagination } from '../../hooks/usePagination';

export type PartialProducerType = {
  id: string;
  businessName: string;
  businessId: string;
  address: string;
  city: string;
};

interface ProducerSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setProducer?: (producer: PartialProducerType) => void;
  onChange?: (newValue: PartialProducerType) => void;
}

const chakraStyles: ChakraStylesConfig<
  PartialProducerType,
  false,
  GroupBase<PartialProducerType>
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

const producerComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      PartialProducerType,
      false,
      GroupBase<PartialProducerType>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ProducerSelectBase: React.FC<ProducerSelectBaseProps> = ({
  name,
  placeholder,
  field,
  onChange,
  setProducer,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useMerchants(paginationParams);

  console.log('ProducerSelectBase data', data);
  const handleChange = (newValue: SingleValue<PartialProducerType>) => {
    if (setProducer) {
      setProducer(newValue as PartialProducerType);
    }

    if (onChange) {
      onChange(newValue as PartialProducerType);
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
      noOptionsMessage={() => 'producer not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(producer: PartialProducerType) =>
        `${producer.businessName}`
      }
      getOptionValue={(producer: PartialProducerType) => producer.id}
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: PartialProducerType) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      components={producerComponents}
    />
  );
};

export default ProducerSelectBase;
