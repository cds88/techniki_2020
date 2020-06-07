import * as React from "react";

import { AllAppActions } from "../reducers/actions/AllActionsTypes";

import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppState } from "../reducers/ConfigureStore";
import { connect } from "react-redux";

import * as dataTypes from "../reducers/reducer_data/DataTypes";

import DetailsContentComponent from "./DetailsContentComponent";

import { AnimatePresence, motion } from "framer-motion";

import { datas } from "../../dataSets2";
export interface DetailsProps {}

interface LinkStateToProps {
  countries: dataTypes.Country[];
  currentCountry: string;
}

const mapStateToProps = (
  state: AppState,
  ownProps: DetailsProps
): LinkStateToProps => ({
  countries: state.DataReducer.Countries,
  currentCountry: state.InterfaceReducer.CurrentCountry,
});

interface LinkDispatchToProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllAppActions>,
  ownProps: DetailsProps
): LinkDispatchToProps => ({});

type Props = DetailsProps & LinkStateToProps & LinkDispatchToProps;

const DetailsComponent = (Props: Props) => {
  React.useEffect(() => {
    const country = datas[`${Props.currentCountry}`];
  }, [Props.currentCountry]);

  const country = Props.currentCountry
    ? datas[`${Props.currentCountry}`]
    : { id: 0, title: "", about: "" };
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 additional-content">
      <div id="additional-content-wrapper">
        <DetailsContentComponent
          id={country.id}
          title={country.title}
          content={country.about}
        />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);
