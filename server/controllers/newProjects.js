import Project from "../models/Project.js";

const postProject = async (req, res) => {
    const { title, description, imageUrl, demoLink, githubLink, featured } = req.body;

    const newProject = new Project({
        title,
        description,
        imageUrl,
        demoLink,
        githubLink,
        featured
    });

    try{
        const savedProject = await newProject.save();

        return res.json({
            success: true,
            message: "Project created Successfully",
            data: savedProject,
        })
    }
    catch(error){
        return res.json({
            success: false,
            message: `Project creation failed: ${error.message}`,
            data: null,
        })
    }
}



export { postProject}