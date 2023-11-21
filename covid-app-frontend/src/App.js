import './App.css';
import { useState, useEffect } from 'react'
import declarationService from "./services/declarations";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, useTheme } from '@mui/material';


function App() {
  const [declarations, setDeclarations] = useState([])
  const [name, setName] = useState("")
  const [temp, setTemp] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [inContact, setInContact] = useState("")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    declarationService.getAll().then((initialDeclarations) => {
      initialDeclarations.Items.map(declaration=> console.log(declaration))
      setDeclarations(initialDeclarations.Items);
    });
  }, []);

  const submitDeclaration = (event) => {
    event.preventDefault();
    const declarationObject = {
      name: name,
      temperature: temp,
      symptoms: symptoms,
      inContact: inContact
    }

    declarationService
      .create(declarationObject)
      .then((declarationObject) => {
        setDeclarations(declarations.concat(declarationObject))
        setName("")
        setTemp("")
        setSymptoms("")
        setInContact("")
      })
      .catch((error)=> {
        console.log(error.response.data)
      })

    console.log('Form submitted')
  }

  // Function to set new input name
  var handleNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  // Function to set new input temperature
  var handleTempChange = (event) => {
    console.log(event.target.value);
    setTemp(event.target.value);
  };

  // Function to set new input symptoms
  var handleSymptomChange = (event) => {
    console.log(event.target.value);
    setSymptoms(event.target.value);
  };

  // Function to set new input in contact
  var handleinContactChange = (event) => {
    console.log(event.target.value);
    setInContact(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - declarations.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="App"> 
      <h2> Covid-19 Declaration Form </h2>

    <form onSubmit={submitDeclaration}>
      <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
        <Grid item> 
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Grid>
        <Grid item> 
          <TextField 
            id="temp-input"
            name="temperature"
            label="Temperature (°C)"
            type="number"
            value={temp}
            onChange={handleTempChange}
            required
          />
        </Grid>
        <Grid item> 
          <FormControl>
            <FormLabel style={{ padding: "0px 400px"}}>Do you have any of the following symptoms now or within the last 14 days: Cough, smell/taste impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhoea, and / or runny nose (even if your symptoms are mild)?</FormLabel>
            <RadioGroup
              name="symptoms"
              value={symptoms}
              onChange={handleSymptomChange}
              row
              style={{margin: "auto"}}
            >
              <FormControlLabel
                key="yes"
                value="yes"
                control={<Radio size="small" required={true}/>}
                label="Yes"
              />
              <FormControlLabel
                key="no"
                value="no"
                control={<Radio size="small" required={true}/>}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>  
          <FormControl>
            <FormLabel>Have you been in contact with anyone who is suspected to have or/has been diagnosed with Covid-19 within the last 14 days?</FormLabel>
            <RadioGroup
              name="inContact"
              value={inContact}
              onChange={handleinContactChange}
              row
              style={{margin: "auto"}}
            >
              <FormControlLabel
                key="yes"
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                key="no"
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
          Submit
      </Button>
     </form>

      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"> Name </TableCell>
              <TableCell align="right"> Temperature (°C) </TableCell>
              <TableCell align="right"> Any symptoms over last 14 days? </TableCell>
              <TableCell align="right"> In contact with infected over last 14 days? </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {(rowsPerPage > 0
              ? declarations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : declarations
              ).map((declaration) => ( // forEach doesn't work here. Not sure why.
                <TableRow key={declaration.declarationID.S}>
                  <TableCell align="right">{declaration.name.S}</TableCell>
                  <TableCell align="right">{declaration.temperature.S}</TableCell>
                  <TableCell align="right">{declaration.symptoms.L.toString()}</TableCell>
                  <TableCell align="right">{declaration.inContact.BOOL.toString()}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={declarations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </div>
  );
}

export default App;
