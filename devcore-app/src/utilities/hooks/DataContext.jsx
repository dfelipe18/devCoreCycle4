import React, {createContext, useState} from "react";
import salesJson from "../json/sales.json";

export const DataContext = createContext();

const dataInit = salesJson;

export const DataProvider = ({children}) => {
    const [dataSales, setDataSales] = useState(dataInit.ventas);
    return (
        <DataContext.Provider value={{
            dataSales,
            setDataSales
        }}>
            {children}
        </DataContext.Provider>
    );
}