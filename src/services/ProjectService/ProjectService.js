import axios from "axios";
const API_URL = "http://localhost:8080";
axios.defaults.withCredentials = true;

class ProjectService {
  async getAllProjects() {
    const url = `${API_URL}/projects`;
    return axios.get(url).then(response => response.data);
  }

  async getProjectById(id) {
    const url = `${API_URL}/project/${id}`;
    return axios.get(url).then(response => response.data);
  }

  async createProject(values) {

    const url =`${API_URL}/project/create`;
    let payload = {"projectName":values.projectName,"projectDescription":values.projectDescription,"projectManager":values.projectManager};
    //console.log(payload);
    return axios.post(url,payload).then(response => response.status === 200 );
  }

}

export default new ProjectService();