interface InputTypes {
  cell: string[];
  organ: string[];
  gene: string[];
  cluster: string[];
}

class Client {
  constructor(baseUrl) {
    // https://cells.dev.hubmapconsortium.org/api/'
    this.basePath = baseUrl;
  }

  static checkParameters(
    inputType: string,
    outputType: string,
    inputSet: string[],
    genomicModality: string,
    pValue: number = 0.05,
  ): void {
    const outputTypes: string[] = ['cell', 'organ', 'gene', 'cluster'];

    if (!outputTypes.includes(outputType)) {
      throw new Error(`${outputType} not in ${outputTypes}`);
    }

    const inputTypes: InputTypes = {
      // Allowed input types vary depending on output type
      cell: ['gene', 'organ', 'protein', 'dataset'],
      organ: ['cell', 'gene'],
      gene: ['organ', 'cluster'],
      cluster: ['gene'],
    };

    if (!inputTypes[outputType].includes(inputType)) {
      throw new Error(`${inputType} not in ${inputTypes[outputType]}`);
    }

    const genomicModalities: string[] = ['rna', 'atac']; // Used for quantitative gene->cell queries
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

  /*
  fillRequestObject() {}

  hubmapQuery() {}

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
