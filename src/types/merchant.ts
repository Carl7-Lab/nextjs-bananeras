export type MerchantType = {
  id: number | '';
  businessName: string;
  businessId: string;
  address: string;
  city: string;
  business: {
    name: string;
    address: string;
    area: number;
    city: string;
    latitude: number;
    longitude: number;
    businessManager: {
      name: string;
      email: string;
      phone: string;
    };
  };
};
