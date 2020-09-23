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
  const selections = props.selections;
  const show = selections.show;
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarityArray, setSimilarityArray] = useState(null);

  const similarityPath =
    selections.basePath +
    "/assets/semsearch/similarity/" +
    selections.dataset.name +
    "/" +
    selections.model.name +
    "/" +
    selections.metric +
    "/" +
    selections.layer.name +
    ".json";

  useEffect(() => {
    console.log("re rendereed effect called");
    let loadedJSON = loadJSONData(similarityPath);
    loadedJSON.then(function (data) {
      if (data) {
        setSimilarityArray(data);
      }
    });
  }, [similarityPath]);
  const allData = props.dataRandom.map((data, index) => {
    return (
      <div
        key={index + "winper"}
        className="iblock similarityfullbox mr5 mb5 positionrelative"
      >
        <img
          key={"image" + index}
          onClick={() => setSelectedImage(data.index)}
          src={data.path}
          alt=""
          className={
            "simiimage clickable rad2 " +
            (data.index + "" === selectedImage + "" ? "active" : "")
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
      {/* top results */}
      {/* show top results panel and content */}
      {
        <div>
          <div className="unselectable mt10    flex ">
            <div
              onClick={() =>
                show.setter.similarDrawer(!show.getter.similarDrawer)
              }
              className=" iblock clickable greymoreinfo flexfull minwidth485 p10"
            >
              {" "}
              <strong>
                {" "}
                {!show.getter.similarDrawer && <span>&#x25BC; </span>}{" "}
                {props.selections.show.similarDrawer && <span>&#x25B2; </span>}{" "}
              </strong>
              <strong>Top {props.selections.topSimilar} results </strong> based
              on your search configuration
              <span className="smalldesc">
                {" "}
                [<strong> MODEL: </strong>{" "}
                {props.selections.model.name.toUpperCase()} |
                <strong> LAYER: </strong> {props.selections.layer.name} |
                <strong> DISTANCE METRIC: </strong>{" "}
                {props.selections.metric.toUpperCase()} ]
              </span>
            </div>

            <div
              // onClick={this.toggleShowCompare.bind(this)}
              className={
                " boldtext greenmoreinfo clickable bluehighlight justifycenter p10 flex flexcolumn " +
                (show.getter.advanced ? "" : "displaynone")
              }
            >
              Compare Models
            </div>

            {/* <div className="iblock   ">
                        <div className="iblock mr5"> <span className="boldtext"> {this.state.modelsList[this.state.selectedmodel].name.toUpperCase()} </span></div>
                        <div className="iblock">
                            <div className="smalldesc">  LAYER {this.state.modelsList[this.state.selectedmodel].layers[this.state.selectedlayer].layer_index} / {this.state.modelsList[this.state.selectedmodel].numlayers} </div>
                        </div>
                    </div> */}
          </div>
        </div>
      }
      {similarityArray && (
        <SimilarityView
          selectedImage={selectedImage}
          similarityArray={similarityArray[selectedImage]}
          setSelectedImage={setSelectedImage}
          selections={props.selections}
        ></SimilarityView>
      )}
      <Tabs selected={0}>
        <Tab id="tab-1" label="All Data">
          <div className="some-content scrollwindow  datasetdivbox">
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
