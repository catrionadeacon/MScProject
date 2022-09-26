import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { InputInvoice, InvoiceList } from '../Invoice';

function InvoiceTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
InvoiceTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
export function InvoiceTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', marginTop: 'none'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
              value={value} 
              onChange={handleChange}
              centered
              aria-label="invoice tabs"
          >
            <Tab label="View All Invoices" {...a11yProps(0)} />
            <Tab label="Input New Invoice" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ width: '95%'}}>
          <InvoiceTabPanel value={value} index={0}>
            <InvoiceList/>
          </InvoiceTabPanel>
          <InvoiceTabPanel value={value} index={1}>
            <InputInvoice/>
          </InvoiceTabPanel>
        </Box>
      </Box>
    );
}
  