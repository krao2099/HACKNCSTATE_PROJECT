import FamilyTree from "./familytree.js";
import React, { Component } from 'react';
        

    export default class Chart extends Component {

        constructor(props) {
            super(props);
            this.divRef = React.createRef();
        }

        shouldComponentUpdate() {
            return false;
        }

        componentDidMount() {
            this.family = new FamilyTree (this.divRef.current , {
                nodes: this.props.nodes,

                mouseScrool: FamilyTree.none,
                siblingSeparation: 120,
                template: 'john',
                //Fields for the profiles
                nodeBinding: {
                    field_0: "name",
                    field_1: "birthday",
                    img_0: "img",
                }
            });
        }

        render() {
            return (
                <div id="tree" ref={this.divRef}></div>
            );
        }
    }
        