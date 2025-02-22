$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $('#selected-image').attr("src", dataURL);
        $('#prediction-list').empty();
    }
    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
});

let model;
console.log("Before loading model...");

(async function() {
    console.log("Inside async function");
    try {
        model = await tf.loadLayersModel('/model/model.json');
        console.log("Model loaded successfully!");  // If model loads
        $('.progress-bar').hide();
    } catch (error) {
        console.error("Error loading the model:", error);
        $('.progress-bar').hide();  // Hide progress bar even if loading fails
    }
})();

console.log("After calling the async function...");


$("#predict-button").click(async function () {
    let image = $('#selected-image').get(0);
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224,224])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();


    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability: p,
                className: labels[i]
            };
        }).sort(function (a, b) {
            return b.probability - a.probability;
        }).slice(0, 5);

$("#prediction-list").empty();
top5.forEach(function (p) {
    $('#prediction-list').append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
});

    
});