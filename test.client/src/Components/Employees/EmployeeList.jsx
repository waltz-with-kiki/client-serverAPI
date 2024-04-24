import React from "react";
import EmployeeItem from "./EmployeeItem";
import "./EmployeePage.css"

const EmployeeList = ({Employees, selectedEmployee, onSelect, onRemove, children}) =>{

    return(
        <div className="EmployeesList">
            {Employees.map((employee) =>(
                <EmployeeItem
                key={employee.id}
                item={employee}
                onSelect={onSelect}
                onRemove={onRemove}
                selectedEmployee={selectedEmployee}
                ></EmployeeItem>
            ))}

            {children}
        </div>
    );
}

export default EmployeeList;