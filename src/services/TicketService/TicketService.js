import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

class TicketService {
  async getAllTickets() {
    const url = `${API_URL}/tickets`;
    return axios.get(url).then((response) => response.data);
  }

  async getTicketById(id) {
    const url = `${API_URL}/ticket/${id}`;
    return axios.get(url).then((response) => response.data);
  }

  async getTicketAsContributor(id) {
    const url = `${API_URL}/ticket/assigned/${id}`;
    return axios.get(url).then((response) => response.data);
  }

  async getTicketAsCreator(id) {
    const url = `${API_URL}/ticket/creator/${id}`;
    return axios.get(url).then((response) => response.data);
  }

  async deleteTicketById(id) {
    const url = `${API_URL}/ticket/delete/${id}`;
    return axios.delete(url).then((response) => response.data);
  }

  async updateTicketById(id, column, value) {
    const url = `${API_URL}/update/ticket`;
    let payload = { id: id, column: column, value: value };
    console.log(payload);
    return axios.put(url, payload).then((response) => response.data);
  }

  async createTicket(values) {
    const url = `${API_URL}/ticket/create`;
    let payload = {
      title: values.title,
      description: values.description,
      severity: values.severity,
      status: values.status,
      createdUser: values.createdUser,
      projectId: values.projectId,
    };
    //console.log(payload);
    return axios.post(url, payload).then((response) => response.status === 200);
  }
}

export default new TicketService();
