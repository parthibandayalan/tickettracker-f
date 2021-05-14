import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

class ProjectService {
  async getAllProjects() {
    const url = `${API_URL}/projects`;
    return axios.get(url).then((response) => response.data);
  }

  async getProjectById(id) {
    const url = `${API_URL}/project/${id}`;
    return axios.get(url).then((response) => response.data);
  }

  async getProjectByProjectManager(id) {
    const url = `${API_URL}/project/manager/${id}`;
    return axios.get(url).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

  async createProject(values) {
    const url = `${API_URL}/project/create`;
    let payload = {
      projectName: values.projectName,
      projectDescription: values.projectDescription,
      projectManager: values.projectManager,
    };

    return axios.post(url, payload).then((response) => response.status === 200);
  }

  async removeContributor(values) {
    const url = `${API_URL}/project/remove/contributors`;
    let payload = {
      users: values.users,
      projectId: values.projectId,
      manager: values.manager,
    };
    console.log("Payload : " + JSON.stringify(payload));
    return axios.post(url, payload).then((response) => response.status === 200);
  }

  async addContributor(values) {
    const url = `${API_URL}/project/add/contributors`;
    let payload = {
      users: values.users,
      projectId: values.projectId,
      manager: values.manager,
    };
    console.log("Payload : " + JSON.stringify(payload));
    return axios.post(url, payload).then((response) => response.status === 200);
  }

  async getAvailableContributors(values) {
    const url = `${API_URL}/project/available/contributors`;
    let payload = {
      projectId: values.projectId,
      manager: values.manager,
    };
    return axios.post(url, payload).then((response) => response.data);
  }
}

export default new ProjectService();
