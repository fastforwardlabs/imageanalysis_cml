import React, { Component } from "react";
import { InlineNotification } from 'carbon-components-react';
import "./walkthrough.css"


class Walkthrough extends Component {

    constructor(props) {
        super(props);


        this.datasetslist = [
            { name: "CIFAR100x", css: "active", index: [0] },
            { name: "ICONIC3K", css: "" },
            { name: "IMAGENET3K", css: "" }
        ]

        this.state = {
            selecteddataset: this.datasetslist[0]
        }


        this.algebraIntro = ` With Image Algebra, we take advantage of complex meaningful representations that 
        can be learned with ConvNets and use them as variables in simple and interesting algebra operations.
        If we "subtract" the representation of the horizon with trees from the representation of just trees ..
        is the resulting representation most similar to that of plain horizon? Well, lets find out.`

    }

    componentDidMount() {
        document.title = "ConvNet Playground | Image Algebra";
    }

    clickDatasetImage() {
        alert("click here")

    }


    render() {
        // let datasetImageList = this.datasetslist.map(dsdata => {
        //     return (
        //         <div className="iblock datasetfullbox clickable ">
        //             <div className="datasettitles"> {dsdata.name}</div>
        //             <img key={dsdata} onClick={this.clickDatasetImage.bind(this)} src={require("../../images/0.jpg")} alt="" className={"datasetbox rad2 " + dsdata.css} />
        //         </div>
        //     )
        // });

        // let holdarray = Array.from(Array(50).keys());
        // let allDatasetImageList = holdarray.map(dsdata => {
        //     return (
        //         <div className="iblock datasetfullbox ">
        //             <div className="datasettitles"> {dsdata.name}</div>
        //             <img key={dsdata} onClick={this.clickDatasetImage.bind(this)} src={require("../../images/0.jpg")} alt="" className="datasetbox rad2 dsselected " />
        //         </div>
        //     )
        // });

        return (
            <div>
                <div className="pb10 sectiontitle"> What are Convolutional Neural Networks</div>
                <div className="horrule"></div>


                <div className="pb10 sectiontitle"> What are Neural Networks</div>
                <div className="horrule"></div>


                <div className="pb10 sectiontitle">What is Semantic Search</div>
                <div className="horrule"></div>

                <div className="pb10 sectiontitle"> Similarity with Neural Networks</div>
                <div className="horrule"></div>
                To enable semantic search, we need a measure of similarity.
                This is an actively studied area of research known as metric learning where we train a neural network
                to learn a similarity metric for images (frequently used for facial recognition).
                However, it also turns out that when we train neural networks for the base task of image classification,
                they learn embeddings (layers prior to final classification layer) that capture the semantics of images (i.e. what it means for an image to be a cat etc)
                and we can leverage this as a measure of similarity.
                And it works really well (see this [paper from pinterest labs and UC Bekerley](https://arxiv.org/abs/1908.01707)
                on industry scale visual similarity search).
                With a large enough dataset, we can learn such classification-based semantics that matter for our own dataset,
                or we can leverage similar semantics already learned by pretrained models.

                Pretrained models are typically a CNNs model trained on the task of classifying images from the imagenet dataset
                (>1 million images, across 1000 classes).

                Ofcourse, how close our target images are to the distribution (type) of images used to create pretrained models will affect
                the value of pretrained models for similarity extraction. For example, a pretrained model (trained on imagenet) will be more
                useful for finding similarity between images of wild photography compared to similarity between images from the minecraft virtual world.


                Optimizations
                Rather than compare float values for similarity, we can instead focus on high dimension embeddings,
                binarize the values ( > 0.5 =1, < 05 =0) and compute similarity using hamming distance
                (Results show [this works](https://arxiv.org/pdf/1811.12649.pdf) well in practice).
                Binary representation takes up much less memory (20148  binary emb ~= 64 float emb)

                <InlineNotification
                    title={"Image Algebra"}
                    kind={"info"}
                    subtitle={this.algebraIntro}
                    style={{ minWidth: '100%', marginBottom: '.5rem' }}
                />

                <div className="pb10 sectiontitle"> Embeddings Spark Joy </div>
                <div className="horrule"></div>
                <div className="pb10 sectiontitle"> Why Pretrained Models Make sense </div>
                There are




            </div>
        );
    }
}

export default Walkthrough 