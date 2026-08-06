import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: [String]
    },
    demoLink: {
        type: String
    },
    githubLink: {
        type: String
    },
    featured: {
        type: Boolean, default: false
    }
}, { timestamps: true });

const Project = model("Project", ProjectSchema);

export default Project;