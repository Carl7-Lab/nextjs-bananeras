/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  CSSObjectWithLabel,
  MultiValue,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useHarborsByType } from '../../hooks/export/harbor/getHarborsByType';
import { usePagination } from '../../hooks/usePagination';
import { HarborType } from '../../types/harbor';

interface HarborMultiSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  type: 'Nacional' | 'Internacional';
  setHarbors?: (harbors: Partial<HarborType>[]) => void;
  onChange?: (newValues: Partial<HarborType>[]) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<HarborType>,
  true,
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
      true,
      GroupBase<Partial<HarborType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const HarborMultiSelectBase: React.FC<HarborMultiSelectBaseProps> = ({
  name,
  placeholder,
  field,
  type,
  onChange,
  setHarbors,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useHarborsByType({
    ...paginationParams,
    type,
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

  const handleChange = (newValues: MultiValue<Partial<HarborType>>): void => {
    if (setHarbors) {
      setHarbors(newValues as Partial<HarborType>[]);
    }

    if (onChange) {
      onChange(newValues as Partial<HarborType>[]);
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
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay puerto/s disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(harbor: Partial<HarborType>) =>
        `${harbor.name} - ${harbor.country}`
      }
      getOptionValue={(harbor: Partial<HarborType>) =>
        harbor.id ? harbor.id.toString() : ''
      }
      onChange={(newValues) => handleChange(newValues as Partial<HarborType>[])}
      value={
        field?.value
          ? data.filter(
              (opt: Partial<HarborType>) => field.value.indexOf(opt.id) >= 0
            )
          : []
      }
      closeMenuOnSelect={false}
      placeholder={placeholder}
      components={harborComponents}
    />
  );
};

export default HarborMultiSelectBase;
