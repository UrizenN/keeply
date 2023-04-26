import React from 'react';
import Alert from '@mui/material/Alert';

export const LoginEvent = (props) => {
  
    if(props.event === 'error'){
        return  <div><Alert variant="outlined" severity="error">This is an error alert — check it out!</Alert></div>
    }
    else if(props.event === 'success'){
        return  <div><Alert variant="outlined" severity="success">This is an success alert — check it out!</Alert></div>
    }
}

