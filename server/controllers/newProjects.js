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

const deleteProject = async (req, res) => {
    try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.json({
        success: false,
        message: "Project not found",
        data: null
      });
    }

    return res.json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Project deletion failed: ${error.message}`,
      data: null,
    });
  }

}


export { postProject, deleteProject}