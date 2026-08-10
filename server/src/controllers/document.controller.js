import prisma from "../lib/prisma.js";

const getDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
    });
  }
};

const createDocument = async (req, res) => {
  try {
    const { title, filename } = req.body;

    if (!title || !filename) {
      return res.status(400).json({
        success: false,
        message: "Title and filename are required",
      });
    }

    const document = await prisma.document.create({
      data: {
        title,
        filename,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document created successfully",
      document,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create document",
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch document",
    });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const document = await prisma.document.create({
      data: {
        title: req.body.title || req.file.originalname,
        filename: req.file.filename,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
      file: req.file,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload document",
    });
  }
};

const updateDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, filename } = req.body;

    const existingDocument = await prisma.document.findUnique({
      where: { id },
    });

    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const document = await prisma.document.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(filename !== undefined && { filename }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update document",
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await prisma.document.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete document",
    });
  }
};

export {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocument,
};
