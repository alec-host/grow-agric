import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
    PDFGenerator: componentLoader.add('GeneratePDF', './pdfgenerator.component')
}

export { componentLoader, Components };