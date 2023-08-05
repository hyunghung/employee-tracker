const mysql = require('mysql2');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hyeongje1!',
  database: 'employee_db', // Change this to your database name if different
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database'); // Change this to your database name if different
});

// Helper functions for interacting with the database

// Get all departments
function getAllDepartments() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Add a new department
function addDepartment(name) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const newDepartment = { id: results.insertId, name };
        resolve(newDepartment);
      }
    });
  });
}

// Get all roles
function getAllRoles() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM role', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Add a new role
function addRole(title, salary, department_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, department_id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newRole = { id: results.insertId, title, salary, department_id };
          resolve(newRole);
        }
      }
    );
  });
}

// Get all employees
function getAllEmployees() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Add a new employee
function addEmployee(first_name, last_name, role_id, manager_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [first_name, last_name, role_id, manager_id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newEmployee = { id: results.insertId, first_name, last_name, role_id, manager_id };
          resolve(newEmployee);
        }
      }
    );
  });
}

async function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [roleId, employeeId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

module.exports = {
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
    addEmployee,
    updateEmployeeRole,
  };
