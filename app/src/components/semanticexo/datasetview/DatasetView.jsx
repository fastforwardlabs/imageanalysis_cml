/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "carbon-components-react";
import "./datasetview.css";

export default function DatasetView(props) {
  console.log(props.meta);
  let datasetContent = [];
  const imageBasePath = process.env.PUBLIC_URL + "/assets/semsearch/datasets/";
  for (const row of Object.keys(props.data)) {
    for (const i of props.data[row]) {
      const imagePath = imageBasePath + props.meta.name + "/" + i + ".jpg";
      datasetContent.push(imagePath);
    }
  }
  const allData = datasetContent.map((data, index) => {
    return (
      <div
        key={index + "winper"}
        className="iblock similarityfullbox mr5 mb5 positionrelative"
      >
        <img
          key={data + "image" + index}
          // onClick={this.clickSimilarImage.bind(this)}
          src={data}
          alt=""
          className={
            "simiimage clickable rad2 " +
            (index + "" === props.selectedDataset + "" ? "active" : "")
          }
          indexvalue={index}
        />
      </div>
    );
  });

  const datasetTitle = (
    <div className="mb10">
      <span className="boldtext"> Dataset : {props.meta.name}</span>{" "}
      <span className="mediumdesc"> {props.meta.description}</span>
    </div>
  );

  return (
    <div className="mt10">
      <Tabs selected={0}>
        <Tab id="tab-1" label="All Data">
          <div className="some-content">
            {datasetTitle}
            {allData}
          </div>
        </Tab>
        <Tab id="tab-2" label="By Category">
          <div className="some-content">{datasetTitle}</div>
        </Tab>
      </Tabs>
    </div>
  );
}
