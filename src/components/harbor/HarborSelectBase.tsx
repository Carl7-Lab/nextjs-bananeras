/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useHarborsByType } from '../../hooks/export/harbor/getHarborsByType';
import { usePagination } from '../../hooks/usePagination';
import { HarborType } from '../../types/harbor';

interface HarborSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  type: 'Nacional' | 'Internacional';
  setHarbor?: (harbor: Partial<HarborType>) => void;
  onChange?: (newValue: Partial<HarborType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<HarborType>,
  false,
  GroupBase<Partial<HarborType>>
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

const harborComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<HarborType>,
      false,
      GroupBase<Partial<HarborType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const HarborSelectBase: React.FC<HarborSelectBaseProps> = ({
  name,
  placeholder,
  field,
  type,
  onChange,
  setHarbor,
}) => {
  const { paginationParams } = usePagination();
  const {
    data = [],
    isLoading,
    error,
  } = useHarborsByType({
    type,
    ...paginationParams,
  });
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data } = response;
      const { statusCode } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<HarborType>>): void => {
    if (setHarbor) {
      setHarbor(newValue as Partial<HarborType>);
    }

    if (onChange) {
      onChange(newValue as Partial<HarborType>);
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
          : 'Ya no hay puerto/s disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<HarborType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<HarborType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<HarborType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={harborComponents}
    />
  );
};

export default HarborSelectBase;
