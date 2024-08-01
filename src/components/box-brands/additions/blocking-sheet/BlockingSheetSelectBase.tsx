import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  SingleValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useBlockingSheets } from '../../../../hooks/box-brand/additions/blocking-sheet/getBlockingSheets';
import { usePagination } from '../../../../hooks/usePagination';
import { BlockingSheetType } from '../../../../types/box-brand/additions/blockingSheet';

interface BlockingSheetSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setBlockingSheet?: (blockingSheet: Partial<BlockingSheetType>) => void;
  onChange?: (newValue: Partial<BlockingSheetType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<BlockingSheetType>,
  false,
  GroupBase<Partial<BlockingSheetType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
    h: '36px',
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

const blockingSheetComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<BlockingSheetType>,
      false,
      GroupBase<Partial<BlockingSheetType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BlockingSheetSelectBase: React.FC<BlockingSheetSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setBlockingSheet,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } =
    useBlockingSheets(paginationParams);
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

  const handleChange = (newValue: SingleValue<Partial<BlockingSheetType>>) => {
    if (setBlockingSheet)
      setBlockingSheet(newValue as Partial<BlockingSheetType>);
    if (onChange) onChange(newValue as Partial<BlockingSheetType>);
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
          : 'Ya no hay etiqueta/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<BlockingSheetType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<BlockingSheetType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<BlockingSheetType>) => opt.id === field?.value
            )
          : null
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={blockingSheetComponents}
    />
  );
};

export default BlockingSheetSelectBase;
