import React, { useContext, useState, Children } from "react";

export const BeneficiarioContext = React.createContext([false, () => {}]);

export const BeneficiarioProvider = ({ children }) => {
  const [state, setState] = useState(false);

  return (
    <BeneficiarioContext.Provider value={[state, setState]}>
      {children}
    </BeneficiarioContext.Provider>
  );
};

// import { createContext } from ' react';

// export const UserContext = createContext({});

// export function UserProvider({ children }) {
//     return(
//         <UserContext.Provider>
//             { children }

//         </UserContext.Provider>
//     )
// }