import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

class UserService {
  /*
  async getAllTickets() {
    const url = `${API_URL}/tickets`;
    return axios.get(url).then(response => response.data);
  }

  async getTicketById(id) {
    const url = `${API_URL}/ticket/${id}`;
    return axios.get(url).then(response => response.data);
  }

  async deleteTicketById(id) {
    const url = `${API_URL}/ticket/delete/${id}`;
    return axios.delete(url).then(response => response.data);
  }

  async updateTicketById(id,column,value){

    const url =`${API_URL}/update/ticket`;
    let payload = {"id":id,"column":column,"value":value};
    console.log(payload);
    return axios.put(url,payload).then(response => response.data);
  }*/

  async checkUsernameExist(username) {
    const url = `${API_URL}/check/user`;
    let payload = { username: username };
    //console.log(payload);
    return axios.put(url, payload).then((response) => response.data);
  }

  async createUser(values) {
    const url = `${API_URL}/user/create`;
    let payload = {
      username: values.username,
      password: values.password,
      role: values.role,
    };
    //console.log(payload);
    return axios.post(url, payload).then((response) => response.status === 200);
  }

  async getUnApprovedUser() {
    const url = `${API_URL}/user/unapproved`;
    return axios.get(url).then((response) => response);
  }

  async approveUsers(values) {
    const url = `${API_URL}/user/approve`;
    let payload = { users: values };
    //console.log(payload);
    return axios.put(url, payload).then((response) => response.status === 200);
  }
}

export default new UserService();
