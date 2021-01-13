import { CheckParametersTypes, RequestObjectParametersTypes, RequestObjectTypes } from './internal.types';
import { HANDLE, outputTypes, inputTypes, genomicModalities } from './internal.config';

class Client {
  baseUrl: string;

  constructor(baseUrl: string) {
    // https://cells.dev.hubmapconsortium.org/api/'
    this.baseUrl = baseUrl;
  }

  static checkParameters({
    inputType,
    outputType,
    // inputSet,
    genomicModality,
    pValue = 0.05,
  }: CheckParametersTypes): void {
    if (!outputTypes.includes(outputType)) {
      throw new Error(`${outputType} not in ${outputTypes}`);
    }

    if (!inputTypes[outputType].includes(inputType)) {
      throw new Error(`${inputType} not in ${inputTypes[outputType]}`);
    }

    if (inputType === 'gene' && outputType === 'cell' && !genomicModalities.includes(genomicModality)) {
      throw new Error(`${genomicModality} not in ${genomicModalities}`);
    }

    if (
      (((inputType === 'organ' && outputType === 'gene') || (inputType === 'gene' && outputType === 'organ')) &&
        pValue < 0) ||
      pValue > 1
    ) {
      throw new Error(`p_value ${pValue} should be in [0,1]`);
    }
  }

  static fillRequestObject({
    inputType,
    outputType,
    inputSet,
    genomicModality,
    pValue,
  }: RequestObjectParametersTypes): RequestObjectTypes {
    const requestObject = { input_type: inputType, input_set: inputSet };

    if (['organ', 'gene'].includes(inputType) && outputType === 'gene') {
      requestObject.p_value = pValue;
    }

    if (genomicModality) {
      requestObject.genomic_modality = genomicModality;
    }

    requestObject.logical_operator = 'and';
    return requestObject;
  }

  async hubmapQuery({ inputType, outputType, inputSet, genomicModality, /* limit = 1000, */ pValue }) {
    this.checkParameters(inputType, outputType, genomicModality, pValue);

    const requestUrl = `${this.base_url + outputType}/`;

    const requestObject = this.fillRequestObject(inputType, outputType, inputSet, genomicModality, pValue);

    const response = await fetch(requestUrl, {
      method: 'POST',
      body: JSON.stringify(requestObject),
    });

    const { results } = response.json();
    // Returns the key to be used in future computations
    return results[0][HANDLE];
  }
  /*

  setIntersection() {}

  setUnion() {}

  setDifference() {}

  operation() {}

  checkDetailParameters() {}

  setCount() {}

  setListEvaluation() {}

  setDetailEvaluation() {}
  */
}

export default Client;
