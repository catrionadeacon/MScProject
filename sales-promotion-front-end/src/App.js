import "./App.css";
import Sidebar from "./components/navigation/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { User, ChangePassword } from "./pages/User";
import { Users, EditUser, NewUser } from "./pages/Users";
import { Promotions, PromotionAnalysis, PromotionPrices } from "./pages/Promotions";
import { Products } from "./pages/Products";
import { ProductPriceChange, PricebookPriceChange} from "./pages/PriceChange";
import { Customers, Pricebook} from "./pages/Customers";
import { Paf } from "./pages/Paf";
import { Invoice, InvoiceDetails, InvoiceRequests } from "./pages/Invoice";
import { MyRequests } from "./pages/MyRequests";
import { PafRequests, PafRequestDetails} from "./pages/PafRequests";
import {  PricebookPriceChangeRequestDetails, PriceChangeRequests, ProductPriceChangeRequestDetails } from "./pages/PriceChangeRequests";
import { Login } from "./pages/Login";
import { Outlet } from 'react-router-dom';
import { OffInvoicePriceChanges, PriceChangeInDetails, PriceChangeOutDetails } from "./pages/OffInvoicePriceChanges";


function RequireAuth(){
  const token = sessionStorage.getItem("jwt");

  if(token !== null){
    return false;
  }
  else{
    return true;
  }
}

const ProtectedRoute = ({children}) => {
  if(RequireAuth()){
    console.log("requires auth")
    return <Navigate to="/login"/>;
  }
  return children;
}

const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {

  const token = sessionStorage.getItem("jwt");

  console.log(token);

  return (
    <div className="app">

      <Routes>
        <Route element={<SidebarLayout/>}>
          <Route path="/" exact element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="/user" exact element={<ProtectedRoute><User/></ProtectedRoute>}></Route>
          <Route path="/user/change_password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}></Route>
          <Route path="/users" exact element={<ProtectedRoute><Users/></ProtectedRoute>}></Route>
          <Route path="/edit_user/:id" exact element={<ProtectedRoute><EditUser/></ProtectedRoute>}></Route>
          <Route path="/new_user" exact element={<ProtectedRoute><NewUser/></ProtectedRoute>}></Route>
          <Route path="/promotions" exact element={<ProtectedRoute><Promotions/></ProtectedRoute>}></Route>
          <Route path="/promotion_prices/:id" exact element={<ProtectedRoute><PromotionPrices/></ProtectedRoute>}></Route>
          <Route path="/promotion_analysis/:id" exact element={<ProtectedRoute><PromotionAnalysis/></ProtectedRoute>}></Route>
          <Route path="/products" exact element={<ProtectedRoute><Products/></ProtectedRoute>}></Route>
          <Route path="/product_price_change/:id" exact element={<ProtectedRoute><ProductPriceChange/></ProtectedRoute>}></Route>
          <Route path="/pricebook/:id/price_change" exact element={<ProtectedRoute><PricebookPriceChange/></ProtectedRoute>}></Route>
          <Route path="/customers" exact element={<ProtectedRoute><Customers/></ProtectedRoute>}></Route>
          <Route path="/pricebook/:id" element={<ProtectedRoute><Pricebook/></ProtectedRoute>}></Route>
          <Route path="/paf" exact element={<ProtectedRoute><Paf/></ProtectedRoute>}></Route>
          <Route path="/invoice" exact element={<ProtectedRoute><Invoice/></ProtectedRoute>}></Route>
          <Route path="/invoice_requests" exact element={<ProtectedRoute><InvoiceRequests/></ProtectedRoute>}></Route>
          <Route path="/invoice_details/:id" exact element={<ProtectedRoute><InvoiceDetails/></ProtectedRoute>}></Route>
          <Route path="/my_paf_requests" exact element={<ProtectedRoute><MyRequests/></ProtectedRoute>}></Route>
          <Route path="/paf_requests" exact element={<ProtectedRoute><PafRequests/></ProtectedRoute>}></Route>
          <Route path="/paf_details/:id" exact element={<ProtectedRoute><PafRequestDetails/></ProtectedRoute>}></Route>
          <Route path="/price_change_requests" exact element={<ProtectedRoute><PriceChangeRequests/></ProtectedRoute>}></Route>
          <Route path="/product_request_details/:id" exact element={<ProtectedRoute><ProductPriceChangeRequestDetails/></ProtectedRoute>}></Route>
          <Route path="/pricebook_request_details/:customerCode/:id" exact element={<ProtectedRoute><PricebookPriceChangeRequestDetails/></ProtectedRoute>}></Route>
          <Route path="/off_invoice_price_changes" exact element={<ProtectedRoute><OffInvoicePriceChanges/></ProtectedRoute>}></Route>
          <Route path="/price_change_in_details/:pafRef/:sku" exact element={<ProtectedRoute><PriceChangeInDetails/></ProtectedRoute>}></Route>
          <Route path="/price_change_out_details/:pafRef/:sku" exact element={<ProtectedRoute><PriceChangeOutDetails/></ProtectedRoute>}></Route>
        </Route>
        <Route path="/login" exact element={<Login/>}></Route>
      </Routes>
        
      
    </div>
  );
}
  
export default App;
