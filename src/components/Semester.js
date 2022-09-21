import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import {SERVER_URL} from '../constants.js'

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1 };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
    }

    handleSubmit(event) {
      fetch(`${SERVER_URL}/addStudent?name=${this.state.name}&email=${this.state.email}`, {method: 'GET'})
      .then((response) => response.json())

      alert(`Astudent was added: ${this.state.name}`);
      event.preventDefault();
    }
  
  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
              <br/>
              <br/>
              <h4>Add Student: </h4>             

            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
              </label> &nbsp;
              <label>
                Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
              </label> &nbsp;
              <input type="submit" value="Submit" />
            </form>
          </div>
      </div>
    )
  }
}
export default Semester;