const patient = require("./dbConn");

async function RowDelete(req, res) {
  const id = req.body.id
  patient.findOneAndDelete({_id:id},(error,result)=>{
    if(error){
      console.log(error)
    }else{
      res.end()
    }
  });
}

module.exports = RowDelete;
