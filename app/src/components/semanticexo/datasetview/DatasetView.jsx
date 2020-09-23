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
  const classlist = selections.classlist;
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
    console.log("json reloaded");
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

  let allDataByCategory = [];
  let datasetClasses = classlist[selections.dataset.name];
  console.log(selections.classes);
  let co = datasetClasses.map((className, index) => {
    let classcon = selections.classes[selections.dataset.name];
    let clist = classcon[className].map((classval, index) => {
      let imagePath =
        selections.basePath +
        "/assets/semsearch/datasets/" +
        selections.dataset.name +
        "/" +
        classval +
        ".jpg";
      return (
        <div
          key={classval + "winper"}
          className="iblock similarityfullbox mr5 mb5 positionrelative"
        >
          <img
            key={classval + "image"}
            onClick={() => setSelectedImage(classval)}
            src={imagePath}
            alt=""
            className={
              "simiimage clickable rad2 " +
              (selectedImage === classval ? "active" : "")
            }
            indexvalue={classval}
          />
        </div>
      );
    });
    let header = (
      <div key={"header" + className} className="iblock mr5 categorymain  mb5 ">
        <div>
          <div className=" boldtext categorytitle">
            {" "}
            {className.toUpperCase()}{" "}
          </div>
          <img
            src={require("../../../images/bgwhite.png")}
            alt=""
            className={"categorybox rad2 "}
            indexvalue={index}
          />
        </div>
      </div>
    );

    allDataByCategory.push(header);
    allDataByCategory.push(clist);
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
              // onClick={() =>
              //   show.setter.similarDrawer(!show.getter.similarDrawer)
              // }
              className=" iblock darkborderbottom lightgreyhighlight flexfull minwidth485 p10"
            >
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
          <div className="scrollwindow  datasetdivbox">
            {datasetTitle}
            {allData}
          </div>
        </Tab>
        <Tab id="tab-2" label="By Category">
          <div className="scrollwindow  datasetdivbox">
            {datasetTitle}
            {allDataByCategory}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
