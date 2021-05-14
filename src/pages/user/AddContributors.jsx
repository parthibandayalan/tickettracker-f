import React, { useEffect, useState } from "react";
import {
  Card,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import MaterialTable from "material-table";
import ProjectService from "../../services/ProjectService/ProjectService";
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
}));

export default function AddContributors() {
  const [projects, setProjects] = useState([]);
  const [projectsLength, setProjectsLength] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [data, setData] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Full Name", field: "fullname" },
  ];
  const username = localStorage.getItem("username");

  const handleChange = (event) => {
    setSelectedProject(event.target.value);
    if (event.target.value !== "") {
      const projectName = projects.filter(
        (project) => project.id === event.target.value
      )[0].projectName;
      setSelectedProjectName(projectName);
      console.log("Project Name : " + projectName);
      const values = {
        projectId: event.target.value,
        manager: username,
      };
      ProjectService.getAvailableContributors(values).then((response) => {
        console.log(response);
        setData(response);
      });
    } else {
      setSelectedProjectName("");
      setData([]);
    }
  };

  const onAdd = (listId) => {
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
    ProjectService.addContributor(values)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: "Contributors Add",
          type: "success",
        });
        setProjectsLength(projectsLength - ids.length);
      })
      .catch(() =>
        setNotify({
          isOpen: true,
          message: "Operation Failed",
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

  return (
    <div align="center">
      <Card className={classes.table}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
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
        </FormControl>

        <MaterialTable
          title={
            "Available Contributors " + JSON.stringify(selectedProjectName)
          }
          columns={columns}
          data={data}
          options={{
            selection: true,
            search: false,
          }}
          actions={[
            {
              tooltip: "Add All Selected Users",
              icon: "add",
              onClick: (evt, data) =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to add selected users?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    onAdd(data);
                  },
                }),
            },
          ]}
        ></MaterialTable>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
