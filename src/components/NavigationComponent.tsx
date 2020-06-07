import * as React from "react";

import { AllAppActions } from "../reducers/actions/AllActionsTypes";

import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppState } from "../reducers/ConfigureStore";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { string } from "prop-types";
export interface NavigationProps {}

interface LinkStateToProps {}

const mapStateToProps = (
  state: AppState,
  ownProps: NavigationProps
): LinkStateToProps => ({});

interface LinkDispatchToProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllAppActions>,
  ownProps: NavigationProps
): LinkDispatchToProps => ({});

type Props = NavigationProps & LinkStateToProps & LinkDispatchToProps;

const slides = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1413&q=80",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1513622790541-eaa84d356909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  "https://images.unsplash.com/photo-1543651679-34c1f0742773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1562280482-3847fb9b0b66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  "https://images.unsplash.com/photo-1556476719-c2ec46ca76c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1510505683716-2e378d654f87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1422360902398-0a91ff2c1a1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
];

// const regexes= {
// username = /^[A-Z][a-z]+$/,
// email = /^[a-z]+[@]+[a-zA-Z0-9._-]+[.]+[a-z]{2}$/,
// postal = /^[0-9]{2}-[0-9]{3}$/,
// phone = /^[(][0][0-9]{2}[)][0-9]{9}$/,

// }

const NavigationComponent = (Props: Props) => {
  const [unEntered, setUnentered] = React.useState([]);
  const [errorInputs, setErrorInputs] = React.useState([]);
  const [formData, setFormData] = React.useState<{
    username: string;
    password: string;
    email: string;
    street: string;
    postal: string;
    city: string;
  }>({
    username: "",
    password: "",
    email: "",
    street: "",
    postal: "",
    city: "",
  });

  const [inputObjects, setInputObjects] = React.useState([
    { span: "username" },
    { span: "password" },
    { span: "email" },
    { span: "street" },
    { span: "postal" },
    { span: "city" },
  ]);

  const handleFormSubmit = (e) => {
    setErrorInputs([]);
    setUnentered([]);
    e.preventDefault();

    const regexes = {
      //username : /^[A-Z][a-z]+$/,
      username: /.*/,
      email: /^[a-z]+[@]+[a-zA-Z0-9._-]+[.]+[a-z]{2}$/,
      postal: /^[0-9]{2}-[0-9]{3}$/,
      password: /.*/,
      street: /.*/,
      city: /.*/,
    };

    console.log(Object.entries(formData));

    for (const [key, val] of Object.entries(formData)) {
      if (!val) {
        setUnentered((unEntered) => [...unEntered, key]);
      } else {
        if (!regexes[key].test(val)) {
          setErrorInputs([...errorInputs, key]);
          console.log(`${key} has bad value : ${val}`);
        }
      }
    }
  };

  return (
    <motion.div
      className="navigation-forms"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="navigation-forms-shader" />
      <div className="navigation-forms-background-wrapper">
        <Slider
          speed={1500}
          slidesToShow={1}
          slidesToScroll={1}
          infinite={true}
          autoplay={true}
          dots={true}
          arrows={false}
        >
          {slides.map((url, index) => {
            return (
              <div className="background-scroll" key={index}>
                <img src={url} alt="BACKGROUND IMAGE" />
              </div>
            );
          })}
        </Slider>
      </div>

      <form className="form-wrapper" onSubmit={handleFormSubmit}>
        <div className="form-heading">
          <h2>Create account</h2>
        </div>

        {inputObjects.map((obj, index) => {
          return (
            <div className={`form-inputs form-${obj.span}`} key={index}>
              <div className="title-wraper">
                <span style={{ fontSize: "20px" }}>
                  {" "}
                  {obj.span[0].toUpperCase() + obj.span.slice(1)}
                </span>
              </div>
              <input
                type={`${
                  obj.span === "password"
                    ? "password"
                    : obj.span === "email"
                    ? "email"
                    : ""
                }`}
                required={
                  ["email", "password", "username"].includes(obj.span) && true
                }
                placeholder={`${
                  unEntered.includes(obj.span)
                    ? `enter ${obj.span}`
                    : errorInputs.includes(obj.span)
                    ? `bad ${obj.span}`
                    : ""
                }  `}
                onChange={(e) => {
                  setFormData({ ...formData, [obj.span]: e.target.value });
                  if (unEntered.includes(obj.span) && e.target.value) {
                    setUnentered(unEntered.filter((type) => type !== obj.span));
                  }
                  if (errorInputs.includes(obj.span) && e.target.value) {
                    setErrorInputs(
                      errorInputs.filter((input) => input !== obj.span)
                    );
                  }
                }}
                className={`${
                  unEntered.includes(obj.span)
                    ? "unentered"
                    : errorInputs.includes(obj.span)
                    ? "error"
                    : ""
                }`}
              />
            </div>
          );
        })}

        <div className="button-wrapper">
          <button id="button-submit" type="submit">
            Submit
          </button>
          <button
            id="button-submit"
            type="reset"
            onClick={() => {
              setFormData({
                username: "",
                password: "",
                email: "",
                street: "",
                postal: "",
                city: "",
              });
              setUnentered([]);
              setErrorInputs([]);
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default connect(null, null)(NavigationComponent);
