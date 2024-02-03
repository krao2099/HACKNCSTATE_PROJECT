import React from 'react';
import './Tree.css'
import plus from '../images/plus.png';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';


const Tree = () => {
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
              nodeDataArray={[
                { key: 0, name: 'Alpha', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other", nodeType: "person"},
                { key: 1, name: 'Alpha', birthday: 'lightblue', bio: "" , picture: "photo", gender: "F"},
                { key: 2, name: 'Alpha', birthday: 'lightblue', bio: "" , picture: "photo", gender: "M"},
                { key: 3, name: 'Alpha', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"},
                { key: 4, name: 'Alpha', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"},
                { key: 5, nodeType: "marriage" },
                { key: 6, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                { key: 7, text: 'Delta', color: 'pink', loc: '150 150' }
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
          })
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
  diagram.nodeTemplate =
    $(go.Node, "Auto",
          { deletable: false, toolTip: tooltiptemplate },
          new go.Binding("text", "name"),
          $(go.Shape, "Circle",
            {
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
