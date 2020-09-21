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
import SimilarityView from "../similarityview/SimilarityView";
import { loadJSONData } from "../../helperfunctions/HelperFunctions";

export default function DatasetView(props) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    console.log("re rendereed effect called");
    const similarityPath =
      process.env.PUBLIC_URL +
      "/assets/semsearch/similarity/" +
      props.similarityPath;
    let loadedJSON = loadJSONData(similarityPath);
    loadedJSON.then(function (data) {
      if (data) {
        console.log(data);
      }
    });
  }, []);
  const allData = props.dataRandom.map((data, index) => {
    return (
      <div
        key={index + "winper"}
        className="iblock similarityfullbox mr5 mb5 positionrelative"
      >
        <img
          key={"image" + index}
          onClick={() => setSelectedImage(index)}
          src={data.path}
          alt=""
          className={
            "simiimage clickable rad2 " +
            (index + "" === selectedImage + "" ? "active" : "")
          }
          indexvalue={data.index}
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
      <SimilarityView></SimilarityView>
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
