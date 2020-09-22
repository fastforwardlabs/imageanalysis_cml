/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { Tooltip } from "carbon-components-react";
import "./similarityview.css";
import {
  makeFriendly,
  boundWidth,
} from "../../helperfunctions/HelperFunctions";

export default function SimilarityView(props) {
  //TODO do we want to do something with incorrect results? e.g. visualize differently?
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  });

  const imageBasePath =
    props.selections.basePath +
    "/assets/semsearch/datasets/" +
    props.selections.dataset.name +
    "/";
  const selectedImagePath = imageBasePath + props.selectedImage + ".jpg";
  const selectedCat = props.selections.dictionary[props.selectedImage];

  const topSimilar = props.selections.topSimilar;
  let simCount = 0;
  let modelScore = 0;
  let totalScore = 0;
  let incorrectResults = [];

  for (var i in props.similarityArray.slice(1, topSimilar + 1)) {
    console.log(
      String(selectedCat),
      String(props.selections.dictionary[props.similarityArray[i][0]])
    );
    if (
      String(selectedCat) ===
      String(props.selections.dictionary[props.similarityArray[i][0]])
    ) {
      simCount++;
      modelScore += (topSimilar - i) / topSimilar;
    } else {
      incorrectResults.push(props.similarityArray[i]);
    }
    totalScore += (topSimilar - i) / topSimilar;
  }

  // console.log(selectedImagePath);

  const similarImagesList = props.similarityArray.map((alldata, index) => {
    let imagePath = imageBasePath + alldata[0] + ".jpg";
    // console.log(imagePath)
    let similarityScore = (alldata[1] * 1).toFixed(3);
    return (
      <div
        key={alldata[0] + "winper"}
        className="iblock similarityfullbox mr5 mb5 positionrelative"
      >
        <div className="smalldesc mb5">
          dst: {makeFriendly((1 * similarityScore).toFixed(2))}{" "}
        </div>
        <img
          key={alldata[0] + "image" + alldata[0]}
          // onMouseOver={this.hoverSimilarImage.bind(this)}
          onClick={() => props.setSelectedImage(alldata[0])}
          src={imagePath}
          alt=""
          className={"simiimage clickable rad2 "}
          indexvalue={alldata[0]}
        />
        <div className="outersimbar">
          <div
            className="innersimbar"
            style={{ width: boundWidth(similarityScore) * 100 + "%" }}
          ></div>
        </div>
        <div className="similarityscorebox">
          {makeFriendly(similarityScore)}{" "}
        </div>
        {/* <div>{ "w:" + boundWidth(similarityScore)*100  }</div> */}
      </div>
    );
  });

  return (
    <div className="mt10 mb10">
      <div className="sliderboxcontainer transition3s">
        <div className={" sliderbox topconfig" + (true ? " open" : " closed")}>
          <div className="glowbar transitionw6s mb7 w0"></div>
          <div className="flex ">
            <div className="iblock h100 positionrelative  mr10">
              <img
                src={selectedImagePath}
                className="mainsimilarityimage rad4  iblock"
                alt=""
              />
              <div className="mt5  mainsimilaritytitle  p10  lightbluehightlight">
                <div className="boldtext iblock mediumdesc mr5">
                  {" "}
                  SELECTED IMAGE{" "}
                </div>
                <div className="iblock smalldesc pt5 ">
                  {" "}
                  {selectedCat.toUpperCase()} <strong> </strong>
                </div>
              </div>

              {/* <div> searchimi number {this.state.selectedsimimage}</div> */}
            </div>
            <div className=" flexfull">
              <div className="scrollwindow layerwindow ">
                <div className=" iblock mr10 rad3 ">
                  <div className="pb5 smalldesc "> Search result score </div>
                  <div className="topscorediv">
                    <div className="mainscore  topmainscore">
                      {" "}
                      {((modelScore / totalScore) * 100).toFixed(1) + "%"}{" "}
                    </div>

                    <div className="weightedscore smalldesc textaligncenter">
                      <Tooltip triggerText="What is this?">
                        <div className="wscore">
                          This is the percentage of returned results that belong
                          to the same category as the selected image (weighted
                          by position in the result list). For the current
                          search,{" "}
                          <strong>
                            {simCount} / {topSimilar} results{" "}
                          </strong>{" "}
                          are in same category{" "}
                          <strong>({selectedCat.toUpperCase()})</strong>. Note
                          that this score is conservative - some images may
                          belong to different classes but are{" "}
                          <span className="italics"> similar </span> (e.g sedan,
                          beetle, ferrari are{" "}
                          <span className="italics">all</span> cars).
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                {similarImagesList.slice(1, topSimilar)}
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
