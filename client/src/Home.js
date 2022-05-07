import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";


function Home() {
  const history = useHistory()
  const [tabledata, settabledata] = useState([]);
  const [response, setresponse] = useState("");
  var [totalprice, settotalprice] = useState("");
  const [iddelete, setdelete] = useState({ id: "" });
  const d = new Date().toUTCString();
  const [userValues, setUserValue] = useState({
    medicine: "",
    company: "",
    dose: "",
    price: "",
    date:d,
  });

  function HandleInput(e) {
    setUserValue({ ...userValues, [e.target.name]: e.target.value });
  }

  function SubmitData() {
    console.log(userValues)
    axios
      .post("/datasave", userValues)
      .then((res) => {
        window.location.reload(true)
      })
      .catch((err) => {
        setresponse("oops! 500 server error");
      });
  }  

  function SetId(e) {
    const name = e.target.name;
    const value = e.target.value;
    setdelete({ ...iddelete, [name]: value });
  }

  function Delete() {
    axios
      .post("/delete", iddelete)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        setresponse("oops!: 500 server error");
      });
  }

  function ExecuteTable(data) {
    return (
      <tr>
        <td>{data._id}</td>
        <td>{data.medicine}</td>
        <td>{data.company}</td>
        <td>{data.dose}</td>
        <td>{data.price}</td>
        <td>{data.date}</td>
      </tr>
    );
  }

  function getDBdata() {
    axios
      .get("/alldata")
      .then((response) => {
        const completedata = response.data;
        settabledata(completedata);
      })
      .catch(() => {
        console.log("error occured");
      });
  }

  useEffect(() => {
    getDBdata();
  }, []);

  function Prices(){
    var sum = 0;
    for(var i = 0; i < tabledata.length; i++){
    
      sum = sum + tabledata[i].price
      
    }
    settotalprice(sum)
  }

  return (
    <div>
      <div>
      <div className="MainInputFieldDiv">
        <div>
          <h1>Insert Data</h1>
          <input
            onChange={HandleInput}
            name="medicine"
            type="text"
            placeholder="Medicine Name"
          />
          <input
            onChange={HandleInput}
            name="company"
            type="text"
            placeholder="Company Name"
          />
          <input
            onChange={HandleInput}
            name="dose"
            type="number"
            placeholder="Number of Dose"
          />
          <input
            onChange={HandleInput}
            name="price"
            type="number"
            placeholder="Price"
          />
          <p className="text-danger h1">{response}</p>
          <button onClick={SubmitData} className = "bg-success text-white">Submit</button>
        </div>
        <div>
        <h1>Delete Row</h1>
        <input onChange={SetId} placeholder="Enter Id" name="id" />
          <button onClick={Delete} className = "bg-danger text-white">
            Delete-Row
          </button>
        </div>
        <div>
        <h1>Total Income</h1>
          <button onClick={Prices} className = "MycutomColor">Sum-of-prices</button>
          <p className="h3">{totalprice}</p>
        </div>
      </div>
      </div>
      <div className="tableMainDiv">
      <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Company</th>
                <th>Dose</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
              {tabledata.map(ExecuteTable)}
            </table>
          </div>
      </div>
    </div>
  );
}

export default Home;
