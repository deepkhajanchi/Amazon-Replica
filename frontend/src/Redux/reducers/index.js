import { combineReducers } from 'redux';
import sellerLoginReducer from './seller/loginReducer';
import customerLoginReducer from "./customer/loginReducer";
import adminLoginReducer from "./admin/loginReducer";
import customerPaymentReducer from "./customer/payment"
import customerProductReducer from "./customer/productReducer";
import customerReviewReducer from "./customer/reviewReducer";
import sellerProductReducer from "./seller/productReducer";
import cartReducer from "./customer/cartReducer";

import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
    sellerLogin : sellerLoginReducer,
    customerLogin : customerLoginReducer,
    adminLogin : adminLoginReducer,
    customerPayment : customerPaymentReducer,
    customerProductData: customerProductReducer,
    customerReviewData: customerReviewReducer,
    cart : cartReducer,
    sellerProductData: sellerProductReducer,
})


const allReducers = (state, action) => {
    // if (action.type === SIGN_OUT) {
    //     // for all keys defined in your persistConfig(s)
    //     storage.removeItem('persist:root')
    //     // storage.removeItem('persist:otherKey')
    //     state = undefined;
    // }
    return rootReducer(state, action);
};
export default allReducers;
// export default rootReducer;