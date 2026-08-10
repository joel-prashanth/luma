const documents = [
  {
    id: 1,
    title: "DBMS Module 1",
    filename: "dbms-module-1.pdf",
  },
  {
    id: 2,
    title: "Operating Systems Notes",
    filename: "os-notes.pdf",
  },
];

const getDocuments = (req, res) => {
  res.json({
    success: true,
    documents,
  });
};

const createDocument = (req, res) => {
  const { title, filename } = req.body;

  if (!title || !filename) {
    return res.status(400).json({
      success: false,
      message: "Title and filename are required",
    });
  }

  const newDocument = {
    id: documents.length + 1,
    title,
    filename,
  };

  documents.push(newDocument);

  res.status(201).json({
    success: true,
    message: "Document created successfully",
    document: newDocument,
  });
};

module.exports = {
  getDocuments,
  createDocument,
};