import { useEffect, useState } from 'react';
import './App.css';
import MyButton from './Components/UI/MyButton/MyButton';
import ProjectPage from './Components/Projects/ProjectPage';
import EmployeePage from './Components/Employees/EmployeePage';

function App() {

    const [thisPage, setThisPage] = useState('Projects');

    const Page = () =>{
        switch (thisPage) {
            case 'Projects':
                return<ProjectPage></ProjectPage>
                break;
                case 'Employees':
                    return<EmployeePage></EmployeePage>
                    break;
        
            default:
                break;
        }
    }

    useEffect(() => {
        console.log(thisPage);
    },[thisPage])


    return (
        <div>
            <div className='button-container'>
            <div className="App-buttons-form">
            <MyButton onClick={e => setThisPage('Projects')}>Projects</MyButton>
            <MyButton onClick={e => setThisPage('Employees')}>Employees</MyButton>
            </div>
            </div>


            {Page()}

        </div>
    )
}

export default App;