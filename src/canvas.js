import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateCanvas();
  }

  updateCanvas() {
    const c = this.refs.canvas;
    const w = c.width-40;
    const h = c.height-40;
    const ctx = c.getContext("2d");
    const R = h/2;
    const r = h/6;
    const centerX = w/2+20;
    const centerY = h/2+20;
    const yOffset = h/35;
    const fontSize = h/26;
    const textColor = "#000";
    const heightLightColor = "#FFD480";
    const indexColor = "#F95959";
    const strokeColor = "#ADA6AB";
    const bgColor = "#FFF";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px Helvetica`;

    var texts = this.props.items;

    // five inner cirlces' centers
    var centerPos = [{x: centerX, y:centerY}];
    for(var i=Math.PI/4; i<Math.PI*2; i+=Math.PI/2) {
      centerPos.push({x: centerX + 2*r*Math.cos(i),
      y: centerY+2*r*Math.sin(i)});
    }
    const orders = [3, 2, 0, 4, 1];
    var textPos = [];
    orders.forEach(num => {
      const {x, y} = centerPos[num];
      textPos.push({ x, y: y-r*2/3 });
      textPos.push({ x, y: y-r*1/3 });
      textPos.push({ x, y: y });
      textPos.push({ x, y: y+r*1/3 });
      textPos.push({ x, y: y+r*2/3 });
    });

    // draw big outer circle
    ctx.beginPath();
    ctx.lineWidth=8;
    ctx.strokeStyle=strokeColor;
    ctx.arc(centerX,centerY,R,0,2*Math.PI);
    ctx.stroke();

    // draw five inner circles
    centerPos.forEach((e, idx) => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, r, 0, 2*Math.PI);
      ctx.lineWidth=5;
      ctx.stroke();
      ctx.fillStyle = heightLightColor;
      ctx.fillRect(e.x-r+yOffset/2, e.y-yOffset , 2*r-yOffset, yOffset*2);
    });

    // draw texts
    textPos.forEach((e, idx) => {
      ctx.fillStyle=textColor;
      if(texts[idx])
        ctx.fillText(`${texts[idx]}`, e.x, e.y);
      // draw key index
      if(idx%5==2) {
        ctx.fillStyle = indexColor;
        ctx.fillText(`${idx+1}.`, e.x-r+yOffset*1.8, e.y);
      }
    });
  }

  render() {
    return (
      <canvas ref="canvas" width="800" height="800">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    );
  }
}

export default Canvas;
