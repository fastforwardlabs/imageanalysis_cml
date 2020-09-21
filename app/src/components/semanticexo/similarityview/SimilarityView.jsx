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

export default function SimilarityView(props) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  });

  const selectedImagePath = "";
  const selectedCat = "";
  const modelScore = 1;
  const totalScore = 1;
  const simCount = 0;
  const similarImagesList = [];
  const topSimilar = 5;

  return (
    <div className="mt10">
      similarity view
      <div className="flex ">
        <div className="iblock h100 positionrelative  mr10">
          <img
            src={selectedImagePath}
            className="mainsimilarityimage rad4  iblock"
            alt=""
          />
          <div className="mt5  mainsimilaritytitle   lightbluehightlight">
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
                      This is the percentage of returned results that belong to
                      the same category as the selected image (weighted by
                      position in the result list). For the current search,{" "}
                      <strong>
                        {simCount} / {topSimilar} results{" "}
                      </strong>{" "}
                      are in same category{" "}
                      <strong>({selectedCat.toUpperCase()})</strong>. Note that
                      this score is conservative - some images may belong to
                      different classes but are{" "}
                      <span className="italics"> similar </span> (e.g sedan,
                      beetle, ferrari are <span className="italics">all</span>{" "}
                      cars).
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
  );
}
