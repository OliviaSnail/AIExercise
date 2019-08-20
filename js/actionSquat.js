// JavaScript source code

function compute_angle(coordinate, a, b) {
    var x_a = coordinate[a][0];
    var y_a = coordinate[a][1];
    var x_b = coordinate[b][0];
    var y_b = coordinate[b][1];
    var vector_ab = new Array();
    vector_ab[0] = x_b - x_a;
    vector_ab[1] = y_b - y_a;
    var cos = vector_ab[0] / Math.sqrt(Math.pow(vector_ab[0], 2) + Math.pow(vector_ab[1], 2));
    var angle = 180 / Math.PI * (Math.acos(cos));
    if (vector_ab[1] < 0) {
        angle = 360 - angle;
    }
    return angle;
}

function getPartAngle() {
    var returnPartAngleArray = new Array();
    returnPartAngleArray.push(compute_angle(coordinate, 5, 7));
    returnPartAngleArray.push(compute_angle(coordinate, 6, 8));
    returnPartAngleArray.push(compute_angle(coordinate, 13, 11));
    returnPartAngleArray.push(compute_angle(coordinate, 14, 12));
    returnPartAngleArray.push(compute_angle(coordinate, 11, 5));
    returnPartAngleArray.push(compute_angle(coordinate, 12, 6));
    return returnPartAngleArray;
}

function actionCorrect(partAngleArray, partIndex, actionIndex) {
    var baseActionAngle = squatBaseAngle[partIndex];
    var partAngle = partAngleArray[partIndex];
    
    if (Math.abs(baseActionAngle - partAngle) > 7) {
        return false;
    } else {
        return true;
    }
}

function partAppear(partAngleArray, partIndex) {
    var baseActionAngle = baseAngle[partIndex];
    var partAngle = partAngleArray[partIndex];

    if (partAngle == "null") {
        return false;
    } else {
        return true;
    }
}


function actionSquat(actionAngleArray, actionIndex) {

    var resultString = "";
    var leftArmWrongNum = 0;
    var rightArmWrongNum = 0;
    var leftLegWrongNum = 0;
    var rightLegWrongNum = 0;
    var leftLegMaxAngle = 0;
    var rightLegMaxAngle = 0;
    var leftBodyWrongNum = 0;
    var rightBodyWrongNum = 0;
    var queueLength = 10;
    if (queueAngle.length == queueLength) {
        queueAngle.shift();
    }
    queueAngle.push(actionAngleArray);
    if (queueAngle.length != queueLength) {
        console.log("未达到10帧");
        return resultString;
    }
    console.log(queueAngle);
    for (var cacheIndex in queueAngle) {
        //左胳膊
        if (!actionCorrect(queueAngle[cacheIndex], 0, actionIndex)) {
            leftArmWrongNum++;
        }
        //右胳膊
        if (!actionCorrect(queueAngle[cacheIndex], 1, actionIndex)) {
            rightArmWrongNum++;
        }
        //左腿
        if (!actionCorrect(queueAngle[cacheIndex], 2, actionIndex)) {
            leftLegWrongNum++;
        }
        if (queueAngle[cacheIndex][2] > leftLegMaxAngle) {
            leftLegMaxAngle = queueAngle[cacheIndex][2];
        }
        //右腿
        if (!actionCorrect(queueAngle[cacheIndex], 3, actionIndex)) {
            rightLegWrongNum++;
        }
        if (queueAngle[cacheIndex][2] > rightLegMaxAngle) {
            rightLegMaxAngle = queueAngle[cacheIndex][3];
        }
        //左侧身体
        //if (!actionCorrect(queueAngle[cacheIndex], 4, actionIndex)){
        //    leftBodyWrongNum++;
        //}
        //右侧身体
        //if (!actionCorrect(queueAngle[cacheIndex], 5, actionIndex)){
        //    rightBodyWrongNum++;
        //}
    }


    if (leftArmWrongNum >= 3) {
        resultString += "左胳膊动作不标准 ";
    }
    if (rightArmWrongNum >= 3) {
        resultString += "右胳膊动作不标准 ";
    }
    //if (leftLegWrongNum > 0) {
    //    resultString += "左腿动作不标准 ";
    //}
    if (leftLegMaxAngle > 180) {
        resultString += "左腿动作不标准 ";
    }
    //if (rightLegWrongNum > 0) {
    //    resultString += "右腿动作不标准 ";
    //}
    if (rightLegMaxAngle > 180) {
        resultString += "右腿动作不标准 ";
    }
    if (leftBodyWrongNum > 5) {
        resultString += "左侧身体动作不标准 ";
    }
    if (rightBodyWrongNum > 5) {
        resultString += "右侧身体动作不标准 ";
    }
    return resultString;
}


function squatActionFilter(actionIndex, actionAngleArray) {

    var resultString = "";
    if (actionIndex == 0) {
        resultString = actionSquat(actionAngleArray, actionIndex);
        console.log(resultString);
    } else {
        resultString = "没有匹配动作";
        console.log("没有匹配动作");
    }
    return resultString;
}

var queueAngle = new Array();
var squatBaseAngle = [0, 0, 180, 180, 65, 65];
var actionAngle = getPartAngle();
squatActionFilter(0, actionAngle);