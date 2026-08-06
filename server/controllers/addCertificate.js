import Certificate from "../models/Certificate.js";

const postCertificate = async (req, res) => {
    const { title, imageUrl, completionDate } = req.body;

    const newCertificate = new Certificate({
        title,
        imageUrl,
        completionDate
    });

    try{
        const savedCertificate = await newCertificate.save();

        return res.json({
            success: true,
            message: "Certificate created Successfully",
            data: savedCertificate,
        })
    }
    catch(error){
        return res.json({
            success: false,
            message: `Certificate creation failed: ${error.message}`,
            data: null,
        })
    }
}

const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find();

        return res.json({
            success: true,
            message: "Certificates fetched successfully",
            data: certificates,
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: `Failed to fetch certificates: ${error.message}`,
            data: null,
        });
    }
}

export { postCertificate, getCertificates };
