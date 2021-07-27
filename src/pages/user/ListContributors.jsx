import React, { useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService/ProjectService";
import MaterialTable from "material-table";
import {
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Card,
} from "@material-ui/core";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxWidth: 1000,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  myTypography: {
    color: "#025f8c",
  },
}));

export default function ListContributors() {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState({});
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [projectsLength, setProjectsLength] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const classes = useStyles();

  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Full Name", field: "fullname" },
  ];
  const username = localStorage.getItem("username");
  const roles = JSON.parse(localStorage.getItem("roles")).Roles;

  const handleChange = (event) => {
    setSelectedProject(event.target.value);
    if (event.target.value !== "") {
      const projectName = projects.filter(
        (project) => project.id === event.target.value
      )[0].projectName;
      //console.log("Project Name : " + projectName);
      setSelectedProjectName(projectName);
    } else {
      setSelectedProjectName("");
    }
  };

  const onDelete = (listId) => {
    const ids = [];
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    //console.log("Remove User : " + JSON.stringify(listId));
    listId.forEach((eachId) => ids.push(eachId.id));
    console.log("Ids : " + JSON.stringify(ids));
    const values = {
      users: ids,
      projectId: selectedProject,
      manager: username,
    };
    ProjectService.removeContributor(values)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: "Contributors Removed",
          type: "error",
        });
        setProjectsLength(projectsLength - ids.length);
      })
      .catch(() =>
        setNotify({
          isOpen: true,
          message: "Removal Failed",
          type: "error",
        })
      );
  };

  useEffect(() => {
    ProjectService.getProjectByProjectManager(username).then((response) => {
      console.log("Response Received : " + JSON.stringify(response));
      setProjects(response);
      setProjectsLength(response.length);
    });
  }, [projectsLength, username]);

  useEffect(() => {
    //console.log("Projects : " + projects);
    console.log("Effect 2 Triggered");
    console.log("Projects Length : " + projects.length);
    const result = projects.filter((project) => project.id === selectedProject);
    console.log("Result : " + JSON.stringify(result));

    const listContributors = [];
    if (Object.keys(result).length > 0) {
      // console.log("Contributors : " + JSON.stringify(result[0].contributors));
      result[0].contributors.forEach((contributor) => {
        const item = {
          id: contributor.id,
          fullname: contributor.fullname,
          username: contributor.username,
        };

        listContributors.push(item);
      });
    }
    console.table(listContributors);
    setData(listContributors);
  }, [projectsLength, selectedProject]);

  return (
    <div align="center">
      <Card>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
          {(
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProject}
              onChange={handleChange}
            >
              <MenuItem value="">Select ...</MenuItem>
              {projects.map((project) => (
                <MenuItem
                  value={project.id}
                  key={project.id}
                  label={project.projectName}
                >
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>
          ) && !roles.includes("Admin")}
        </FormControl>
        <Card className={classes.table}>
          <MaterialTable
            title={"Project Team for " + JSON.stringify(selectedProjectName)}
            columns={columns}
            data={data}
            options={{
              selection: !roles.includes("Admin"),
              search: false,
            }}
            actions={[
              {
                tooltip: "Remove All Selected Users",
                icon: "delete",
                onClick: (evt, data) => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Are you sure to remove this record?",
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {
                      onDelete(data);
                    },
                  });
                },
              },
            ]}
          />
        </Card>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
