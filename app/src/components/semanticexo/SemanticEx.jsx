/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { Toggle } from "carbon-components-react";
import "./semanticex.css";
import DatasetView from "./datasetview/DatasetView";
import { shuffleData, makeFriendly } from "../helperfunctions/HelperFunctions";

export default function SemanticEx() {
  //load useful data

  const modelViewDetails = require("../../assets/semsearch/details.json");
  const datasetViewDetails = require("../../assets/semsearch/datasetdictionary.json");
  const topSimilar = 15;

  //   specify state values and setters
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedDistanceMetric, setSelectedDistanceMetric] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(7);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    document.title = `ConvNet Playground | Semantic Search Explorer`;
  }, []);

  const datasetInfo = modelViewDetails["datasets"][selectedDataset];
  const datasetContent = datasetViewDetails.classes[datasetInfo.name];

  const selections = {
    dataset: modelViewDetails.datasets[selectedDataset],
    model: modelViewDetails.models[selectedModel],
    layer: modelViewDetails.models[selectedModel].layers[selectedLayer],
    metric: modelViewDetails.metrics[selectedDistanceMetric],
    topSimilar: topSimilar,
    basePath: process.env.PUBLIC_URL,
    show: { similarDrawer: true, advanced: showAdvanced },
    dictionary:
      datasetViewDetails.dictionary[
        modelViewDetails.datasets[selectedDataset].name
      ],
  };
  //   console.log(selections);
  return (
    <div>
      <div className=" flex  pb10 ">
        {/* <div className="iblock sectiontitle flexfull pt4 ">
          {" "}
          Image Similarity Search{" "}
        </div> */}
        {/* <div className="flex  ">
          <div
            //   onClick={this.toggleSemanticModal.bind(this)}
            className="iblock floatright  clickable showmore"
          >
            {" "}
            ? More Info{" "}
          </div>
        </div> */}
      </div>

      <div className="flex ">
        <div className=" mr10 ">
          <div className="boldtext underline pb5 mb5">CURRENT SELECTIONS</div>
          <div className="pb3 mediumdesc uppercase">
            Dataset :{" "}
            <span className="boldtext">{selections.dataset.name}</span>
          </div>
          <div className="pb3 mediumdesc uppercase">
            Model : <span className="boldtext">{selections.model.name} </span>
            <span className="smalldesc">
              | {makeFriendly(selections.model.modelparameters)} parameters
            </span>
          </div>
          <div className="pb3 mediumdesc uppercase">
            Submodel from Layer :{" "}
            <span className="boldtext">{selections.layer.name} </span>
            <span className="smalldesc">
              | {makeFriendly(selections.layer.modelparameters)} parameters
            </span>
          </div>
          <div className="mediumdesc  uppercase">
            Metric : <span className="boldtext">{selections.metric}</span>
          </div>
        </div>

        <div className="flexfull">
          <div className="  mynotif positionrelative h100 lh10 p10 lightbluehightlight maxh16  mb10">
            {
              <div className=" floatright lightgreyhighlight ml10  pr10 pl10 pb10 ">
                {/* <div className="mediumdesc boldtext"> Advanced Options</div> */}

                <div className="boldtext  iblock ">
                  <Toggle
                    id="advancedoptionstoggle"
                    className="smalldesc boldtext mr10"
                    labelA="Off"
                    labelB="On"
                    defaultToggled={showAdvanced}
                    // onChange action('onChange'),
                    onToggle={() => setShowAdvanced(!showAdvanced)}
                  ></Toggle>
                </div>

                <div className="mediumdesc boldtext"> Advanced Options</div>
              </div>
            }
            <span className="boldtext mb5">How it works!</span>
            <br />
            When you select an image (by clicking it), a neural network{" "}
            <span className="italics"> looks </span> at the content of all
            images in our dataset and shows you the{" "}
            <strong> top {topSimilar} </strong> most similar images to the
            selected image.
          </div>
        </div>
      </div>

      <DatasetView
        data={datasetContent}
        dataRandom={shuffleData(datasetContent, datasetInfo)}
        meta={datasetInfo}
        selections={selections}
        // setSelectedDataset={setSelectedDataset}
      ></DatasetView>
      <br />
      <br />
    </div>
  );
}
