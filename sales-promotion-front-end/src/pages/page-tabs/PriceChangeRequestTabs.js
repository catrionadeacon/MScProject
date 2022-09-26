import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PricebookPriceChangeRequests, ProductPriceChangeRequests } from "../PriceChangeRequests";


function PriceRequestsTabPanel(props) {
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
  
  PriceRequestsTabPanel.propTypes = {
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
  
  export default function PriceChangeRequestTabs() {
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
            <Tab label="Product Price Change" {...a11yProps(0)} />
            <Tab label="Pricebook Price Change" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <PriceRequestsTabPanel value={value} index={0}>
          <ProductPriceChangeRequests/>
        </PriceRequestsTabPanel>
        <PriceRequestsTabPanel value={value} index={1}>
          <PricebookPriceChangeRequests/>
        </PriceRequestsTabPanel>
      </Box>
    );
  }
  