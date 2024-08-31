const imageInput = document.getElementById('imageInput');

function downloadPDF() {
    const file = imageInput.files[0];
    if (!file) {
        alert("Por favor, sube una imagen primero.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.addImage(e.target.result, 'JPEG', 15, 40, 180, 160);
        doc.save('imagen.pdf');
    };

    reader.readAsDataURL(file);
}