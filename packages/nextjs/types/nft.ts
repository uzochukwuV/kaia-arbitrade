export interface NFTCardProps {
    id: string;
    name?: string|undefined;
    image?: string|undefined;
    price?: bigint;
    owner?: string;
    description?: string;
    payer?: string;
    payedFor?: boolean;
    booked?: boolean;
    payerChecked?: boolean;
    buyerChecked?: boolean;
    quantity?: number|string;
    harvestDate?: string;
    tags?:string;
    onClick?: () => void;
}


export interface NFTMetaData {
    name?: string|undefined;
    image?: string|undefined;
    description?: string;
    quantity?: number|string;
    harvestDate?: string;
    tags?:string
}