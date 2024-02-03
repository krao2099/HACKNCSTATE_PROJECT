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
                { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
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
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );
    // $(go.Node, "Auto",
    //       { deletable: false, toolTip: tooltiptemplate },
    //       new go.Binding("text", "name"),
    //       $(go.Shape, "Rectangle",
    //         {
    //           fill: "lightgray",
    //           stroke: null, strokeWidth: 0,
    //           stretch: go.GraphObject.Fill,
    //           alignment: go.Spot.Center
    //         },
    //         new go.Binding("fill", "gender", genderBrushConverter)),
    //       $(go.TextBlock,
    //         {
    //           font: "700 12px Droid Serif, sans-serif",
    //           textAlign: "center",
    //           margin: 10, maxSize: new go.Size(80, NaN)
    //         },
    //         new go.Binding("text", "name"))
    //     );

    
  return diagram;
}

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
