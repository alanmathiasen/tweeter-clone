import React, { useContext, useEffect, useState } from "react";

import { useGlobalContext } from "./GlobalContext";

const SugeridosContext = React.createContext();

const SugeridosProvider = ({ children }) => {
  const [arrayDatos, setArrayDatos] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);
  const [arrayUsersEnComun, setArrayUsersEnComun] = useState([]);
  const [moreInCommun, setMoreInCommun] = useState([]);

  return (
    <SugeridosContext.Provider
      value={{
        arrayDatos,
        setArrayDatos,
        filteredArray,
        setFilteredArray,
        siguiendo,
        setSiguiendo,
        arrayUsersEnComun,
        setArrayUsersEnComun,
        moreInCommun,
        setMoreInCommun,
      }}
    >
      {children}
    </SugeridosContext.Provider>
  );
};

export const useSugeridosContext = () => {
  return useContext(SugeridosContext);
};

export { SugeridosContext, SugeridosProvider };
