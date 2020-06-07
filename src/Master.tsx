import DetailsContentComponent from "./components/DetailsContentComponent" 
import ModalComponent from "./components/ModalComponent" 

import DetailsComponent from "./components/DetailsComponent" 
 
import EuropeComponent from "./components/EuropeComponent"
import NavigationComponent from './components/NavigationComponent';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import './styles/Master.scss';
import styled from "styled-components";
import axios from 'axios';
import { AllAppActions } from './reducers/actions/AllActionsTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from 'redux';
import { AppState } from "./reducers/ConfigureStore";
import {FetchCountries} from './reducers/actions/AllActions';
import {GetCurrentCountry} from './reducers/actions/AllActions';

import {AnimatePresence} from 'framer-motion';
import {Country} from './reducers/reducer_data/DataTypes';

export interface MasterProps {

}

interface LinkStateToProps{
  currentCountry: string;
  isModalOpened: boolean;
}
const mapStateToProps=(state:AppState, ownProps: MasterProps):LinkStateToProps=>({
  currentCountry: state.InterfaceReducer.CurrentCountry,
  isModalOpened: state.InterfaceReducer.isModalOpened
})  
interface LinkDispatchToProps{
    fetchCountries:()=>void;
    getCurrentCountry:()=> void;
}
const mapDispatchToProps=(dispatch: ThunkDispatch<any, any, AllAppActions>, ownProps: MasterProps):LinkDispatchToProps=>({
    fetchCountries: bindActionCreators(FetchCountries, dispatch),
    getCurrentCountry: bindActionCreators(GetCurrentCountry, dispatch)
})
type Props = MasterProps & LinkStateToProps & LinkDispatchToProps;
const Master = (Props: Props) => {

 

    React.useEffect(()=>{
      
     
    },[Props.currentCountry])
 
    const [navbar, setNavbar ] = React.useState(false)
 
    return (
      <div className="container-fluid">
        <div className={`navigation ${navbar ? "nav-active" : ""}`}>
          <button
          id="forms-button"
          className={`${navbar? "forms-active":""}`}

            onClick={() => {
              setNavbar(!navbar);
            }}
          >
            {
              navbar? "Close forms" : "Open forms"
            }
          </button>

          <AnimatePresence>
            {
            navbar && <NavigationComponent />
            }
            
            </AnimatePresence>
        </div>
        <div className="row" id="main-page">
          <EuropeComponent isModalOpened={Props.isModalOpened} />
          <DetailsComponent />

          {Props.isModalOpened && (
            <ModalComponent
              isModalOpened={Props.isModalOpened}
              country_id={Props.currentCountry}
            />
          )}
        </div>
      </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(Master);





