import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  CSSObjectWithLabel,
  SingleValue,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useLatexRemovers } from '../../../../hooks/box-brand/additions/latex-remover/getLatexRemovers';
import { usePagination } from '../../../../hooks/usePagination';
import { LatexRemoverType } from '../../../../types/box-brand/additions/latexRemover';

interface LatexRemoverSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setLatexRemover?: (latexRemover: Partial<LatexRemoverType>) => void;
  onChange?: (newValue: Partial<LatexRemoverType>) => void;
}

// const data: Partial<LatexRemoverType>[] = [
//   {
//     id: 1,
//     name: 'Removedor de Latex1',
//   },
//   {
//     id: 2,
//     name: 'Removedor de Latex2',
//   },
//   {
//     id: 3,
//     name: 'Removedor de Latex3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<LatexRemoverType>,
  false,
  GroupBase<Partial<LatexRemoverType>>
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

const latexRemoverComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<LatexRemoverType>,
      false,
      GroupBase<Partial<LatexRemoverType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const LatexRemoverSelectBase: React.FC<LatexRemoverSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setLatexRemover,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useLatexRemovers(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<LatexRemoverType>>) => {
    if (setLatexRemover) setLatexRemover(newValue as Partial<LatexRemoverType>);
    if (onChange) onChange(newValue as Partial<LatexRemoverType>);
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
      noOptionsMessage={() => 'latex remover not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<LatexRemoverType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<LatexRemoverType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<LatexRemoverType>) => opt.id === field?.value
            )
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={latexRemoverComponents}
    />
  );
};

export default LatexRemoverSelectBase;
