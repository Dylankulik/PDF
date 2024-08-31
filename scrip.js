const imageInput = document.getElementById('imageInput');

function downloadPDF() {
    const file = imageInput.files[0];
    if (!file) {
        alert("Por favor, sube una imagen primero.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const img = new Image();
        img.onload = function () {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

            const newWidth = imgWidth * scale;
            const newHeight = imgHeight * scale;

            const xOffset = (pageWidth - newWidth) / 2;
            const yOffset = (pageHeight - newHeight) / 2;

            doc.addImage(img, 'JPEG', xOffset, yOffset, newWidth, newHeight);
            doc.save('imagen.pdf');
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
