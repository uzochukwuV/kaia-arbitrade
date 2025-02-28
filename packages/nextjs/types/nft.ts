export interface NFTCardProps {
  id: string;
  name?: string | undefined;
  image?: string | undefined;
  price?: bigint;
  owner?: string;
  description?: string;
  buyer?: string;
  payedFor?: boolean;
  booked?: boolean;
  sellerChecked?: boolean;
  buyerChecked?: boolean;
  quantity?: number | string;
  date?: string;
  tags?: string;
  disputed?: boolean;
  onClick?: () => void;
}

export interface NFTMetaData {
  name?: string | undefined;
  image?: string | undefined;
  description?: string;
  quantity?: number | string;
  date?: string;
  tags?: string;
}

export interface Context {
  filter: string[];
  setFilter: (nfts: string[]) => void;
}
