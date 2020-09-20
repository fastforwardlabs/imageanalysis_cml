/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import { Modal, Toggle, Tooltip } from "carbon-components-react";
import "./semanticex.css";

export default function SemanticEx() {
  const topSimilar = 15;
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `ConvNet Playground | Semantic Search Explorer`;
  });

  function toggleAdvancedOptions(e) {
    // registerGAEvent(
    //   "semanticsearch",
    //   "advancedoptions",
    //   this.state.showadvanced ? "off" : "on",
    //   this.componentLoadedTime
    // );
    // this.setState({ showmodelconfig: !this.state.showadvanced });
    setShowAdvancedOptions(!showAdvancedOptions);
  }

  return (
    <div>
      <div className=" flex  pb10 ">
        <div className="iblock sectiontitle flexfull pt4 ">
          {" "}
          Image Similarity Search{" "}
        </div>
        <div className="flex  ">
          <div
            //   onClick={this.toggleSemanticModal.bind(this)}
            className="iblock floatright  clickable showmore"
          >
            {" "}
            ? More Info{" "}
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="flex5 ">
          <div className="mynotif h100 lh10 pl  instructions lightbluehightlight maxh16 mr10">
            <div className="boldtext pb5"> Welcome!</div>
            This demo allows you to perform{" "}
            <strong> semantic image search </strong> using convolutional neural
            networks
            <span className="">
              {" "}
              [
              <strong>
                {" "}
                {/* {this.state.modelsList[
                  this.state.selectedmodel
                ].name.toUpperCase()}{" "} */}
              </strong>
              {/* <strong>  {this.state.modelsList[this.state.selectedmodel].layers[this.state.selectedlayer].layer_index}  </strong> */}
              {/* <strong> DISTANCE METRIC: </strong>   {this.state.distanceMetricList[this.state.selectedmetric].toUpperCase()} ] */}
              ]
            </span>
            . When you select an image (by clicking it), a neural network{" "}
            <span className="italics"> looks </span> at the content of all
            images in our dataset and shows you the{" "}
            <strong> top {topSimilar} </strong> most similar images to the
            selected image.
          </div>
        </div>

        <div className="flex5">
          <div className="mynotif lh10  h100  instructions lightbluehightlight maxh16">
            <div className="boldtext pb5 advancedoptionsbox">
              {" "}
              Advanced Options
            </div>
            <div className="advancedgreyborder rad2 iblock pr10 pl10 ">
              {/* <div className="mr10 pt10">Advanced options </div> */}
              <div className="boldtext mr20">
                <Toggle
                  id="advancedoptionstoggle"
                  className="smalldesc boldtext mr10"
                  labelA="Off"
                  labelB="On"
                  // onChange action('onChange'),
                  onToggle={toggleAdvancedOptions}
                ></Toggle>
              </div>
            </div>
            Interested in modifying search configurations (try different
            datasets, models, layers and distance metrics) or a UMAP
            visualization of the features extracted by each layer? Turn on
            advanced options.
          </div>
        </div>
      </div>
    </div>
  );
}
