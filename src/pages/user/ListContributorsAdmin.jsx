import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProjectService from "../../services/ProjectService/ProjectService";
import { useLocation } from "react-router-dom";
import { makeStyles, Card, Button } from "@material-ui/core";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxWidth: 1000,
  },
}));

export default function ListContributorsAdmin() {
  const classes = useStyles();
  const history = useHistory();
  const [project, setProject] = useState([]);
  const [data, setData] = useState({});
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [projectsLength, setProjectsLength] = useState(0);

  const location = useLocation();
  const projectId = location.state.projectId;

  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Full Name", field: "fullname" },
  ];

  const username = localStorage.getItem("username");
  const roles = JSON.parse(localStorage.getItem("roles")).Roles;

  console.table(projectId);

  useEffect(() => {
    console.log("Effect 1 Triggered");
    setSelectedProject(projectId);
  }, []);

  useEffect(() => {
    console.log("Effect 2 Triggered");
    ProjectService.getProjectById(projectId).then((response) => {
      console.log("Response Received : " + JSON.stringify(response));
      setProject(response);
      setSelectedProjectName(response.projectName);
      setProjectsLength(response.length);
    });
  }, [projectsLength, username]);

  useEffect(() => {
    //console.log("Projects : " + projects);
    console.log("Effect 3 Triggered");
    console.log("Projects Length : " + project.length);
    // const result = projects.filter((project) => project.id === selectedProject);
    // console.log("Result : " + JSON.stringify(result));

    const listContributors = [];
    if (Object.keys(project).length > 0) {
      // console.log("Contributors : " + JSON.stringify(result[0].contributors));
      project.contributors.forEach((contributor) => {
        const item = {
          id: contributor.id,
          fullname: contributor.fullname,
          username: contributor.username,
        };

        listContributors.push(item);
      });
    }
    console.log("List Contributors : " + listContributors);
    setData(listContributors);
  }, [projectsLength, selectedProject]);

  return (
    <div align="center">
      <Card className={classes.table}>
        <MaterialTable
          title={"Project Team for " + JSON.stringify(selectedProjectName)}
          columns={columns}
          data={data}
          options={{
            selection: !roles.includes("Admin"),
            search: false,
          }}
        />
        <div align="left">
          <Button onClick={() => history.push("/listprojects")}>Back</Button>
        </div>
      </Card>
    </div>
  );
}
