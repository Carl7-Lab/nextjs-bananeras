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
import { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useMerchants } from '../../hooks/merchants/getMerchants';
import { usePagination } from '../../hooks/usePagination';
import { MerchantType } from '../../types/merchant/merchant';

interface ProducerSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setProducer?: (producer: Partial<MerchantType>) => void;
  onChange?: (newValue: Partial<MerchantType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<MerchantType>,
  false,
  GroupBase<Partial<MerchantType>>
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
      Partial<MerchantType>,
      false,
      GroupBase<Partial<MerchantType>>
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
  const { data, isLoading, refetch, error } = useMerchants(paginationParams);
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

  const handleChange = (newValue: SingleValue<Partial<MerchantType>>) => {
    if (setProducer) {
      setProducer(newValue as Partial<MerchantType>);
    }

    if (onChange) {
      onChange(newValue as Partial<MerchantType>);
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
          : 'Ya no hay productor/es disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<MerchantType>) => `${opt.businessName}`}
      getOptionValue={(opt: Partial<MerchantType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<MerchantType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      components={producerComponents}
    />
  );
};

export default ProducerSelectBase;
