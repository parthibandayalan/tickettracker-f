import { TableContainer,Paper,Table, TableBody,TableRow,TableHead,Card,TableCell,Link,Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React,{ useEffect,useState } from 'react';
import { useHistory } from "react-router-dom";
import ProjectService from "../../services/ProjectService/ProjectService";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}))

export default function ListProjects() {

    const history = useHistory();
    const classes = useStyles();
    const [projects, setProjects] = useState([]);



    useEffect(() => {
        ProjectService.getAllProjects().then(response => {
            //console.log(response);
            setProjects(response);
            //this.setState({ projects: response });
        });
    },[projects.length]);

    return (
        <div>
            <Card>
                <TableContainer component={Paper}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                            <TableCell>Project Id</TableCell>
                                <TableCell align="center">Project Name</TableCell>
                                <TableCell align="center">Project Description</TableCell>
                                <TableCell align="center">Project Manager</TableCell>
                                <TableCell align="center">No 0f Tickets</TableCell>
                                <TableCell align="center">View Tickets</TableCell>
                                <TableCell align="center">View Contributors</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(project => 
                            <TableRow key={project.id} hover={true}>
                                <TableCell component="th" scope="row">{project.id}</TableCell>
                                <TableCell align="center">{project.projectName}</TableCell>
                                <TableCell align="center">{project.projectDescription}</TableCell>
                                <TableCell align="center">{project.projectManager.username}</TableCell>
                                <TableCell align="center">{project.tickets.length}</TableCell>
                                <TableCell align="center"><Button onClick={()=> history.push({pathname: '/project',
                                                                                              state: { projectId: project.id }
                                                                                              ,})}>View</Button></TableCell>
                                <TableCell align="center"><Link to={`/project/contributors/${project.id}`}>View</Link></TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}
