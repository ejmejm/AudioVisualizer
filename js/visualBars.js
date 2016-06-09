function visualBars(){
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var barWidth = (canvas.width / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.fillStyle = 'rgb(' + (barHeight+100) + ', 50, 50)';
    ctx.fillRect(x, canvas.height-barHeight/2, barWidth, barHeight/2);

    x += barWidth + 1;
  }
}
