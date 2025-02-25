import { createContext } from "react";
import { Context } from "~~/types/nft";

export const nftContext = createContext<Context>({} as Context);