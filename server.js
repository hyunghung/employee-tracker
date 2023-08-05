const express = require('express');
const employee = require('./module/employee'); // Import the employee module

const app = express();
const port = 3001; // Change this to your desired port number

app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded form data

// Endpoint for getting all departments
app.get('/departments', async (req, res) => {
  try {
    const departments = await employee.getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for adding a new department
app.post('/departments', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const department = await addDepartment(name);
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for getting all roles
app.get('/roles', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for adding a new role
app.post('/roles', async (req, res) => {
  const { title, salary, department_id } = req.body;
  if (!title || !salary || !department_id) {
    return res.status(400).json({ error: 'Title, salary, and department_id are required' });
  }

  try {
    const role = await addRole(title, salary, department_id);
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for getting all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for adding a new employee
app.post('/employees', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;
  if (!first_name || !last_name || !role_id) {
    return res.status(400).json({ error: 'First name, last name, and role_id are required' });
  }

  try {
    const employee = await addEmployee(first_name, last_name, role_id, manager_id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



