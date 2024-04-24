import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import axios from "axios";
import FormEmployee from "./FormEmployee";
import MyButton from "../UI/MyButton/MyButton";
import MyModal from "../UI/MyModal/MyModal";

const EmployeePage = () =>{


    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [isFormVisible, setFormVisible] = useState(false);
    const [changeAddForm, setChangeAddForm] = useState(false);

    const [removeModal, setRemoveModal] = useState(false);


    const showForm = (changeAddForm) => {
        setFormVisible(true);
        setChangeAddForm(changeAddForm);
      };

    useEffect(() => {
        fetchEmployees();
    },[])

    const fetchEmployees = async () =>{
        const response = await axios.get('https://localhost:7253/api/main/employees');
        const data = response.data;
        console.log(data);
        setEmployees(data);
    }

    const handleAddEmployee = async (NewEmployee) => {

        if(! await (isValidEmployee(NewEmployee))){
          return
        }

        await axios.post('https://localhost:7253/api/main/newemployee', {
            Name: NewEmployee.name,
            Surname: NewEmployee.surname,
            Patronymic: NewEmployee.patronymic,
            Email: NewEmployee.email,
          })
          .then(function (response) {
            console.log(response);
            setFormVisible(false);
          })
          .catch(function (error) {
            console.log(error);
          });

        await fetchEmployees();
      };

      const checkingChanges = async (ChangeEmployee) =>{
        if(selectedEmployee.name != ChangeEmployee.name){
            return true;
        }
        if(selectedEmployee.surname != ChangeEmployee.surname){
            return true;
        }
        if(selectedEmployee.patronymic != ChangeEmployee.patronymic){
            return true;
        }
        if(selectedEmployee.email != ChangeEmployee.email){
            return true;
        }

        return false;
      }

      const handleChangeEmployee = async (ChangeEmployee) => {
        if(! await(checkingChanges(ChangeEmployee))){
          const error = new Error("Не было изменений в данных");
          throw error;
        }

        if(! await (isValidEmployee(ChangeEmployee))){
          return
        }

        console.log(selectedEmployee);
        console.log(ChangeEmployee);

        await axios.post('https://localhost:7253/api/main/changeemployee', {
            Id: selectedEmployee.id,
            Name: ChangeEmployee.name,
            Surname: ChangeEmployee.surname,
            Patronymic: ChangeEmployee.patronymic,
            Email: ChangeEmployee.email,
          })
          .then(function (response) {
            console.log(response);
            setSelectedEmployee(null);
          })
          .catch(function (error) {
            console.log(error);
          });

        setFormVisible(false);
        await fetchEmployees();
      };

      const handleRemoveEmployee = async () => {

        console.log(selectedEmployee);

        await axios.post('https://localhost:7253/api/main/removeemployee', {
            Id: selectedEmployee.id,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
        setRemoveModal(false);
        await fetchEmployees();
      };

      const isValidEmployee = async (employee) => {
        console.log(employee)
        if (
          !employee.name ||
          !employee.surname ||
          !employee.email        
        )
        {
          const error = new Error("Некоторые данные не заполнены");
      throw error;
        }
  
        return true;
      }


    return(
        <div className="page">
          <div className="Project-container">
            <div className="Project-buttons-form">
                <MyButton onClick={() => showForm(true)}>Добавить</MyButton>
                <MyButton onClick={selectedEmployee ? () => showForm(false) : () => {}}>Изменить</MyButton>
                <MyButton onClick={e => setRemoveModal(true)}>Удалить</MyButton>
            </div>


            {employees && employees.length > 0 &&(<EmployeeList Employees={employees} selectedEmployee={selectedEmployee} onSelect={setSelectedEmployee}></EmployeeList>)}

          <MyModal active={removeModal} setActive={setRemoveModal} height={"100px"}>
          <strong>Вы точно хотите удалить {selectedEmployee ? selectedEmployee.name : ''}?</strong>
          <MyButton onClick={handleRemoveEmployee}>Подтвердить</MyButton>
          </MyModal>

            {isFormVisible && (
        <div>
          {changeAddForm
            ? <FormEmployee active={isFormVisible} SetActive={setFormVisible} onAddEmployee={handleAddEmployee} Employees={employees}></FormEmployee>
            : <FormEmployee active={isFormVisible} SetActive={setFormVisible} onAddEmployee={handleChangeEmployee} selectedEmployee={selectedEmployee} Employees={employees}></FormEmployee>}
        </div>
      )}
      </div>
        </div>
    );
}

export default EmployeePage;