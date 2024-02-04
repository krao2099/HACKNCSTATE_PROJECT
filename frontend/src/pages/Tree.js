import React, { useEffect, useState } from 'react';
import './Tree.css'
import plus from '../images/plus.png';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import Header from '../components/Header';

// key - parent - child - type (1 = parent)
// key - name - birth - bio - pic - gender




const Tree = () => {
  //trying to convert the data to proper format
  //To = child, From = parent
  var nodeDataArray1 = [
    { key: 1, name: 'Dad',  picture: "photo", gender: "M"},
    { key: 2, name: 'Mom', picture: "photo", gender: "F"},
    { key: 3, name: 'Child A', picture: "photo", gender: "M"},
    { key: 4, name: 'Child B', picture: "photo", gender: "male/female/other"},
    { key: 5, name: 'Child C', picture: "photo", gender: "male/female/other"}
  ];

  var linkDataArray1 = [
    { key: -1, to: 1, from: 2, type: 2 },
    { key: -2, to: 3, from: 1, type: 1 },
    { key: -3, to: 3, from: 2, type: 1},
    { key: -4, to: 4, from: 1, type: 1 },
    { key: -5, to: 4, from: 2, type: 1 },
    { key: -6, to: 5, from: 2, type: 1 },
    { key: -7, to: 5, from: 1, type: 1 }
  ];

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const apiURL = 'http://localhost:80/api/tree'
        console.log(apiURL);
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        nodeDataArray1 = data.persons;
        linkDataArray1 = data.relationships;
        console.log(nodeDataArray1);
        console.log(linkDataArray1);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchTree();
  }, []);
  
  var key1 = linkDataArray1.length * -1 - 1;
  var checked =[];
  linkDataArray1.forEach(async (link) => {
    if (link.type == 2) {
      // console.log(data)
      // console.log(data[3])
      var length = nodeDataArray1.length + 1;

      nodeDataArray1.push({ key: length, nodeType: "marriage", parentA: link.to, parentB: link.from})
      // linkDataArray1.push({key: key1, from: length, to: link.to})
      
      linkDataArray1.push({key: key1, from: link.to, to: length})
      link.to = length
      link.type = false
      key1--
    }
  })
  nodeDataArray1.forEach(async (node) => {
    if (node.nodeType) {
      linkDataArray1.forEach(async (link) => {
        if ((link.from == node.parentA || link.from == node.parentB) && link.type) {
          if (checked.includes(link.to)) {
            link.to = 0
            link.from = 0
          } else {
            link.from = node.key
            checked.push(link.to)
          }
          
        }
      })
    }
  })
  console.log(nodeDataArray1)
  console.log(linkDataArray1)

    return (
        <div >
            <Header />
            <ReactDiagram
              initDiagram={initDiagram}
              divClassName='diagram-component'
              //Dummy Data
              nodeDataArray={nodeDataArray1}
              linkDataArray={linkDataArray1}
              // nodeDataArray={[
              //   { key: 0, name: 'Dad', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other", nodeType: "person"},
              //   { key: 1, name: 'Mom', birthday: 'lightblue', bio: "" , picture: "photo", gender: "F"},
              //   { key: 2, name: 'Child A', birthday: 'lightblue', bio: "" , picture: "photo", gender: "M"},
              //   { key: 3, name: 'Child B', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"},
              //   { key: 4, name: 'Child C', birthday: 'lightblue', bio: "" , picture: "photo", gender: "male/female/other"}
              // ]}
              // linkDataArray={[
              //   { key: -1, from: 0, to: 1 },
              //   { key: -2, from: 0, to: 2 },
              //   { key: -3, from: 1, to: 1 },
              //   { key: -4, from: 2, to: 3 },
              //   { key: -5, from: 3, to: 0 }
              // ]}
              onModelChange={handleModelChange}
            />
            <a className="new-link">
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
          // layout: $(go.TreeLayout)
          layout:  // create a TreeLayout for the family tree
          $(go.LayeredDigraphLayout,
            { direction: 90 })
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
        diagram.linkTemplate =
        $(go.Link,  // the whole link panel
          { routing: go.Link.Orthogonal, corner: 5, selectable: false },
          $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  
  // define a simple Node template
  //TODO update the shape styling for the "marriage" nodes (use binding like with gender)
  diagram.nodeTemplate =
    $(go.Node, "Auto",
          { deletable: false, toolTip: tooltiptemplate },
          // new go.Binding("text", "name"),
          $(go.Shape, "Circle",
            {
              fill: "lightgray",
              stroke: null, strokeWidth: 0,
              stretch: go.GraphObject.Fill,
              alignment: go.Spot.Top
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
