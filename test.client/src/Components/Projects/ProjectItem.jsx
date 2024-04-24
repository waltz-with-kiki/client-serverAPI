import React, { useState } from "react";
import "./ProjectPage.css"
import MyButton from "../UI/MyButton/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import EmployeeList from "../Employees/EmployeeList";

const ProjectItem = ( {item, selectedProject, onSelect, onRemove} ) =>{

    const[employeesModule, setEmployeesModule] = useState(false);

    const handleSelectedProject = () =>{
        onSelect(item);
    }

    return(
        <div className={`ProjectItem ${selectedProject && item.id === selectedProject.id ? 'isSelected' : ''}`}
         onClick={handleSelectedProject}>
            <strong>{item.projectName}</strong>
            <span>Компания-заказчик: {item.customerCompany}</span>
            <span>Компания-исполнитель: {item.companyPerformer}</span>
            <span>Руководитель: {item.supervisor.name} {item.supervisor.surname}</span>
            <span>Начало проекта: {item.start}</span>
            <span>Оконачание проекта: {item.end}</span>
            <span>Приоритет: {item.priority}</span>

        <MyButton onClick={e => setEmployeesModule(true)}>Сотрудники</MyButton>

        <MyModal active={employeesModule} setActive={setEmployeesModule} width={"500px"} height={"auto"}>
            <EmployeeList Employees={item.employees} onRemove={onRemove} onSelect={() =>{}}></EmployeeList>
        </MyModal>
        </div>
    );
}

export default ProjectItem;