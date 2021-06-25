import axios from 'axios';

// export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkIDExists = ({id}) => axios.post("http://192.168.0.7:8080/spring/isunique" , {ID : id});

export const localRegister = ({name, id, password}) => axios.post("http://192.168.0.7:8080/spring/register", { Name : name, ID : id,Pwd : password });
export const localLogin = ({id, password}) => axios.post("http://192.168.0.7:8080/spring/login", { ID: id, Pwd : password });

export const checkStatus = () => axios.get("http://192.168.0.7:8080/spring/modify");
// "ID" : "id"
export const logout = () => axios.post("http://192.168.0.7:8080/spring/logout");