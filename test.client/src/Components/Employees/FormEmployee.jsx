import React, { useState, useEffect } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import MyModal from '../UI/MyModal/MyModal';
import MySelect from '../UI/MySelect/MySelect';

const FormEmployee = ({ active, SetActive, onAddEmployee, selectedEmployee, ...props }) => {

  const [NewEmployee, setNewEmployee] = useState({
    name: "", 
    surname: "", 
    patronymic: "",
    email: "",
});

  useEffect(() => {
    console.log(selectedEmployee);
    if (selectedEmployee !== null && selectedEmployee !== undefined) {
      setNewEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);


  const AddNewEmployee = async (e) => {
    try {
      e.preventDefault();
    await onAddEmployee(NewEmployee);

    setNewEmployee({ name: '', surname: '', patronymic: '', email: '' }); 
    } catch (error) {
      console.error('Ошибка при добавлении/изменении сотрудника:', error);
    }
  };


  return (
    <div>
      <MyModal active={active} setActive={SetActive} height={"200px"}>
      <MyInput value={NewEmployee.name} onChange={(e) => setNewEmployee({...NewEmployee, name: e.target.value})}>Имя сотрудника: </MyInput>
      <MyInput value={NewEmployee.surname} onChange={(e) => setNewEmployee({...NewEmployee, surname: e.target.value})}>Фамилия: </MyInput>
      <MyInput value={NewEmployee.patronymic || ''} onChange={(e) => setNewEmployee({...NewEmployee, patronymic: e.target.value || null})}>Отчество: </MyInput>
      <MyInput value={NewEmployee.email} onChange={(e) => setNewEmployee({...NewEmployee, email: e.target.value})}>Email: </MyInput>

      <MyButton onClick={AddNewEmployee}>Сохранить</MyButton>
      </MyModal>
    </div>
  );
};

export default FormEmployee;