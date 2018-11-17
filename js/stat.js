'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_GAP = 10;

var HEADER_TEXT = 'Ура вы победили!\nСписок результатов:';
var HEADER_X = 20;
var HEADER_Y = 30;
var HEADER_LINE_GAP = 20;

var GRAPH_X = 40;
var GRAPH_Y = 100;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 120;
var BAR_GAP = 50;
var BAR_TEXT_OFFSET_NAME = 20;
var BAR_TEXT_OFFSET_SCORE = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderMultiLineText = function (ctx, str, x, y, yGap) {
  var lines = str.split('\n');
  var yPosition = y;
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, yPosition);
    yPosition += yGap;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';

  var headerX = CLOUD_X + HEADER_X;
  var headerY = CLOUD_Y + HEADER_Y;

  renderMultiLineText(ctx, HEADER_TEXT, headerX, headerY, HEADER_LINE_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.round(Math.random() * 100);
      var color = 'hsl(240, ' + saturation + '%, 50%)';
      ctx.fillStyle = color;
    }

    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var barX = CLOUD_X + GRAPH_X + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_Y + GRAPH_Y + BAR_MAX_HEIGHT - barHeight;
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';

    var barNameY = CLOUD_Y + GRAPH_Y + BAR_MAX_HEIGHT + BAR_TEXT_OFFSET_NAME;
    ctx.fillText(names[i], barX, barNameY);

    var barScoreY = barY - BAR_TEXT_OFFSET_SCORE;
    ctx.fillText(Math.round(times[i]), barX, barScoreY);
  }
};
