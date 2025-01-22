import { Icon } from '@chakra-ui/react';
import {
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  ChakraStylesConfig,
  SingleValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useThermographs } from '../../../../hooks/box-brand/container/thermograph/getThermographs';
import { usePagination } from '../../../../hooks/usePagination';
import { ThermographType } from '../../../../types/box-brand/container/thermograph';

interface ThermographSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setThermo?: (thermo: Partial<ThermographType>) => void;
  onChange?: (newValue: Partial<ThermographType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<ThermographType>,
  false,
  GroupBase<Partial<ThermographType>>
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

const thermoComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ThermographType>,
      false,
      GroupBase<Partial<ThermographType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ThermographSelectBase: React.FC<ThermographSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setThermo,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } = useThermographs(paginationParams);
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

  const handleChange = (newValue: SingleValue<Partial<ThermographType>>) => {
    if (setThermo) setThermo(newValue as Partial<ThermographType>);
    if (onChange) onChange(newValue as Partial<ThermographType>);
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
          : 'Ya no hay termografo/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<ThermographType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ThermographType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<ThermographType>) => opt.id === field?.value
            )
          : null
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={thermoComponents}
    />
  );
};

export default ThermographSelectBase;
