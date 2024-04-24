import React from "react";
import "./EmployeePage.css"
import MyButton from "../UI/MyButton/MyButton";

const EmployeeItem = ({item, selectedEmployee, onSelect, onRemove}) =>{

    const handleRemoveEmployeeInProject = () =>{
        onRemove(item);
    }

    const handleSelectedEmployee = () =>{
        onSelect(item);
    }

    return(
        <div className={`EmployeeItem ${selectedEmployee && item.id === selectedEmployee.id ? 'isSelected2' : ''}`}
         onClick={handleSelectedEmployee}>
                {onRemove && <MyButton className="removeButton" onClick={handleRemoveEmployeeInProject}>X</MyButton>}
            <div className="info">
            <span>Имя: {item.name}</span>
            <span>Фамилия: {item.surname}</span>
            <span>Отчество: {item.patronymic}</span>
            <span>Email: {item.email}</span>
            </div>

        </div>
    );
}

export default EmployeeItem;