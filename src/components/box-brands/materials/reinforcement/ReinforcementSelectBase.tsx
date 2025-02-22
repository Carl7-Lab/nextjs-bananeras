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
import { usePagination } from '@/hooks/usePagination';
import { ReinforcementType } from '@/types/box-brand/materials/reinforcement';
import { useReinforcements } from '@/hooks/box-brand/materials/reinforcement/getReinforcements';

interface ReinforcementSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setReinforcement?: (reinforcement: Partial<ReinforcementType>) => void;
  onChange?: (newValue: Partial<ReinforcementType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<ReinforcementType>,
  false,
  GroupBase<Partial<ReinforcementType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
    h: 'auto',
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

const reinforcementComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ReinforcementType>,
      false,
      GroupBase<Partial<ReinforcementType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ReinforcementSelectBase: React.FC<ReinforcementSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setReinforcement,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useReinforcements(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const { response } = error as any;
      if (response?.data?.statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<ReinforcementType>>) => {
    if (setReinforcement)
      setReinforcement(newValue as Partial<ReinforcementType>);
    if (onChange) onChange(newValue as Partial<ReinforcementType>);
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
        error
          ? (error as any).response.data.message
          : 'Ya no hay reinforcement/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<ReinforcementType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ReinforcementType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<ReinforcementType>) => opt.id === field?.value
            )
          : null
      }
      placeholder={placeholder}
      components={reinforcementComponents}
    />
  );
};

export default ReinforcementSelectBase;
