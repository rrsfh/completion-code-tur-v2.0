// Function to get URL parameter
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Function to submit data to Google Sheets automatically
function submitForm(assignmentID, responseID, completionCode) {
    var formData = new FormData();
    formData.append('assignmentID', assignmentID);
    formData.append('responseID', responseID);
    formData.append('completionCode', completionCode);

    // Google Sheets URL for form submission
    var googleSheetURL = 'https://script.google.com/macros/s/AKfycbzO-GsLFeBwWTTbBXTImNLpoDea4srhzzl6zsYZTXwSJZ9X-0fX7B7IEI2SaT39iKUt/exec';

    // Make the API request to Google Sheets
    return fetch(googleSheetURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submitted successfully", data);
    })
    .catch(error => {
        console.error("Error submitting the form", error);
    });
}


// Extract and store the participant ID and completion token from the URL
var assignmentID = getURLParameter('assignment_id')
var responseID = getURLParameter('response_id');

// Check if participantID exists and handle the completion code
if (responseID) {
    var n1 = 97580; // The hard-coded number
    var completionCode = n1 * responseID;
    document.getElementById('completionCode').innerHTML = `Tamamlama Kodunuz: ${completionCode}`;

    // Show the h2 message with instructions
    document.getElementById('completionCodeMessage').style.display = 'block';

    // Submit the participantID and completionCode to Google Sheets automatically
    submitForm(assignmentID, responseID, completionCode);

    // Display the button after 5 seconds
    setTimeout(() => {
        document.getElementById('linkButton').style.display = 'block'; // Show the button
        document.getElementById('linkButton').disabled = false;        // Enable the button
    }, 5000); // 5000 milliseconds = 5 seconds

} else {
    document.getElementById('completionCode').innerHTML = `HATA: response_id eksik olduğu için ilerlenemiyor. Lütfen yardım için BeSample ile iletişime geçin.`;

    // Hide the h2 message if participantID is missing
    document.getElementById('completionCodeMessage').style.display = 'none';

    // Hide the button if participantID is missing
    document.getElementById('linkButton').style.display = 'none';
}




// Function to show alerts for different tabs
function showAlert(tabName) {
    let message;
    switch (tabName) {
      case 'Home':
        message = "Bu sizin tamamlayıcı kodunuzdur. Lütfen bunu not edin ve çalışmayı tamamlamak için butona basınız.";
        break;
      case 'Instructions':
        message = "Talimatlar: Tamamlama kodunuzu not edin ve çalışmayı bitirmek için butona basın.";
        break;
      case 'Contact':
        message = "Bu sayfada takılırsanız, lütfen endişelenmeyin. Çalışmayı tamamlamak için tamamlanma kodunuzu BeSample’a verin.";
        break;
      default:
        message = "Bilgi mevcut değil.";
    }
    alert(message);
}
