const colors = {
  background: "#ffffff",
  text: "#000000",
};
const fonts = {
  title: "Arial, sans-serif",
  body: "Times New Roman, serif",
};

// Functionality of the certificate generator
const inputName = document.getElementById("recipientName");
const inputTitle = document.getElementById("recipientTitle");
const inputOrganization = document.getElementById("recipientOrganization");
const inputReason = document.getElementById("recipientPurpose");
const inputDate = document.getElementById("recipientDate");
const downloadButton = document.getElementById("downloadButton");

let certificateBlob;

function downloadCertificate(certificateHtml) {
  try {
    certificateBlob = new Blob([certificateHtml], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(certificateBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.html";

    // Show a confirmation dialog before downloading the file
    if (confirm("Are you sure you want to download this file?")) {
      a.click();
    }
    window.URL.revokeObjectURL(url);
  }
  catch (error) {
    // Handle the error
    console.error(error); 
  }
}

function generateCertificate(certificate) {
  const html = `
      <html>
        <head>
          <title>Certificate</title>
          <style>
            *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            h1 {
              color: ${colors.text};
              font-size: 60px;
              padding: 10px;
              font-family: ${fonts.title};
            }

            p {
              color: ${colors.text};
              font-size: 23px;
              font-family: ${fonts.body};
            }

            h3 {
              position: absolute;
              transform: translateY(12vmax) translateX(-15vmax);
              color: ${colors.text};
              font-size: 20px;
              padding: 10px;
              font-family: ${fonts.title};
            }

            h3 u{
              font-family: cursive;
            }

            .certContainer{
              width: 100%;
              height: 80vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            #element{
              width: 80%;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              background-color: green;
              border-radius: 10px;
            }

            .btnContainer{
              width: 100%;
              padding: 5px;
              height: 10vh;
              display: flex;
              justify-content: center;
              align-items: center;
            } 

            .down-btn{
              outline: none;
              background: none;
              padding: 10px;
              border-radius: 10px;
              border: 2px solid black;
              font: 500 1.3vmax sans-serif;
              transition: all 0.5s;
            }

            .down-btn:hover{
              background: black;
              color: white;
            }

          </style>
        </head>
        <body>
          <div class="certContainer" id="element1">
            <div id="element">
            <h1>${certificate.awardTitle}</h1>
            <p>This certificate is awarded to ${certificate.recipientName} for ${certificate.reasonForAward}.</p>
            <p>Awarded on ${certificate.awardDate} by ${certificate.issuingOrganization}.</p>
            <h3 class="Signature">Signature :- <u>${certificate.recipientName}</u></h3>
            </div>
          </div>
          <div class="btnContainer">
            <button class="down-btn" onclick="downBtn()">Download</button>
          </div>  
        </body>
        <script src="https://raw.githack.com/ekoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
        <script>
             function downBtn(){
              const element1 = document.getElementById("element1");
              html2pdf().from(element1).save();
             }    
        </script>
      </html>
    `;
  return html;
}


downloadButton.addEventListener("click", () => {
  const certificate = {
    recipientName: inputName.value,
    awardTitle: inputTitle.value,
    issuingOrganization: inputOrganization.value,
    reasonForAward: inputReason.value,
    awardDate: inputDate.value,
  };

  // Generate the certificate
  const certificateHtml = generateCertificate(certificate);

  // Download the certificate
  downloadCertificate(certificateHtml);
});
