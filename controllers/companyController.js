const db = require("../db");
const Company = require("../model/company");
const {saveImage} = require('./uploadImageController')

exports.Create = async (req, res) => {
  try {
    
    photo = await saveImage(req.body.photo)

    let company = new Company(req.body.name, req.body.address, photo);

    let query = `INSERT INTO company (name, address, photo) VALUES (?, ?, ?)`;

    db.query(query, [company.name, company.address, company.photo], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Create Company not success.",
        });
      }
     
      return res.status(200).json({
        message: "Create Company Successful",
      });

    });

  } catch (error) {
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

exports.GetAll = (req, res) => {
  try {
    let query = "SELECT id ,name, address FROM company";

    db.query(query, (err, result) => {
      return res.status(200).json({
        result: result,
      });
    });

  } catch (error) {
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

exports.Update = async (req, res) => {
  try {
    const q = `UPDATE company SET name = '${req.body.name}', 
      address = '${req.body.address}' WHERE id = ${req.params.id}`;

    db.query(q, (err, result) => {
      return res.status(200).json({
        message: "Company updated successfully",
      });
    });

  } catch (error) {
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

// req: request && res : response
exports.Delete = (req, res) => {
  try {
    const q = `DELETE FROM company WHERE id = ${req.params.id}`
    db.query(q, (err, result)=>{
      return res.status(200).json({
        message: "Company deleted successfully."
      })
    })
  } catch (err) {

    return res.status(500).json({
      status:"INTERNAL ERROR",
      message: err.message
    })
    
  }
}