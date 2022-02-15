export default class UpdateProductDto {
  name?: string;

  description?: string;

  url?: string;

  color?: string;

  price?: number;

  brand?: string;

  category?: string;

  shipment?: number;

  condition?: string;

  discount?: number | null;

  hot?: boolean;

  storage?: string;
}
