/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  const appName = "ConvNet Playground";
  const appDescription = "ConvNet Playground";
  return (
    <div>
      <div className="headermain" aria-label={appDescription}>
        <div className="container-fluid w100 headerrow pl10 ">
          <div className="flex    h100">
            <div className="h100   flex flexjustifycenter mr10  ">
              <a href={process.env.PUBLIC_URL + "/#"}>
                <img
                  className="headericon"
                  src="images/icon.png"
                  alt="NeuralQA logo"
                />
              </a>
            </div>
            <div className="h100 apptitle  flex flexjustifycenter  mr10">
              <div className="whitetext boldtext  iblock mr10"> {appName} </div>
            </div>
            <div className="h100   flex flexjustifycenter  navbarlinks ">
              <NavLink exact to="/">
                {" "}
                Semantic Search{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="headerboost"> </div>
    </div>
  );
}
