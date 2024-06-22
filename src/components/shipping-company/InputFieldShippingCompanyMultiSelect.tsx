import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddShippingCompanyModal from './AddShippingCompanyModal';
import ShippingCompanyMultiSelectBase from './ShippingCompanyMultiSelectBase';
import { ShippingCompanyType } from '../../types/shippingCompany';

interface InputFieldShippingCompanyMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setShippingCompanies?: (
    shippingCompanies: Partial<ShippingCompanyType>[]
  ) => void;
}

const InputFieldShippingCompanyMultiSelect: React.FC<
  InputFieldShippingCompanyMultiSelectProps
> = ({ name, label, placeholder, setShippingCompanies }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label} <AddShippingCompanyModal />
      </FormLabel>

      <ShippingCompanyMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<ShippingCompanyType>) => item.id)
          )
        }
        field={field}
        setShippingCompanies={setShippingCompanies}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldShippingCompanyMultiSelect;
