import './App.scss';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Pagination } from 'antd';
import axios from 'axios';

import nameIcon from './assets/nameIcon.png';
import emailIcon from './assets/emailIcon.png';
import positionIcon from './assets/positionIcon.png';

function App() {
  const [tab, setTab] = useState('counter')
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5


  async function addNew(e: any) {
    e.preventDefault();
    try {
      const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        position: document.getElementById("position").value,
      };
      axios.post('https://609940d499011f00171407d6.mockapi.io/api/tesst/Employess', body)
        .then(function (response) {
          if (response?.status === 200) {
            setTableData(response?.data)
          }
          console.log(response);
          alert("Thành công chọn page cuối cùng để xem giá trị add mới");
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        })
    } catch {
    }
  }

  useEffect(() => {
    axios.get('https://609940d499011f00171407d6.mockapi.io/api/tesst/Employess')
      .then(function (response) {
        if (response?.status === 200) {
          setTableData(response?.data)
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  })

  const changePage = (page) => {
    setCurrentPage(page)
  }

  const renderCounter = () => {
    return (
      <div className="counterDiv">
        <div className="counterNumber">
          {counter}
        </div>

        <div className="buttonRow">
          <button className="resetBtn" onClick={() => setCounter(0)}>Reset</button>
          <button className="increaseBtn" onClick={() => setCounter(counter + 1)}>Increase</button>
        </div>
      </div>
    )
  }

  const renderTable = () => {
    return (
      <div className="tableDiv">
        <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th><img src={nameIcon} className="icon" />Name</th>
              <th><img src={emailIcon} className="emailicon" />Email</th>
              <th><img src={positionIcon} className="positionicon" />Position</th>
            </tr>
          </thead>

          <tbody>
            {tableData?.length > 0 && tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage).map((data, index) =>
              <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.position}</td>
              </tr>
            )}
          </tbody>
        </table>
        <br></br>
        <form onSubmit={addNew} >
        <button className="new" type="submit">
          ➕ New
        </button>
        <div className="new">
          <thead>
            <tr>
              <th><input id="name" /> Name</th>
              <th><input id="email" /> Email</th>
              <th><input id="position" />Position</th>
            </tr>
          </thead>
        </div>
        </form>
        

        <Pagination pageSize={pageSize} onChange={changePage} total={tableData?.length} />
      </div>
    )
  }

  return (
    <div className="App">
      <div className="tabSwitch">
        <div className={tab === 'counter' ? "counter active" : "counter"} onClick={() => setTab('counter')}>Counter</div>
        <div className={tab === 'table' ? "Table active" : "Table"} onClick={() => setTab('table')}>Table</div>
      </div>

      {tab === 'counter'
        ? renderCounter()
        : renderTable()
      }
    </div>
  );
}

export default App;
