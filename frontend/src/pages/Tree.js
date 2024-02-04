import React from 'react';
import './Tree.css'
import plus from '../images/plus.png';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

// key - parent - child - type (1 = parent)
// key - name - birth - bio - pic - gender




const Tree = () => {
  //trying to convert the data to proper format
  const nodeDataArray1 = [
    [ "0", 'Dad', 'lightblue', "" , "photo", "male/female/other", "person"],
    [ "1", 'Mom', 'birth', "bio" , "photo", "male/female/other", "person"],
    [ "2", 'Child A', 'lightblue', "" , "photo", "male/female/other", "person"],
    [ "3", 'Child B', 'lightblue', "" , "photo", "male/female/other", "person"]
  ];
  const linkDataArray1 = [
    [1, 0, 2, 1],
    [2, 0, 1, 2],
    [3, 1, 3, 1]
  ];
  var linkDataArray2 = []
  var nodeDataArray2 = []
  nodeDataArray1.forEach(async (data) => {
    nodeDataArray2.push({ key: parseInt(data[0]), name: data[1], birthday: data[2], bio: data[3] , picture: data[4], gender: data[5], nodeType: "person"})
  })
  
  var key1 = -1
  linkDataArray1.forEach(async (data) => {
    if (data[3] != 1) {
      linkDataArray2.push({key: key1, from: data[2], to: data[1]})
      key1--
    } else {
      // console.log(data)
      // console.log(data[3])
      var length = nodeDataArray2.length;
      nodeDataArray2.push({ key: length, nodeType: "marriage"})
      linkDataArray2.push({key: key1, from: data[2], to: length})
      key1--
      linkDataArray2.push({key: key1, from: data[3], to: length})
      key1--
      nodeDataArray2.forEach(async (data) => {
        if (data.to == data[3] || data.to == data[3]) {
          data.to = length
        }
      })
      
    }
    
  })
  console.log(nodeDataArray2)
  console.log(linkDataArray2)

    return (
        <div >
            <div class="header">
              <div class="links">
              <h1 class="tree-header">Root to Something</h1>
                <a href="/" class="add-relationships">Add Family Member</a>
                <a href="/" class="add-relationships">Add Relationships</a>
                <a href="/" class="memories-link">Memories</a>
                <a href="/" class="about-link">About Us</a>
              </div>
              
            </div>
            <ReactDiagram
              initDiagram={initDiagram}
              divClassName='diagram-component'
              //Dummy Data
              nodeDataArray={[
                { key: 0, name: 'Dad', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other", nodeType: "person"},
                { key: 1, name: 'Mom', birthday: 'lightblue', bio: "" , picture: "photo", gender: "F"},
                { key: 2, name: 'Child A', birthday: 'lightblue', bio: "" , picture: "photo", gender: "M"},
                { key: 3, name: 'Child B', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"},
                { key: 4, name: 'Child C', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"}
              ]}
              linkDataArray={[
                { key: -1, from: 0, to: 1 },
                { key: -2, from: 0, to: 2 },
                { key: -3, from: 1, to: 1 },
                { key: -4, from: 2, to: 3 },
                { key: -5, from: 3, to: 0 }
              ]}
              onModelChange={handleModelChange}
            />
            <a class="new-link">
              <img src={plus}/>
            </a>
        </div>
        
    );
};

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        model: new go.GraphLinksModel(
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          }),
          layout:  // create a TreeLayout for the family tree
          $(go.TreeLayout,
            { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
      });

      // define tooltips for nodes
      var tooltiptemplate =
        $("ToolTip",
          { "Border.fill": "whitesmoke", "Border.stroke": "black" },
          $(go.TextBlock,
            {
              font: "bold 8pt Helvetica, bold Arial, sans-serif",
              wrap: go.TextBlock.WrapFit,
              margin: 5
            },
            new go.Binding("text", "", tooltipTextConverter))
        );
  // define a simple Node template
  //TODO update the shape styling for the "marriage" nodes (use binding like with gender)
  diagram.nodeTemplate =
    $(go.Node, "Auto",
          { deletable: false, toolTip: tooltiptemplate },
          // new go.Binding("text", "name"),
          $(go.Shape, "Circle",
            {
              //TODO Change this for marriage nodes so its small
              fill: "lightgray",
              stroke: null, strokeWidth: 0,
              stretch: go.GraphObject.Fill,
              alignment: go.Spot.Center
            },
            //Color
            new go.Binding("fill", "gender", genderBrushConverter)),
          $(go.TextBlock,
            {
              font: "700 12px Droid Serif, sans-serif",
              textAlign: "center",
              margin: 10, maxSize: new go.Size(80, NaN)
            },
            new go.Binding("text", "name"))
        );
  diagram.add(
    $(go.Part, "Table",
      { position: new go.Point(300, 10), selectable: false },
      $(go.TextBlock, "Key",
        { row: 0, font: "700 14px Droid Serif, sans-serif" }),  // end row 0
      $(go.Panel, "Horizontal",
        { row: 1, alignment: go.Spot.Left },
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
        $(go.TextBlock, "Males",
          { font: "700 13px Droid Serif, sans-serif" })
      ),  // end row 1
      $(go.Panel, "Horizontal",
        { row: 2, alignment: go.Spot.Left },
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
        $(go.TextBlock, "Females",
          { font: "700 13px Droid Serif, sans-serif" })
      ),  // end row 2
      $(go.Panel, "Horizontal",
        { row: 3, alignment: go.Spot.Left },
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(30, 30), fill: "orange", margin: 5 }),
        $(go.TextBlock, "Other/Non-binary",
          { font: "700 13px Droid Serif, sans-serif" })
      )  // end row 3
    ));
    
  return diagram;
}

//Legit Colors (not blue/pink)
var bluegrad = '#76a21e';
var pinkgrad = '#560D0D';

// define Converters to be used for Bindings
//TODO Fix nonbinary color and string detection
function genderBrushConverter(gender) {
  if (gender === "M") return bluegrad;
  if (gender === "F") return pinkgrad;
  return "orange";
}

//TODO Add tooltip
function tooltipTextConverter(person) {
  var str = "Test";
  // str += "Born: " + person.birthYear;
  // if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
  // if (person.reign !== undefined) str += "\nReign: " + person.reign;
  return str;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is discussed below.
 */
function handleModelChange(changes) {
  // alert('GoJS model changed!');
}

export default Tree;
