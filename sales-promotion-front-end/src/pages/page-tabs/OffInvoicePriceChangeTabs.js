import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PriceChangesIn, PriceChangesOut } from "../OffInvoicePriceChanges";


function OffInvoicePriceChangesTabPanel(props) {
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
  
  OffInvoicePriceChangesTabPanel.propTypes = {
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
  
  export function OffInvoicePriceChangeTabs() {
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
              aria-label="basic tabs example"
          >
            <Tab label="Price Change In" {...a11yProps(0)} />
            <Tab label="Price Change Out" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <OffInvoicePriceChangesTabPanel value={value} index={0}>
          <PriceChangesIn/>
        </OffInvoicePriceChangesTabPanel>
        <OffInvoicePriceChangesTabPanel value={value} index={1}>
          <PriceChangesOut/>
        </OffInvoicePriceChangesTabPanel>
      </Box>
    );
  }
