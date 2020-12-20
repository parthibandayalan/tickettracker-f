import axios from "axios";
const API_URL = "http://localhost:8080";

class AuthenticationService {
  authenticated = false;
    async authenticateUser(values){
        console.log(values);
        const url =`${API_URL}/authenticate`;
        let payload = {"username":values.username,"password":values.password};      
        axios.defaults.withCredentials = true;
        this.authenticated = true;
        return axios.post(url,payload).then(response => response );
      }
      isAuthenticated(){
        return this.authenticated;
      }
}

export default new AuthenticationService();