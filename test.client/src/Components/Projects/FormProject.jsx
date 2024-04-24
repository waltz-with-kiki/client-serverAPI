import React, { useState, useEffect } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import MyModal from '../UI/MyModal/MyModal';
import MySelect from '../UI/MySelect/MySelect';

const FormProject = ({ active, SetActive, onAddProject, selectedProject, Employees, ...props }) => {

    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = [...e.dataTransfer.files];
        setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    };

    const handleFileSelect = (e) => {
        const selectedFiles = [...e.target.files];
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleRemoveFile = (index, e) => {
        e.stopPropagation(); 
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

  const [NewProject, setNewProject] = useState({
    projectName: "", 
    customerCompany: "", 
    companyPerformer: "",
    supervisor: null,
    supervisorId: "",
    start: "",
    end: "",
    priority: ""
});

  useEffect(() => {
    console.log(selectedProject);
    if (selectedProject !== null && selectedProject !== undefined) {
      setNewProject(selectedProject);
    }
  }, [selectedProject]);


  const AddNewProject = async (e) => {
    e.preventDefault();
    try {
 
      await onAddProject(NewProject);
      setNewProject({
        projectName: '', 
        customerCompany: '', 
        companyPerformer: '',
        supervisor: null,
        supervisorId: '',
        start: '',
        end: '',
        priority: ''
      });
    } catch (error) {
      console.error('Ошибка при добавлении/изменении проекта:', error);
    }
  };


const combinedOptions = (Employees || []).map(employee => ({
  id: employee.id,
  value: employee.id,
  name: `${employee.surname ?? ''} ${employee.name ?? ''} ${employee.patronymic ?? ''}`,
}));


  return (
    <div>
      <MyModal active={active} setActive={SetActive}>
      <MyInput value={NewProject.projectName} onChange={(e) => setNewProject({...NewProject, projectName: e.target.value})}>Название проекта: </MyInput>
      <MyInput value={NewProject.customerCompany} onChange={(e) => setNewProject({...NewProject, customerCompany: e.target.value})}>Компания-заказчик: </MyInput>
      <MyInput value={NewProject.companyPerformer} onChange={(e) => setNewProject({...NewProject, companyPerformer: e.target.value})}>Компания-исполнитель: </MyInput>
      <MySelect baseOption={"Руководитель"} options={combinedOptions} valueField="id" value={NewProject.supervisorId} onChange={(value) => setNewProject({...NewProject, supervisorId: value})}></MySelect>
      <MyInput type="date" value={NewProject.start} onChange={(e) => setNewProject({...NewProject, start: e.target.value})}>Начало проекта: </MyInput>
      <MyInput type="date" value={NewProject.end} onChange={(e) => setNewProject({...NewProject, end: e.target.value})}>Окончание проекта: </MyInput>
      
      <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('fileInput').click()}
            style={{
                border: "2px dashed #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                margin: "20px",
                cursor: "pointer",
                position: "relative"
            }}
        >
            {files.length == 0 && <p>Перетащите файлы сюда или щелкните, чтобы выбрать</p>}
            <input
                id="fileInput"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />
            {files.length > 0 && (
                <div>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                {file.name} - {formatSize(file.size)}
                                <button onClick={(e) => handleRemoveFile(index, e)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      
      <MyInput value={NewProject.priority} onChange={(e) => setNewProject({...NewProject, priority: e.target.value})}>Приоритет: </MyInput>

      <MyButton onClick={AddNewProject}>Сохранить</MyButton>
      </MyModal>
    </div>
  );
};

export default FormProject;