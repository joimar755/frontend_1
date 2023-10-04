import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { Box, Typography, useTheme } from "@mui/material";
export const Create = () => {
  const [formState, setFormState] = useState([
    (name = ""),
    (last_name = ""),
    (sex = ""),
    (role = ""),
    (email = ""),
    (password = ""),
  ]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const obtenerUSers = async () => {
      const url = await axios.get("http://127.0.0.1:8000/listausers");
      const resultado = url;
      setUsers(resultado.data.resultado);
    };
    obtenerUSers();
  }, []);

  console.log(users);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear Usuario</h3>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="name" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Last Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Last Name" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Email" />
                </Col>
              </Form.Group>
              <Col sm="10">
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                >
                  <option>sexo</option>
                  <option value="1">M</option>
                  <option value="2">F</option>
                </Form.Select>
              </Col>
              <Col sm="10">
                <Form.Select aria-label="Default select example">
                  <option>Rol</option>
                  <option value="students">Students</option>
                  <option value="user"></option>
                </Form.Select>
              </Col>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>
              <InputGroup className="mb-3">
                <button className="btn btn-success">Registrar</button>
              </InputGroup>
            </Form>
          </div>
        </div>
        <div className="col-md-8">
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>correo</th>
                <th>Roles</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((element) => {
                return (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.last_name}</td>
                    <td>{element.email}</td>
                    <td>
                      {element.role === "Students" ? (
                        <Box>
                          <PersonIcon />
                          Students
                        </Box>
                      ) : element.role === "Admin" ? (
                        <Box>
                          <SecurityOutlinedIcon />
                          Administrador
                        </Box>
                      ) : element.role === "Monitor" ? (
                        <Box>
                          <AdminPanelSettingsOutlinedIcon />
                          Monitor
                        </Box>
                      ) : (
                        <RemoveModeratorIcon />
                      )}
                    </td>
                    <td>
                      <Link to={"/Update/:id"}>
                        <button className="btn btn-warning">Editar</button>
                      </Link>
                    </td>
                    <td>
                      <button className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
