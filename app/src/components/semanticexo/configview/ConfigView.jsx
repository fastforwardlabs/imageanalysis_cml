/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React, { useState, useEffect } from "react";
import "./configview.css";
import {
  abbreviateString,
  makeFriendly,
} from "../../helperfunctions/HelperFunctions";
import { Tooltip } from "carbon-components-react";

export default function ConfigView(props) {
  const selections = props.selections;
  const show = selections.show;
  const config = selections.config;
  const layers = props.models[config.getter.selectedModel].layers;
  const selectedLayer = layers[config.getter.selectedLayer];

  // console.log(props.metrics, config.getter.selectedDistanceMetric);

  let datasetImageList = props.datasets.map((dsdata, index) => {
    let iconPath =
      selections.basePath + "/assets/semsearch/images/" + dsdata.icon;
    // console.log(dsdata)
    return (
      <div
        key={dsdata.name + "fullbox" + index}
        className="iblock datasetfullbox clickable mb10"
      >
        <div className="datasettitles"> {dsdata.name.toUpperCase()}</div>
        <div className="smalldesc pb5">{dsdata.size} images </div>
        <img
          onClick={() => config.setter.selectedDataset(index)}
          src={iconPath}
          alt=""
          className={
            "datasetbox rad2 " +
            (String(config.getter.selectedDataset) === String(index)
              ? "active"
              : "")
          }
          indexvalue={index}
        />
      </div>
    );
  });

  let modelImageList = props.models.map((mdata, index) => {
    let imagePath =
      selections.basePath +
      "/assets/models/" +
      props.models[index].name +
      "/" +
      props.models[index].layers[props.models[index].layers.length - 1].name +
      "/0.jpg";
    // console.log(props.models);

    return (
      <div
        id={"modelimgbox" + index}
        key={mdata.name + "fullbox" + index}
        className="iblock datasetfullbox clickable mb10 "
      >
        <div className="datasettitles">
          {" "}
          {abbreviateString(mdata.name.toUpperCase(), 11)}
        </div>
        <div className="smalldesc pb5">
          {makeFriendly(mdata["modelparameters"])} params.{" "}
        </div>
        <img
          id={"modelimg" + index}
          onClick={() => config.setter.selectedModel(index)}
          src={imagePath}
          alt=""
          className={
            "datasetbox rad2 " +
            (String(config.getter.selectedModel) === String(index)
              ? "active"
              : "")
          }
          indexvalue={index}
        />
      </div>
    );
  });

  let layerImageList = layers.map((ldata, index) => {
    let imagePath =
      selections.basePath +
      "/assets/models/" +
      selections.model.name +
      "/" +
      layers[index].name +
      "/0.jpg";

    return (
      <div
        key={ldata + "fullbox" + index}
        className="iblock datasetfullbox clickable mb10 "
      >
        <div className="datasettitles"> {"layer " + ldata.layer_index} </div>
        {/* {abbreviateString(ldata.name, 11).toLowerCase()}  */}
        <div className="smalldesc pb5">
          {" "}
          {makeFriendly(ldata.modelparameters)} params
        </div>
        <img
          id={"layerimg" + index}
          onClick={() => selections.config.setter.selectedLayer(index)}
          src={imagePath}
          alt=""
          className={
            "datasetbox rad2 " +
            (String(config.getter.selectedLayer) === String(index)
              ? "active"
              : "")
          }
          indexvalue={index}
        />
      </div>
    );
  });

  let metricImageList = props.metrics.map((metric, index) => {
    return (
      <div
        key={metric + "fullbox" + index}
        className=" positionrelative iblock datasetfullbox clickable mb10 "
      >
        <div className="datasettitles">
          {" "}
          {abbreviateString(metric, 11).toUpperCase()}{" "}
        </div>
        <div className="smalldesc pb5"> distance</div>
        <div className="metrictitle positionabsolute">
          {" "}
          {abbreviateString(metric, 3).toUpperCase()}
        </div>
        <img
          onClick={() => config.setter.selectedDistanceMetric(index)}
          src={require("../../../images/bgwhite.png")}
          alt=""
          className={
            "datasetbox rad2 " +
            (String(config.getter.selectedDistanceMetric) === String(index)
              ? "active"
              : "")
          }
          indexvalue={index}
        />
      </div>
    );
  });

  return (
    <div className="mt10">
      <div className={" " + (show.getter.advanced ? "" : " displaynone")}>
        {/* config panel and content */}
        <div
          // onClick={() =>
          //   show.setter.advancedDrawer(!show.getter.advancedDrawer)
          // }
          className="unselectable mt10 p10  darkborderbottom flex lightgreyhighlight"
        >
          <div className="iblock flexfull minwidth485">
            {/* <strong>
              {" "}
              {!show.getter.advancedDrawer && <span>&#x25BC; </span>}{" "}
              {show.getter.advancedDrawer && <span>&#x25B2; </span>}{" "}
            </strong>{" "} */}
            <strong> Advanced Options</strong>
          </div>
          <div className="iblock   ">
            <div className="iblock mr5">
              {" "}
              <span className="boldtext uppercase">
                {" "}
                {selections.dataset.name}
              </span>
            </div>
            <div className="iblock">
              <div className="smalldesc"> DATASET </div>
            </div>
          </div>
        </div>

        {/* Configuration drawer */}
        {
          <div
            style={{ zIndex: 500 }}
            className={
              "flex  modelconfigdiv p10 " +
              (show.getter.advancedDrawer ? "" : " displaynone")
            }
          >
            <div className="flex2  mr10">
              <div className="h100 flex flexcolumn ">
                <div className=" pb10 sectiontitle">
                  <div className="iblock">Select Dataset</div>
                  <div className="iblock"></div>
                </div>
                <div className="horrule mb10"></div>
                <div className="flexfull datasetselectdiv scrollwindow layerwindow">
                  {datasetImageList}
                </div>
                <div className="">
                  <div className=" iblock boldtext  boldtext datasetdescription mr10   p10 greyhighlight">
                    {selections.dataset.name.toUpperCase()}
                  </div>
                  {/* <div
                  // onClick={this.toggleDatasetModal.bind(this)}
                  className="iblock p10 greyhighlight clickable unselectable greymoreinfo"
                >
                  {" "}
                  ? More Info{" "}
                </div> */}
                </div>
              </div>
            </div>
            <div style={{ zIndex: 100 }} className="flex3  mr10">
              <div className=" pb10 sectiontitle"> Select Model </div>
              <div className="horrule mb10"></div>
              <div
                id="modelscrollbox"
                className="datasetselectdiv scrollwindow layerwindow"
              >
                {modelImageList}
              </div>
              <div className="flex flexwrap pr10">
                <div className="  mr10 ">
                  <div className=" iblock boldtext datasetdescription  p10 greyhighlight">
                    {selections.model.name.toUpperCase()}
                  </div>
                </div>
                <div className="flexfull ">
                  <div className="smalldesc pt4">
                    {" "}
                    <strong>
                      {" "}
                      {makeFriendly(selections.model.modelparameters)}{" "}
                      Parameters{" "}
                    </strong>{" "}
                  </div>
                  <div className="smalldesc pt3">
                    {" "}
                    {selections.model.numlayers} layers{" "}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ zIndex: 100 }} className="flex3 pr10 ">
              <div className="pb8 sectiontitle ">
                <div className="iblock">Select Layer</div>

                <div className="iblock ">
                  <Tooltip direction="left" triggerText="">
                    <div className="wscore">
                      We construct{" "}
                      <span className="italics">intermediate models</span> from
                      the main model at each of these layers. Each intermediate
                      model has less parameters than the full model and is used
                      for feature extraction.
                      {/* <div class="bx--tooltip__footer">
                                                <a hid="#" class="bx--link">Learn More</a>
                                                <button onClick={this.toggleSemanticModal.bind(this)} class="bx--btn bx--btn--primary bx--btn--sm" type="button">More Info</button>
                                            </div> */}
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="horrule mb10"></div>
              <div
                id="layerscrollbox"
                className="scrollwindow layerwindow  mr10"
              >
                <div className="windowcontent"> {layerImageList} </div>
              </div>
              <div className="flex flexwrap pr10">
                <div className="  mr10 ">
                  <div className=" iblock boldtext datasetdescription  p10 greyhighlight">
                    {" LAYER " + selectedLayer.layer_index}
                  </div>
                </div>
                <div className="flexfull ">
                  <div className="smalldesc pt4">
                    {" "}
                    <strong>Type: {selectedLayer.type} </strong> |{" "}
                    <span className="smalldesc">
                      {" "}
                      {selectedLayer.name.toUpperCase()}{" "}
                    </span>{" "}
                  </div>
                  <div className="smalldesc pt3">
                    {" "}
                    {makeFriendly(selectedLayer.modelparameters)} model
                    parameters{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex2">
              <div className="pb8 sectiontitle ">
                <div className="iblock">Distance Metric</div>

                <div className="iblock ">
                  <Tooltip direction="left" triggerText="">
                    <div className="wscore">
                      The distance metric used to compute similarity between
                      extracted features.
                    </div>
                  </Tooltip>
                </div>
              </div>

              <div className="horrule mb10"></div>
              <div className="scrollwindow layerwindow ">
                <div className="windowcontent"> {metricImageList} </div>
              </div>
              <div className=" iblock boldtext datasetdescription  p10 greyhighlight">
                {" "}
                {props.metrics[
                  config.getter.selectedDistanceMetric
                ].toUpperCase()}
              </div>
            </div>
            <div className="horrule mb10"></div>
          </div>
        }
      </div>
    </div>
  );
}
