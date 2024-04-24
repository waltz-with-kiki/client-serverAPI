import React from "react";
import ProjectItem from "./ProjectItem";
import "./ProjectPage.css"

const ProjectList = ({Projects, selectedProject, onSelect, onRemove}) =>{

    return(
        <div className="ProjectList">
            {Projects.map((project) =>(
                <ProjectItem
                key={project.id}
                item={project}
                onSelect={onSelect}
                selectedProject={selectedProject}
                onRemove={onRemove}
                ></ProjectItem>
            ))}
        </div>
    );
}

export default ProjectList;