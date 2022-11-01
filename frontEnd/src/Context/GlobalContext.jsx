import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import socket from "../Utils/socket";

const globalContext = createContext();

const AppProvider = ({children}) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ user, setUser ] = useState(null);
    
    const saveUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    const connectSocket = (username, userId) => {
        socket.auth = {username, userId};
        socket.connect();
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/users/showMe`, { 
            withCredentials: true,
            credentials: 'include'
        });
            saveUser(data.user);
        } catch (error) {
            removeUser();
        };
        setIsLoading(false);
    };

    const logoutUser = async () => {
        console.log('login out')
        try {
            await axios.delete('http://localhost:5000/api/v1/auth/logout', 
            { 
            withCredentials: true,
            credentials: 'include'
        }
        );
            removeUser();
        } catch (error) {
            console.log(error);
        };
    };

    console.log(user);

    useEffect(() => {
        fetchUser();
    },[]);

    useEffect(() => {
        connectSocket(user?.username, user?.userId);
    },[user]);

    return(
        <globalContext.Provider 
            value={{
                isLoading,
                saveUser,
                user,
                logoutUser,
            }}
        >
            {children}
        </globalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(globalContext);
};

export { AppProvider };