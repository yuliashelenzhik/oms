import { createContext } from "react";

type CardContextType = true | false;

export const CardContext = createContext<CardContextType>(false);
