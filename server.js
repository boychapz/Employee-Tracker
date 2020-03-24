const mysql = require("mysql");
const inquirer = require("inquirer");

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Management_db"
});
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "listMenu",
        message: "What do you want to do",
        choices: [
          "Add Departments",
          "Add Roles",
          "Add Employee",
          "View Department",
          "View Roles",
          "View Employee",
          "Update Employee",
          "Delete Employee",
          "Quit"
        ]
      }
    ])
    .then(function(result) {
      switch (result.listMenu) {
        case "Add Departments":
          console.log("Add Departments");
          addDepartment();
          break;
        case "Add Roles":
          console.log("Add Roles");
          addRole();
          break;
        case "Add Employee":
          console.log("Add Employee");
          addEmployee();
          break;
        case "View Department":
          console.log("View Department");
          viewDepartment();
          break;
        case "View Roles":
          console.log("View Roles");
          viewRoles();
          break;
        case "View Employee":
          console.log("View Employee");
          viewEmployee();
          break;

        case "Update Employee":
          console.log("Update Employee");
          updateEmployee();
          break;
        case "Delete Employee":
          console.log("Delete Employee");
          deleteEmployee();
          break;
        case "Quit":
          console.log("quit");
          Quit();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter a new department"
      }
    ])
    .then(function(result) {
      connection.query(
        "INSERT into department (name) Values(?)",
        [result.addDepartment],
        function(err) {
          if (err) throw err;
          viewDepartment();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Add a New Role Title"
      },

      {
        type: "input",
        name: "roleSalary",
        message: "Enter a Salary for the new role"
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter a new role's department Id"
      }
    ])
    .then(function(result) {
      console.log(result);
      var departmentNum = 4;
      if (result.roleId <= departmentNum) {
        result.roleId = departmentNum + 1;
        departmentNum = result.roleId;
        console.log("The New department ID is ", departmentNum);
      } else if (result.roleId > departmentNum) {
        departmentNum = result.roleId;
        console.log(departmentNum);
      }

      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
        [result.addRole, result.roleSalary, departmentNum],
        function(err) {
          if (err) throw err;
          viewRoles();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "Input",
        name: "firstName",
        message: "Enter the employee's first name: "
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name: "
      },
      {
        type: "Input",
        name: "firstName",
        message: "Enter the employee's first name: "
      },
      {
        type: "Input",
        name: "roleId",
        message: "Enter the department role Id: "
      },
      {
        type: "Input",
        name: "isManager",
        message: "If manager, enter manager ID?: "
      }
    ])
    .then(function(result) {
      console.log(result);

      let input =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)";
      connection.query(
        input,
        [result.firstName, result.lastName, result.roleId, result.isManager],
        function(err) {
          if (err) throw err;
          viewEmployee();
        }
      );
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function(err, result) {
    if (err) throw err;
    console.table(result);
    mainMenu();
  });
}

function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err, result) {
    if (err) throw err;
    console.table(result);
    mainMenu();
  });
}

function viewRoles() {
  connection.query("SELCT * FROM roles", function(err, result) {
    if (err) throw err;
    console.table(result);
    mainMenu();
  });
}

function updateEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    var firstname = [];
    var lastname = [];
    var newRole = [];
    for (var i = 0; i < res.length; i++) {
      firstname.push(res[i].first_name);
      lastname.push(res[i].last_name);
      newRole.push(res[i].role_id);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "updateMenu",
          message: "What do you want to update? ",
          choices: ["Role", "First Name", "Last Name"]
        }
      ])
      .then(function(result) {
        switch (result.updateMenu) {
          case "Role":
            console.table(res);
            updateRole();
            break;

          case "First Name":
            console.table(res);
            updateFirstname();
            break;
          case "Last Name":
            console.table(res);
            updateLastname();
            break;
        }

        function updateFirstname() {
          inquirer
            .prompt([
              {
                type: "list",
                name: "selectEmployee",
                message: "Select employee to update",
                choices: firstname
              },
              {
                type: "input",
                name: "newFirstName",
                message: "Enter new First Name"
              },
              {
                type: "input",
                name: "empId",
                message: "Enter the ID of the employee you are updating"
              }
            ])
            .then(function(output) {
              connection.query(
                "UPDATE employee SET first_name = ? WHERE id = ?",
                [output.newFirstName, output.empId],
                function(err) {
                  if (err) throw err;
                  mainMenu();
                }
              );
            });
        }
        function updateLastname() {
          inquirer
            .prompt([
              {
                type: "list",
                name: "selectEmployee",
                message: "Select employee to update",
                choices: lastname
              },
              {
                type: "input",
                name: "newLastName",
                message: "Enter new Last Name"
              },
              {
                type: "input",
                name: "empId",
                message: "Enter the ID of the employee you are updating"
              }
            ])
            .then(function(newlname) {
              connection.query(
                "UPDATE employee SET first_name = ? WHERE id = ?",
                [newlname.newLastName, newlname.empId],
                function(err) {
                  if (err) throw err;
                  mainMenu();
                }
              );
            });
        }
        function updateRole() {
          inquirer
            .prompt([
              {
                type: "list",
                name: "selectEmployee",
                message: "Select employee to update",
                choices: firstname
              },
              {
                type: "input",
                name: "newroleid",
                message: "Enter new Role ID"
              },
              {
                type: "input",
                name: "empId",
                message: "Enter the ID of the employee you are updating"
              }
            ])
            .then(function(newid) {
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [newid.newroleid, newid.empId],
                function(err) {
                  if (err) throw err;
                  mainMenu();
                }
              );
            });
        }
      });
  });
}

function deleteEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    var employee = [];
    for (var i = 0; i < res.length; i++) {
      employee.push(res[i].first_name);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "deleteEmp",
          message: "select employee to delete",
          choices: employee
        },
        {
          type: "input",
          name: "employeeid",
          message: "select employee's ID to delete'"
        }
      ])
      .then(function(res) {
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          [res.employeeid],
          function(err) {
            if (err) throw err;
            mainMenu();
          }
        );
      });
  });
}

function Quit() {
  console.log("Bye bye !!");
  connection.end();
}
