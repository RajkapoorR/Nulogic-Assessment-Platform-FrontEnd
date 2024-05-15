import { node, object, oneOfType, string } from 'prop-types';
import { createContext, useContext, useState } from 'react';
import RestEndpoints from '../configs/RestEndpoints';
import Axios from '../utils/axiosInstance';

const EmployeeContext = createContext({});

export const EmployeeProvider = ({ value, children }) => (
  <EmployeeContext.Provider value={{ value }}>{children}</EmployeeContext.Provider>
);

EmployeeProvider.propTypes = {
  value: object.isRequired,
  children: oneOfType([string, node]).isRequired,
};
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  const [employeeData, setEmployeeData] = useState([]);

  if (!context) {
    throw new Error('useEmployeeContext must be used inside a EmployeeProvider');
  }



  const userLogin = async (payload) => {
    try {
      const response = await Axios.post('http://localhost:8000/rest/v1/user/google-sign-in', payload);
      return response;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  return {
    employeeData,
    userLogin,
  };
};
