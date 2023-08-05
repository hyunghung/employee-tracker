-- Insert departments
INSERT INTO department (id, name) VALUES
  (1, 'Human Resources'),
  (2, 'Finance'),
  (3, 'Marketing'),
  (4, 'Engineering');

-- Insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'HR Manager', 60000, 1),
  (2, 'Accountant', 50000, 2),
  (3, 'Marketing Specialist', 55000, 3),
  (4, 'Software Engineer', 80000, 4);

-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 3, 1),
  (4, 'Emily', 'Williams', 4, 1),
  (5, 'David', 'Brown', 4, 1);
