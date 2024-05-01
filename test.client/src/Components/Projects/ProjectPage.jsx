import { useState, useEffect, useMemo} from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import MyButton from "../UI/MyButton/MyButton";
import "./ProjectPage.css";
import FormProject from "./FormProject";
import MyModal from "../UI/MyModal/MyModal";
import MySelect from "../UI/MySelect/MySelect";


const ProjectPage = () =>{

    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);


    const [selectedProject, setSelectedProject] = useState(null);

    const [isFormVisible, setFormVisible] = useState(false);
    const [changeAddForm, setChangeAddForm] = useState(false);

    const [addEmployeeModal, setEmployeeModal] = useState(false);
    const [selectedAddEmployee, setSelectedAddEmployee] = useState('');

    const [removeModal, setRemoveModal] = useState(false);

    const [combinedOptions, setCombinedOptions] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
  

    const showForm = (changeAddForm) => {
        setFormVisible(true);
        setChangeAddForm(changeAddForm);
      };
    

    useEffect(() =>{
        fetchProjects();
        fetchEmployees();
   
    }, []);

    const fetchProjects = async () =>{
            const response = await axios.get('https://localhost:7253/api/projects/projects');
            const data = response.data;
            console.log(data);
            setProjects(data);
    }

    const fetchEmployees = async () =>{
        const response = await axios.get('https://localhost:7253/api/employees/employees');
        const data = response.data;
        console.log(data);
        setEmployees(data);
    }



    const availableEmployees = () =>{
      if (selectedProject && selectedProject.employees) {
        return employees.filter(employee => !selectedProject.employees.some(projEmployee => projEmployee.id === employee.id));
      } else {
        return;
      }
    }
    const combinedOptions2 = (availableEmployees() || []).map(employee => ({
      id: employee.id,
      value: employee.id,
      name: `${employee.surname ?? ''} ${employee.name ?? ''} ${employee.patronymic ?? ''}`,
    }));

    useEffect(() => {
      setCombinedOptions(combinedOptions2);
  }, [selectedProject]);




    const addEmployeeInProject = async () =>{
      console.log(selectedAddEmployee);
      if (selectedAddEmployee == null){
        return;
      }
      await axios.post('https://localhost:7253/api/projects/addinproject', {
        IdEmployee: selectedAddEmployee,
        IdProject: selectedProject.id
      })
      .then(function (response) {
        console.log(response);
        setCombinedOptions(combinedOptions.filter(x => x.id !== response.data.data.id));
        setSelectedAddEmployee("");
        console.log(response.data.data.id);
        console.log(combinedOptions);
        fetchProjects();
        fetchEmployees();
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    const removeEmployeeInProject = async (employee) =>{
      console.log(employee);
      if (employee == null){
        return;
      }
      await axios.post('https://localhost:7253/api/projects/removeinproject', {
        IdEmployee: employee.id,
        IdProject: selectedProject.id
      })
      .then(function (response) {
        console.log(response);
        fetchProjects();
        fetchEmployees();
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    const AddNewProject = async(newproject) =>{
      console.log(newproject);
      if(!await(isValidProject(newproject))){
        return;
      }
        await axios.post('https://localhost:7253/api/projects/newproject', {
            ProjectName: newproject.projectName,
            CustomerCompany: newproject.customerCompany,
            CompanyPerformer: newproject.companyPerformer,
            SupervisorId: newproject.supervisorId,
            Start: newproject.start,
            End: newproject.end,
            Priority: newproject.priority
          })
          .then(function (response) {
            console.log(response);
            fetchProjects();
          })
          .catch(function (error) {
            console.log(error);
          });
          setFormVisible(false);
    }

    const ChangeProject = async(changeproject) =>{
      console.log(changeproject);
      if(!await (isValidProject(changeproject))){
        return;
      }
       await axios.post('https://localhost:7253/api/projects/changeproject', {
            Id: selectedProject.id,
            ProjectName: changeproject.projectName,
            CustomerCompany: changeproject.customerCompany,
            CompanyPerformer: changeproject.companyPerformer,
            SupervisorId: changeproject.supervisorId,
            Start: changeproject.start,
            End: changeproject.end,
            Priority: changeproject.priority
          })
          .then(function (response) {
            console.log(response);
            fetchProjects();
          })
          .catch(function (error) {
            console.log(error);
          });

          setSelectedProject(null);
          setFormVisible(false);
    }

    const RemoveProject = async() =>{
      console.log(selectedProject);
        await axios.post('https://localhost:7253/api/projects/removeproject', {
            Id: selectedProject.id,
          })
          .then(function (response) {
            console.log(response);
            fetchProjects();
          })
          .catch(function (error) {
            console.log(error);
          });

          setSelectedProject(null);
          setRemoveModal(false);
    }

    const isValidProject = async (project) => {
      console.log(project)
      if (
        !project.projectName ||
        !project.customerCompany ||
        !project.companyPerformer ||
        !project.start ||
        !project.end ||
        project.supervisorId === "" ||
        project.supervisorId === undefined ||
        project.priority === "" ||
        project.priority === undefined
      )
      {
        const error = new Error("Некоторые данные не заполнены");
    throw error;
      }
      const startDate = new Date(project.start);
      const endDate = new Date(project.end);

      if (endDate <= startDate) {
        const error = new Error("Дата окончания раньше начала проекта");
    throw error;  
      }
      const maxYear = 2044;
      const endYear = endDate.getFullYear();
      if (endYear > maxYear) {
        const error = new Error("Год окончания проекта не должен быть больше 2044");
        throw error;
      }


      return true;
    }

    

    const sortedProjects = useMemo (() =>{
      if (selectedSort === 'priority') {
        return [...projects].sort((a, b) => a[selectedSort] - b[selectedSort]);
     } 
     if (selectedSort === 'projectName') {
        return [...projects].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
     }
     return projects;
    },[selectedSort, projects]);

    const SortedPriorityProjects = useMemo(() => {
      if (selectedPriority === "first") {
       return sortedProjects.filter(project => project.priority >= 1 && project.priority <= 3);
    } 
    if (selectedPriority === "second") {
       return sortedProjects.filter(project => project.priority >= 4 && project.priority <= 6);
    } 
    if (selectedPriority === "third") {
       return sortedProjects.filter(project => project.priority >= 7 && project.priority <= 10);
    }
    return sortedProjects;
  },[selectedPriority, projects, selectedSort]);


    return(
      <div className="page">
        <div className="Project-container">
            <div className="Project-buttons-form">
                <MyButton onClick={() => showForm(true)}>Добавить</MyButton>
                <MyButton onClick={selectedProject ? () => showForm(false) : () => {}}>Изменить</MyButton>
                <MyButton onClick={selectedProject ? () => setRemoveModal(true) : () =>{}}>Удалить</MyButton>
                <MyButton onClick={selectedProject ? () => setEmployeeModal(true) : () => {}} style={{ width: '220px'}}>Добавить сотрудника</MyButton>
                <MySelect 
                value={selectedSort}
                onChange={value => setSelectedSort(value)}
                valueField={"value"}
                baseOption={"Сортировать"}
                options={[
                    {value: "projectName", name: "По названию"},
                    {value: "priority", name: "По приоритету"}
                ]}
            />

                <MySelect baseOption={"По приоритету"}
                value={selectedPriority}
                valueField={"value"}
                onChange={value => setSelectedPriority(value)}
                options={[
                  {value: "zero", name: "Все"},
                  {value: "first", name: "1-3"},
                  {value: "second", name: "4-6"},
                  {value: "third", name: "7-10"}
                ]}
                ></MySelect>

            </div>

            {SortedPriorityProjects && SortedPriorityProjects.length > 0 &&(<ProjectList selectedProject={selectedProject} onSelect={setSelectedProject} Projects={SortedPriorityProjects} onRemove={removeEmployeeInProject}></ProjectList>)}

          <MyModal active={addEmployeeModal} setActive={setEmployeeModal} width={"300px"} height={"100px"}>
            <MySelect baseOption={"Сотрудники"} options={combinedOptions || []} valueField={"id"} value={selectedAddEmployee} onChange={value => setSelectedAddEmployee(value)}> </MySelect>
            <MyButton onClick={addEmployeeInProject}>Добавить</MyButton>
          </MyModal>

          <MyModal active={removeModal} setActive={setRemoveModal} height={"100px"}>
          <strong>Вы точно хотите удалить {selectedProject ? selectedProject.projectName : ''}?</strong>
          <MyButton onClick={RemoveProject}>Подтвердить</MyButton>
          </MyModal>

            {isFormVisible && (
        <div>
          {changeAddForm
            ? <FormProject active={isFormVisible} SetActive={setFormVisible} onAddProject={AddNewProject} Employees={employees}></FormProject>
            : <FormProject active={isFormVisible} SetActive={setFormVisible} onAddProject={ChangeProject} selectedProject={selectedProject} Employees={employees}></FormProject>}
        </div>
      )}
      
        </div>
        </div>
    );
}

export default ProjectPage;