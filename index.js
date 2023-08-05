const inquirer = require('inquirer');
const { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee } = require('./module/employee');

const startApp = async () => {
  while (true) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee',
        'Exit',
      ],
    });

    switch (action) {
      case 'View all departments':
        const departments = await getAllDepartments();
        console.table(departments);
        break;

      case 'View all roles':
        const roles = await getAllRoles();
        console.table(roles);
        break;

      case 'View all employees':
        const employees = await getAllEmployees();
        console.table(employees);
        break;

      case 'Add a department':
        const department = await inquirer.prompt({ name: 'name', type: 'input', message: 'Enter the department name:' });
        await addDepartment(department.name);
        console.log('Department added successfully.');
        break;

      case 'Add a role':
        try {
          const departments = await getAllDepartments();
          const departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
          }));
        
          const roleDetails = await inquirer.prompt([
            { name: 'title', type: 'input', message: 'Enter the role title:' },
            { name: 'salary', type: 'number', message: 'Enter the role salary:' },
            {
              name: 'department_id',
              type: 'list',
              message: 'Select the department for this role:',
              choices: departmentChoices,
             },
           ]);
        
          await addRole(roleDetails.title, roleDetails.salary, roleDetails.department_id);
          console.log('Role added successfully.');
        } catch (error) {
            console.error('Error adding role:', error);
        }
        break;

      case 'Add an employee':
          try {
            const roles = await getAllRoles();
            const roleChoices = roles.map((role) => ({
              name: role.title,
              value: role.id,
            }));
          
            const employees = await getAllEmployees();
            const managerChoices = employees.map((employee) => ({
              name: employee.manager_name,
              value: employee.id,
            }));
          
            const employeeDetails = await inquirer.prompt([
              { name: 'first_name', type: 'input', message: 'Enter the employee\'s first name:' },
              { name: 'last_name', type: 'input', message: 'Enter the employee\'s last name:' },
              { name: 'role_id', type: 'list', message: 'Select the role for this employee:', choices: roleChoices },
              { name: 'manager_id', type: 'list', message: 'Select the manager for this employee:', choices: managerChoices },
            ]);
          
            await addEmployee(employeeDetails.first_name, employeeDetails.last_name, employeeDetails.role_id, employeeDetails.manager_id);
            console.log('Employee added successfully.');
          } catch (error) {
            console.error('Error adding employee:', error);
          }
          break;

       case 'Update an employee role':
        try {
          const employees = await getAllEmployees();
          const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }));

          const roles = await getAllRoles();
          const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
          }));

          const employeeToUpdate = await inquirer.prompt([
            { name: 'employee_id', type: 'list', message: 'Select an employee to update:', choices: employeeChoices },
            { name: 'role_id', type: 'list', message: 'Select the new role for the employee:', choices: roleChoices },
          ]);

          await updateEmployeeRole(employeeToUpdate.employee_id, employeeToUpdate.role_id);
          console.log('Employee role updated successfully.');
        } catch (error) {
          console.error('Error updating employee role:', error);
        }
        break;

      case 'Exit':
        console.log('Exiting the application.');
        process.exit(0);
        break;

      default:
        console.log('Invalid option. Please try again.');
        break;
    }
  }
};


// Start the application
startApp();
